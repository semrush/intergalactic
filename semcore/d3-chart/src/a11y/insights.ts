import { DataStructureHints, DataSummarizationConfig } from './hints';

export type TrendNode = {
  type: 'trend';
  priority: number;
  change: {
    from: number;
    to: number;
    strength:
      | 'strong-reduction'
      | 'reduction'
      | 'weak-reduction'
      | 'static'
      | 'weak-growth'
      | 'growth'
      | 'strong-growth';
  };
  from: unknown;
  to: unknown;
  label: string;
};
export type GeneralTrendNode = Omit<TrendNode, 'type'> & { type: 'general-trend' };
export type ComparisonNode = {
  type: 'comparison';
  priority: number;
  values: {
    value: unknown;
    label: string;
  }[];
};

export type ClusterNode = {
  type: 'cluster';
  priority: number;
  size: number;
  labels: unknown[];
  center: {
    x: number;
    xLabel: string;
    y: number;
    yLabel: string;
  };
  relativeSize:
    | 'significantly-smaller'
    | 'smaller'
    | 'slightly-smaller'
    | 'average'
    | 'slightly-bigger'
    | 'bigger'
    | 'significantly-bigger';
};
export type Insight = TrendNode | GeneralTrendNode | ComparisonNode | ClusterNode;

export type SerializableDataType = 'time-series' | 'points-cloud' | 'values-set';

export type AnalyzedData = {
  insights: Insight[];
  dataType: SerializableDataType;
  dataRange: {
    from: string | number | Date;
    to: string | number | Date;
    label: string | null;
  } | null;
  dataTitle: string | null;
};

const movingAverage = (data: number[], frame: number) => {
  const result: number[] = [];
  let lastPivot: null | number = null;
  let computedStart: null | number = null;
  for (let i = frame / 2; i < data.length - frame / 2; i += frame) {
    const startIndex = i - frame / 2;
    const endIndex = i + frame / 2;

    const part = data.slice(Math.floor(startIndex), Math.ceil(endIndex));
    const sum = part.reduce((sum, item) => sum + item, 0);
    const pivot = sum / part.length;
    if (lastPivot !== null) {
      for (let i = startIndex; i < endIndex; i++) {
        const base = lastPivot;
        const diff = pivot - lastPivot;
        const progress = (i - startIndex) / (endIndex - startIndex);
        result[Math.floor(i)] = base + diff * progress;
      }
      if (computedStart === null) {
        computedStart = Math.floor(startIndex);
      }
    }

    lastPivot = pivot;
  }
  const edgeFrame = Math.floor(frame / 2 + 1);
  for (let i = 0; i <= edgeFrame; i++) {
    if (result[i] !== undefined || computedStart === null) break;
    const base = result[computedStart];
    const diff = ((result[computedStart + 1] - result[computedStart]) / 2) * edgeFrame;
    const progress = edgeFrame - i + 1; //1 - (edgeFrame - i) / edgeFrame;
    result[i] = base - diff * progress;
  }
  const computedEnd = result.length - 1;
  const tailFrame = data.length - computedEnd;
  for (let i = computedEnd; i <= data.length + edgeFrame; i++) {
    if (result[i] !== undefined) continue;
    const base = result[computedEnd];
    const diff = ((result[computedEnd] - result[computedEnd - 1]) / 2) * tailFrame;
    const progress = i - computedEnd;
    result[i] = base + diff * progress;
  }

  return result.slice(edgeFrame, edgeFrame + data.length);
};

export const extractDataInsights = (
  data: Record<string, unknown>[] | Record<string, unknown>,
  hints: DataStructureHints,
  config: DataSummarizationConfig,
): AnalyzedData => {
  let insights: AnalyzedData['insights'] = [];
  let dataType: AnalyzedData['dataType'] | null = config.dataType ?? hints.dataType;
  let dataRange: AnalyzedData['dataRange'] | null = null;
  let dataTitle: string | null = null;

  if (Array.isArray(data)) {
    const keysMap = Object.fromEntries(Object.keys(data[0]).map((key) => [key, true]));

    if (!dataType) {
      if (
        (keysMap['y'] || keysMap['y1'] || keysMap['y2']) &&
        keysMap['x'] &&
        (keysMap['value'] || keysMap['label'])
      ) {
        dataType = 'points-cloud';
      } else if (data.length > 6) {
        dataType = 'time-series';
      } else {
        dataType = 'values-set';
      }
    }

    if (dataType === 'time-series') {
      const firstRow = data[0];
      const lastRow = data[data.length - 1];
      const possibleValueKeys = ['y', 'value', ...hints.fields.verticalAxes];
      const valuesKeys = possibleValueKeys.filter((key) => keysMap[key]);

      const possibleLabelKeys = ['label', 'x', ...hints.fields.horizontalAxes];
      const labelsKey = possibleLabelKeys.filter((key) => keysMap[key])[0];

      dataRange = {
        from: firstRow[labelsKey] as any,
        to: lastRow[labelsKey] as any,
        label: hints.title.verticalAxes,
      };
      dataTitle = hints.title.verticalAxes ?? hints.title.horizontalAxes;

      for (const valueKey of valuesKeys) {
        const values = (data as Record<string, number>[]).map((row) => row[valueKey]);
        const sum = values.reduce((sum, value) => (sum += value), 0);
        const average = sum / values.length;
        const variance =
          (1 / values.length) *
          values.map((value) => (value - average) ** 2).reduce((sum, item) => sum + item, 0);
        const standardDeviation = Math.sqrt(variance);
        const trendStrengths = ['static', 'weak', 'medium', 'strong'] as const;

        const frameSize = Math.sqrt(values.length);
        const longMovingAverage = movingAverage(values, config.movingAverage.longSize ?? frameSize);
        const shortMovingAverage = movingAverage(
          values,
          config.movingAverage.shortSize ?? frameSize / 2,
        );

        const strengthsMap = {
          growth: {
            static: 'static',
            weak: 'weak-growth',
            medium: 'growth',
            strong: 'strong-growth',
          },
          reduction: {
            static: 'static',
            weak: 'weak-reduction',
            medium: 'reduction',
            strong: 'strong-reduction',
          },
        } as const;

        const recordTrend = ({
          value,
          width,
          label,
          type,
        }: {
          value: { from: number; to: number };
          width: number;
          label: { from: unknown; to: unknown; data: string };
          type: 'general-trend' | 'trend';
        }): GeneralTrendNode | TrendNode | undefined => {
          for (let i = 0; i < trendStrengths.length; i++) {
            const tang = Math.abs(value.from - value.to) / width;
            const trendStrength = trendStrengths[i];
            if (tang <= config.trendTangens[trendStrength]) {
              const strength =
                value.to > value.from
                  ? strengthsMap.growth[trendStrength]
                  : strengthsMap.reduction[trendStrength];

              return {
                type,
                priority: i,
                change: {
                  from: value.from,
                  to: value.to,
                  strength,
                },
                from: label.from,
                to: label.to,
                label: label.data,
              };
            }
          }
        };

        const generalTrend = recordTrend({
          type: 'general-trend',
          value: {
            from: longMovingAverage[0],
            to: longMovingAverage[longMovingAverage.length - 1],
          },
          width: longMovingAverage.length,
          label: { from: firstRow[labelsKey], to: lastRow[labelsKey], data: valueKey },
        })!;
        const localTrends: Insight[] = [];
        {
          let lastSwitch = 0;
          let shortWasAbove = shortMovingAverage[0] > longMovingAverage[0];
          for (let i = 1; i < data.length; i++) {
            const shortIsAbove = shortMovingAverage[i] > longMovingAverage[i];
            const diff = Math.abs(shortMovingAverage[i] - longMovingAverage[i]);
            const notableDiff = config.movingAverage.notableDiff ?? standardDeviation / 10;
            if (
              (shortIsAbove !== shortWasAbove && diff > notableDiff) ||
              (i === 0 && lastSwitch !== data.length)
            ) {
              i = Math.min(i + 2, data.length - 1);
              localTrends.push(
                recordTrend({
                  type: 'trend',
                  value: {
                    from: shortMovingAverage[lastSwitch],
                    to: shortMovingAverage[i],
                  },
                  width: i - lastSwitch,
                  label: {
                    from: data[lastSwitch][labelsKey],
                    to: data[i][labelsKey],
                    data: valueKey,
                  },
                })!,
              );
              lastSwitch = i;
              shortWasAbove = shortIsAbove;
            }
          }
        }
        insights.push(generalTrend);
        insights.push(...localTrends);
      }
    } else if (dataType === 'points-cloud') {
      const guessedXKey = [...hints.fields.horizontalAxes.values(), 'x'][0];
      const guessedYKey = [...hints.fields.verticalAxes.values(), 'y'][0];
      const guessedValueKey = 'value';
      const guessedLabelKey = keysMap['label'] ? 'label' : guessedValueKey;
      const normalized = data.map((row) => ({
        x: row[guessedXKey] as number,
        y: row[guessedYKey] as number,
        label: row[guessedLabelKey],
        value: row[guessedValueKey] as number,
      }));
      let gridSize =
        config.clustersGridSize ?? hints.grid.verticalAxes ?? hints.grid.horizontalAxes;
      if (gridSize === undefined) {
        const usedX = new Set<number>();
        const usedY = new Set<number>();
        for (const { x, y } of normalized) {
          usedX.add(x);
          usedY.add(y);
        }
        const orderedX = [...usedX].sort((a, b) => a - b);
        const orderedY = [...usedY].sort((a, b) => a - b);
        const distancesX = orderedX.slice(0, -1).map((x, index) => orderedX[index + 1] - x);
        const distancesY = orderedY.slice(0, -1).map((y, index) => orderedY[index + 1] - y);
        const avgDistanceX = distancesX.reduce((sum, x) => sum + x, 0) / distancesX.length;
        const avgDistanceY = distancesY.reduce((sum, y) => sum + y, 0) / distancesY.length;
        const belowAvgDistancesX = distancesX.filter((x) => x < avgDistanceX);
        const belowAvgDistancesY = distancesY.filter((y) => y < avgDistanceY);
        const betweenDistanceX =
          belowAvgDistancesX.reduce((sum, x) => sum + x, 0) / belowAvgDistancesX.length;
        const betweenDistanceY =
          belowAvgDistancesY.reduce((sum, y) => sum + y, 0) / belowAvgDistancesY.length;
        const avgDistance = (betweenDistanceX + betweenDistanceY) / 2;
        gridSize = Math.sqrt(Math.sqrt(avgDistance));
      }

      const grid: {
        [x: string]: { [y: string]: { clusterId: string; members: typeof normalized } };
      } = {};
      const takenY = new Set<number>();
      const takenX = new Set<number>();
      for (let i = 0; i < normalized.length; i++) {
        const { x, y } = normalized[i];
        const gridX = Math.round(x / gridSize!);
        const gridY = Math.round(y / gridSize!);
        takenY.add(gridY);
        takenX.add(x);
        grid[gridX] = grid[gridX] ?? {};
        grid[gridX][gridY] = grid[gridX][gridY] ?? { clusterId: `${gridX}_${gridY}`, members: [] };
        grid[gridX][gridY].members.push(normalized[i]);
      }
      const clusters: { [clusterId: string]: typeof normalized } = {};
      for (const x of Object.keys(grid).map((x) => parseInt(x, 10))) {
        for (const y of Object.keys(grid[x]).map((y) => parseInt(y, 10))) {
          let pointHandled = false;
          for (const xNeighbour of [x - 1, x, x + 1]) {
            for (const yNeighbour of [y - 1, y, y + 1]) {
              if (xNeighbour === undefined || yNeighbour === undefined) continue;
              if (xNeighbour === x && yNeighbour === y) continue;
              if (!grid[xNeighbour]?.[yNeighbour]) continue;
              pointHandled = true;
              grid[x][y].clusterId = grid[xNeighbour][yNeighbour].clusterId;
              break;
            }
            if (pointHandled) break;
          }
          clusters[grid[x][y].clusterId] = clusters[grid[x][y].clusterId] ?? [];
          clusters[grid[x][y].clusterId].push(...grid[x][y].members);
        }
      }
      const clustersInsights: ClusterNode[] = [];
      for (const clusterId in clusters) {
        const size = clusters[clusterId].reduce((sum, { value }) => sum + (value ?? 1), 0);
        const labels = [...clusters[clusterId]]
          .sort((a, b) => b.value - a.value)
          .map(({ label }) => label)
          .filter((label) => label !== undefined);
        const uniqueLabels = [...new Set(labels)];
        const x =
          clusters[clusterId].reduce((sum, { x }) => sum + x, 0) / clusters[clusterId].length;
        const y =
          clusters[clusterId].reduce((sum, { y }) => sum + y, 0) / clusters[clusterId].length;

        clustersInsights.push({
          type: 'cluster',
          priority: 1,
          size,
          labels: uniqueLabels,
          relativeSize: 'average',
          center: {
            x,
            y,
            xLabel: guessedXKey,
            yLabel: guessedYKey,
          },
        });
      }
      clustersInsights.sort((a, b) => b.size - a.size);
      const relativeSizes = [
        'significantly-bigger',
        'bigger',
        'slightly-bigger',
        'average',
        'slightly-smaller',
        'smaller',
        'significantly-smaller',
      ] as const;
      for (let i = 0; i < clustersInsights.length; i++) {
        clustersInsights[i].relativeSize =
          relativeSizes[Math.floor(relativeSizes.length * (i / clustersInsights.length))];
      }

      insights.push(...clustersInsights);

      const sortedX = [...takenX].sort((a, b) => a - b);
      dataRange = {
        from: sortedX[0] as any,
        to: sortedX[sortedX.length - 1] as any,
        label: hints.title.horizontalAxes,
      };
      dataTitle = hints.title.verticalAxes ?? hints.title.horizontalAxes;
    }
  }
  if (dataType === 'values-set') {
    const fields = Object.keys(hints.fields.values);
    if (fields.length === 0) {
      fields.push(...Object.keys(data));
    }
    const values = fields.map((field) => ({
      label: hints.title.values[field] ?? field,
      value: hints.fields.values[field] ?? (data as Record<string, unknown>)[field],
    }));
    values.sort((a, b) => {
      if (typeof a.value !== 'number' || typeof b.value !== 'number') return 0;
      return b.value - a.value;
    });
    insights.push({
      type: 'comparison',
      values,
      priority: 1,
    });
    dataTitle = hints.title.verticalAxes ?? hints.title.horizontalAxes;
  }

  const hasHighPriorityInsights = insights.some((insight) => insight.priority > 0);
  if (hasHighPriorityInsights) {
    insights = insights.filter((insight) => insight.priority > 0);
  } else {
    insights = insights.slice(0, 1);
  }

  return { insights, dataType: dataType!, dataRange, dataTitle };
};
