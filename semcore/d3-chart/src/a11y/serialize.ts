import { AnalyzedData, ClusterNode, ComparisonNode, GeneralTrendNode, TrendNode } from './insights';

import React from 'react';
import { DataSummarizationConfig } from './hints';
import { getIntl, Intl } from './intl';

const formatLimitedSizeList = (items: unknown[], intl: Intl, maxFinalStringLength = 100) => {
  let limit = items.length;
  const stringifyList = () => {
    const cutItems = items.slice(0, limit);
    if (items.length > limit) {
      cutItems.push(intl.formatMessage({ id: 'ellipsis' }, { leftCount: items.length - limit }));
    }

    return intl.formatList(cutItems);
  };

  let formattedList = stringifyList();
  if (formattedList.length <= maxFinalStringLength) {
    return formattedList;
  }
  const initialLimit = limit;
  while (formattedList.length > maxFinalStringLength) {
    const newLimit = Math.round(limit / 2);
    if (newLimit === limit) return formattedList;
    limit = newLimit;
    formattedList = stringifyList();
  }
  const increaseStep = Math.round((limit - initialLimit) / 4);
  if (increaseStep < 1) {
    return formattedList;
  }
  while (formattedList.length < maxFinalStringLength) {
    limit += increaseStep;
    formattedList = stringifyList();
  }
  return formattedList;
};

const isReactComponent = (obj: any) =>
  typeof obj === 'object' && obj && 'displayName' in obj && typeof obj.displayName === 'string';

export const formatValue = (
  intl: Intl,
  value: unknown,
  {
    siblingsTimeMark,
    maxListSymbols,
    datesWithTime,
  }: {
    siblingsTimeMark?: unknown;
    maxListSymbols?: number;
    datesWithTime?: boolean;
  } = {},
): string => {
  if (typeof value === 'number') {
    return intl.formatNumber(value);
  }
  if (value instanceof Date) {
    if (
      datesWithTime ||
      (siblingsTimeMark &&
        siblingsTimeMark instanceof Date &&
        Math.abs(value.getTime() - siblingsTimeMark.getTime()) < 1000 * 60 * 60 * 24 * 5)
    ) {
      return intl.formatDate(value, { dateStyle: 'medium', timeStyle: 'medium' });
    }
    return intl.formatDate(value, { dateStyle: 'medium' });
  }

  if (Array.isArray(value)) {
    const formattedValues = value.map((subValue) =>
      formatValue(intl, subValue, { siblingsTimeMark, maxListSymbols, datesWithTime }),
    );

    return formatLimitedSizeList(formattedValues, intl, maxListSymbols);
  }

  if (isReactComponent(value))
    return intl.formatMessage(
      { id: 'react-component' },
      { displayName: (value as React.FC).displayName! },
    );

  return String(value);
};

export const serialize = (
  { insights, dataType, dataRange, dataTitle }: AnalyzedData,
  { datesWithTime, maxListSymbols, clustersLimit, valuesLimit }: DataSummarizationConfig,
  locale: string,
) => {
  if (insights.length === 0) return null;

  const intl = getIntl(locale);

  const from =
    dataRange &&
    formatValue(intl, dataRange.from, {
      siblingsTimeMark: dataRange.to,
      datesWithTime,
      maxListSymbols,
    });
  const to =
    dataRange &&
    formatValue(intl, dataRange.to, {
      siblingsTimeMark: dataRange.from,
      datesWithTime,
      maxListSymbols,
    });

  if (dataType === 'time-series') {
    const trendsInsights = insights as (GeneralTrendNode | TrendNode)[];
    const trendsByLabel: { [label: string]: (GeneralTrendNode | TrendNode)[] } = {};
    for (const insight of trendsInsights) {
      trendsByLabel[insight.label] = trendsByLabel[insight.label] ?? [];
      trendsByLabel[insight.label].push(insight);
    }

    const entities = intl.formatMessage(
      { id: 'entity-type-time-series' },
      { count: Object.keys(trendsByLabel).length },
    );
    const entitiesList = intl.formatList(Object.keys(trendsByLabel));
    const summaryHead = intl.formatMessage(
      { id: dataTitle ? 'chart-summary' : 'chart-summary-no-label' },
      { entities, entitiesList, label: dataTitle },
    );
    const result = [summaryHead];
    if (dataRange) {
      const additionalAxe = intl.formatMessage(
        { id: dataRange.label ? 'additional-axe' : 'additional-axe-no-label' },
        { from, to, label: dataRange.label },
      );
      result.push(additionalAxe);
    }
    const summaryBody = Object.entries(trendsByLabel).map(([label, insights]) => {
      const generalTrend = insights.find((insight) => insight.type === 'general-trend');
      const localTrends = insights.filter((insight) => insight !== generalTrend);
      const namedTrend = generalTrend ?? localTrends[0];
      const unnamedTrends = insights.filter((insight) => insight !== namedTrend);
      const mainSummary = intl.formatMessage(
        { id: 'time-series-general-trend' },
        {
          label,
          trend: intl.formatMessage({ id: `trend-${namedTrend.change.strength}` }),
          from: intl.formatNumber(namedTrend.change.from),
          to: intl.formatNumber(namedTrend.change.to),
        },
      );
      const additionalSummaries = unnamedTrends.map((trend) =>
        intl.formatMessage(
          { id: 'time-series-local-trend' },
          {
            trend: intl.formatMessage({ id: `trend-${trend.change.strength}` }),
            from: formatValue(intl, trend.from, {
              siblingsTimeMark: trend.to,
              datesWithTime,
              maxListSymbols,
            }),
            to: formatValue(intl, trend.to, {
              siblingsTimeMark: trend.from,
              datesWithTime,
              maxListSymbols,
            }),
          },
        ),
      );

      if (additionalSummaries.length === 0) {
        return mainSummary;
      }

      return intl.formatMessage(
        {
          id: 'time-series-detailed-trend',
        },
        {
          general: mainSummary,
          locals: intl.formatList(additionalSummaries),
        },
      );
    });
    result.push(...summaryBody);

    return result.join('\n');
  } else if (dataType === 'points-cloud') {
    const clustersInsights = insights as ClusterNode[];
    const biggestClusters = clustersInsights.slice(0, clustersLimit);

    const maxSize = clustersInsights[0].size;
    const minSize = clustersInsights[clustersInsights.length - 1].size;
    const entities = intl.formatMessage(
      { id: 'entity-type-clusters' },
      { count: insights.length, maxSize, minSize },
    );
    const entitiesList = biggestClusters.map((clusterInsight) => {
      const labels = formatLimitedSizeList(clusterInsight.labels, intl, maxListSymbols);
      const anonymous =
        clusterInsight.labels.length === 0 || labels === String(clusterInsight.size);

      return intl.formatMessage(
        {
          id: anonymous ? 'entity-type-clusters-label-anonymous' : 'entity-type-clusters-label',
        },
        {
          relativeSize: intl.formatMessage({ id: `relative-size-${clusterInsight.relativeSize}` }),
          labels,
          size: clusterInsight.size,
          x: intl.formatNumber(clusterInsight.center.x),
          xLabel: clusterInsight.center.xLabel,
          y: intl.formatNumber(clusterInsight.center.y),
          yLabel: clusterInsight.center.yLabel,
        },
      );
    });
    if (insights.length > clustersLimit) {
      entitiesList.push(
        intl.formatMessage({ id: 'ellipsis' }, { leftCount: insights.length - clustersLimit }),
      );
    }

    const summaryHead = intl.formatMessage(
      { id: dataTitle ? 'chart-summary' : 'chart-summary-no-label' },
      { entities, entitiesList: intl.formatList(entitiesList), label: dataTitle },
    );
    if (dataRange) {
      const additionalAxe = intl.formatMessage(
        { id: dataRange.label ? 'additional-axe' : 'additional-axe-no-label' },
        { from, to, label: dataRange.label },
      );
      return [summaryHead, additionalAxe].join('\n');
    }
    return summaryHead;
  } else if (dataType === 'values-set') {
    const [valuesInsight] = insights as [ComparisonNode];
    const entities = intl.formatMessage(
      { id: 'entity-type-values' },
      { count: valuesInsight.values.length },
    );
    const entitiesList = valuesInsight.values
      .slice(0, valuesLimit)
      .map(({ value: rawValue, label }) => {
        const value = formatValue(intl, rawValue, { datesWithTime, maxListSymbols });
        return intl.formatMessage(
          { id: value === label ? 'value' : 'value-labeled' },
          { label, value },
        );
      });
    if (valuesInsight.values.length > valuesLimit) {
      entitiesList.push(
        intl.formatMessage(
          { id: 'ellipsis' },
          { leftCount: valuesInsight.values.length - valuesLimit },
        ),
      );
    }
    const sumamry = intl.formatMessage(
      { id: dataTitle ? 'chart-summary' : 'chart-summary-no-label' },
      { entities, entitiesList: intl.formatList(entitiesList), label: dataTitle },
    );
    return sumamry;
  }
};
