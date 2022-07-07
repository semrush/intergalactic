import { makeBezier } from './bezier';
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
  dataKey: string;
};
export type GeneralTrendNode = Omit<TrendNode, 'type'> & { type: 'general-trend' };
export type ComparisonNode = {
  type: 'comparison';
  label?: string;
  priority: number;
  values: {
    value: unknown;
    label: string;
  }[];
};

type ClusterRelativeSize =
  | 'significantly-smaller'
  | 'smaller'
  | 'slightly-smaller'
  | 'average'
  | 'slightly-bigger'
  | 'bigger'
  | 'significantly-bigger';
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
  relativeSize: ClusterRelativeSize;
};
export type Insight = TrendNode | GeneralTrendNode | ComparisonNode | ClusterNode;

export type SerializableDataType = 'time-series' | 'points-cloud' | 'values-set' | 'grouped-values';

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
  frame = Math.floor(frame) % 2 === data.length % 2 ? Math.floor(frame) : Math.ceil(frame);

  for (let i = 0; i < data.length; i++) {
    let startIndex = Math.max(0, i - Math.floor(frame / 2));
    let endIndex = Math.min(data.length, i + Math.ceil(frame / 2));
    startIndex = Math.min(startIndex, Math.max(0, endIndex - frame));
    endIndex = Math.max(endIndex, Math.min(data.length, startIndex + frame));
    const part = data.slice(startIndex, endIndex);
    const sum = part.reduce((sum, item) => sum + item, 0);
    const value = sum / part.length;
    result.push(value);
  }
  return result;
};

export const extractDataInsights = (
  data: Record<string, unknown>[] | Record<string, unknown>,
  hints: DataStructureHints,
  config: DataSummarizationConfig,
): AnalyzedData => {
  let insights: AnalyzedData['insights'] = [];
  let dataType: AnalyzedData['dataType'] | null = config.dataType ?? hints.dataType;
  let dataRange: AnalyzedData['dataRange'] | null = null;
  const dataTitle: string | null = hints.title.verticalAxes ?? hints.title.horizontalAxes;

  const keysMap = Object.fromEntries(
    Object.keys((Array.isArray(data) ? data[0] : data) ?? {}).map((key) => [key, true]),
  );

  if (!dataType) {
    if (
      ((keysMap['y'] || keysMap['y1'] || keysMap['y2']) &&
        keysMap['x'] &&
        (keysMap['value'] || keysMap['label'])) ||
      (hints.fields.horizontalAxes.size > 0 &&
        hints.fields.verticalAxes.size > 0 &&
        hints.fields.valueAxes.size > 0)
    ) {
      dataType = 'points-cloud';
    } else if (Array.isArray(data) && data.length > 6) {
      dataType = 'time-series';
    } else {
      dataType = 'values-set';
    }
  }

  if (Array.isArray(data)) {
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
        label: hints.title.verticalAxes ?? labelsKey[0],
      };

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
        const longMovingAverageSize = config.movingAverage.longSize ?? frameSize;
        const shortMovingAverageSize = config.movingAverage.shortSize ?? Math.sqrt(frameSize);
        const longMovingAverage = movingAverage(values, longMovingAverageSize);
        const shortMovingAverage = movingAverage(values, shortMovingAverageSize);

        const table = [];
        for (const i in values) {
          table.push({
            value: values[i].toFixed(2),
            long: (longMovingAverage[i] ?? NaN).toFixed(2),
            short: (shortMovingAverage[i] ?? NaN).toFixed(2),
          });
        }

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
          label: { from: unknown; to: unknown; dataKey: string };
          type: 'general-trend' | 'trend';
        }): GeneralTrendNode | TrendNode | undefined => {
          for (let i = 0; i < trendStrengths.length; i++) {
            const tang = Math.abs(value.from - value.to) / width;
            const trendStrength = trendStrengths[i];
            if (tang <= config.trendTangens[trendStrength] || i === trendStrengths.length - 1) {
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
                dataKey: label.dataKey,
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
          label: { from: firstRow[labelsKey], to: lastRow[labelsKey], dataKey: valueKey },
        })!;
        const localTrends: Insight[] = [];
        {
          const notableDiff = config.movingAverage.notableDiff ?? standardDeviation / 10;
          let lastSwitch = 0;
          let lastSwitchValue = shortMovingAverage[lastSwitch];
          let shortWasAbove = shortMovingAverage[0] > longMovingAverage[0];
          for (let i = 1; i < data.length; i++) {
            const shortIsAbove = shortMovingAverage[i] > longMovingAverage[i];
            const diff = Math.abs(shortMovingAverage[i] - longMovingAverage[i]);

            if (shortIsAbove === shortWasAbove) continue;
            if (diff < notableDiff) continue;
            if (i === 0 && lastSwitch === data.length - 1) continue;
            if (i === data.length - 1 && lastSwitch === 0) continue;
            i = Math.min(i, data.length - 1);
            localTrends.push(
              recordTrend({
                type: 'trend',
                value: {
                  from: lastSwitchValue,
                  to: shortMovingAverage[i],
                },
                width: i - lastSwitch,
                label: {
                  from: data[lastSwitch][labelsKey],
                  to: data[i][labelsKey],
                  dataKey: valueKey,
                },
              })!,
            );
            lastSwitch = i;
            lastSwitchValue = shortMovingAverage[lastSwitch];
            shortWasAbove = shortIsAbove;
          }

          if (lastSwitch !== 0) {
            const lastIndex = shortMovingAverage.length - 1;
            const lastValue = shortMovingAverage[lastIndex];
            if (Math.abs(lastSwitchValue - lastValue) > notableDiff) {
              localTrends.push(
                recordTrend({
                  type: 'trend',
                  value: {
                    from: lastSwitchValue,
                    to: lastValue,
                  },
                  width: lastIndex - lastSwitch,
                  label: {
                    from: data[lastSwitch][labelsKey],
                    to: data[lastIndex][labelsKey],
                    dataKey: valueKey,
                  },
                })!,
              );
            }
          }
        }
        insights.push(generalTrend);
        insights.push(...localTrends);
      }
    } else if (dataType === 'points-cloud') {
      const guessedXKey = [...hints.fields.horizontalAxes.values(), 'x'][0];
      const guessedYKey = [...hints.fields.verticalAxes.values(), 'y'][0];
      const guessedValueKey = [...hints.fields.valueAxes.values(), 'value'][0];
      const guessedLabelKey = keysMap['label'] ? 'label' : guessedValueKey;
      const normalized = data.map((row) => ({
        x: row[guessedXKey] as number,
        y: row[guessedYKey] as number,
        label: row[guessedLabelKey],
        value: row[guessedValueKey] as number,
      }));
      let gridSize =
        config.clustersGridSize ?? hints.grid.verticalAxes ?? hints.grid.horizontalAxes;
      if (!gridSize) {
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
        let avgDistance = 0;
        if (!Number.isNaN(betweenDistanceX) && !Number.isNaN(betweenDistanceY)) {
          avgDistance = (betweenDistanceX + betweenDistanceY) / 2;
        } else if (!Number.isNaN(betweenDistanceX)) {
          avgDistance = betweenDistanceX;
        } else if (!Number.isNaN(betweenDistanceY)) {
          avgDistance = betweenDistanceY;
        } else {
          avgDistance = (avgDistanceX + avgDistanceY) / 2;
        }
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
            xLabel: hints.title.horizontalAxes ?? guessedXKey,
            yLabel: hints.title.verticalAxes ?? guessedYKey,
          },
        });
      }
      clustersInsights.sort((a, b) => b.size - a.size);

      const relativeSizeDistrivution = {
        ['significantly-bigger']: { max: Infinity, min: 0.85 },
        ['bigger']: { min: 0.7, max: 0.85 },
        ['slightly-bigger']: { min: 0.6, max: 0.7 },
        ['average']: { min: 0.4, max: 0.6 },
        ['slightly-smaller']: { max: 0.4, min: 0.3 },
        ['smaller']: { min: 0.15, max: 0.3 },
        ['significantly-smaller']: { min: -Infinity, max: 0.15 },
      } as { [key in ClusterRelativeSize]: { min: number; max: number } };
      const averageSize =
        clustersInsights.reduce((sum, cluster) => sum + cluster.size, 0) / clustersInsights.length;
      const smallerClusters = clustersInsights.filter((cluster) => cluster.size < averageSize);
      const smallerSize =
        smallerClusters.reduce((sum, cluster) => sum + cluster.size, 0) / smallerClusters.length;
      const biggerClusters = clustersInsights.filter((cluster) => cluster.size > averageSize);
      const biggerSize =
        biggerClusters.reduce((sum, cluster) => sum + cluster.size, 0) / biggerClusters.length;

      const normalizingSize = averageSize * 2;
      let averageSizeNormalized = averageSize / normalizingSize;
      let smallerSizeNormalized = smallerSize / normalizingSize;
      let biggerSizeNormalized = biggerSize / normalizingSize;

      smallerSizeNormalized = !Number.isNaN(smallerSizeNormalized) ? smallerSizeNormalized : 0.25;
      averageSizeNormalized = !Number.isNaN(averageSizeNormalized) ? averageSizeNormalized : 0.5;
      biggerSizeNormalized = !Number.isNaN(biggerSizeNormalized) ? biggerSizeNormalized : 0.75;

      const sizeMapBezier = makeBezier(
        [
          { x: 0, y: 0 },
          { x: 0.25, y: smallerSizeNormalized, weight: 10 },
          { x: 0.5, y: averageSizeNormalized },
          { x: 0.75, y: biggerSizeNormalized, weight: 10 },
          { x: 1, y: 1 },
        ],
        { width: 1, height: 1 },
      );

      for (const clustersInsight of clustersInsights) {
        const { size } = clustersInsight;
        const mappedSize = sizeMapBezier(size / normalizingSize);
        for (const relativeSize in relativeSizeDistrivution) {
          const { min, max } = relativeSizeDistrivution[relativeSize as ClusterRelativeSize];
          if (mappedSize > min && mappedSize <= max) {
            clustersInsight.relativeSize = relativeSize as ClusterRelativeSize;
            break;
          }
        }
      }

      insights.push(...clustersInsights);

      const sortedX = [...takenX].sort((a, b) => a - b);
      dataRange = {
        from: sortedX[0] as any,
        to: sortedX[sortedX.length - 1] as any,
        label: hints.title.horizontalAxes,
      };
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
  } else if (dataType === 'grouped-values') {
    const groups = Object.entries(hints.groups).map(([groupKey, group]) => {
      const values: { label: string; value: unknown }[] = Object.entries(group.values).map(
        ([valueKey, value]) => ({
          label: hints.title.values[valueKey] ?? valueKey,
          value,
        }),
      );

      values.sort((a, b) => {
        if (typeof a.value !== 'number' || typeof b.value !== 'number') return 0;

        return b.value - a.value;
      });

      const averageValue =
        values.reduce((sum, { value }) => sum + (value as number), 0) / values.length;

      return {
        label: group.groupName ?? groupKey,
        values,
        averageValue: !Number.isNaN(averageValue) ? averageValue : undefined,
      };
    });

    groups.sort((a, b) => {
      if (typeof a.averageValue !== 'number' || typeof b.averageValue !== 'number') return 0;

      return b.averageValue - a.averageValue;
    });

    insights.push(
      ...groups.map(
        (group) =>
          ({
            type: 'comparison',
            label: group.label,
            values: group.values,
            priority: 1,
          } as ComparisonNode),
      ),
    );
  }

  const hasHighPriorityInsights = insights.some((insight) => insight.priority > 0);
  if (hasHighPriorityInsights) {
    insights = insights.filter((insight) => insight.priority > 0);
  } else {
    insights = insights.slice(0, 1);
  }

  return { insights, dataType: dataType!, dataRange, dataTitle };
};
