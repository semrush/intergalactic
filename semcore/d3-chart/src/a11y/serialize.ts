import { AnalyzedData, ClusterNode, ComparisonNode, GeneralTrendNode, TrendNode } from './insights';

import React from 'react';
import { DataSummarizationConfig } from './hints';
import { getIntl, Intl } from './intl';

const formatLimitedSizeList = (
  items: unknown[],
  intl: Intl,
  maxFinalStringLength = 100,
  includeEllipsis = true,
) => {
  let limit = items.length;
  const stringifyList = () => {
    const cutItems = items.slice(0, limit);
    if (items.length > limit && includeEllipsis) {
      cutItems.push(intl.formatMessage({ id: 'ellipsis' }, { leftCount: items.length - limit }));
    }

    return intl.formatList(cutItems);
  };

  let formattedList = stringifyList();
  if (formattedList.length <= maxFinalStringLength) {
    return formattedList;
  }
  // TODO: optimize
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

const formatValuesList = (
  values: { label: string; value: unknown }[],
  {
    intl,
    limit,
    datesWithTime,
    maxListSymbols,
  }: { intl: Intl; limit: number; datesWithTime?: boolean; maxListSymbols: number },
) => {
  const result = values.slice(0, limit).map(({ value: rawValue, label }) => {
    const value = formatValue(intl, rawValue, { datesWithTime, maxListSymbols });
    return intl.formatMessage(
      { id: value === label ? 'value' : 'value-labeled' },
      { label, value },
    );
  });
  if (values.length > limit) {
    result.push(
      intl.formatMessage({ id: 'ellipsis' }, { leftCount: values.values.length - limit }),
    );
  }

  return intl.formatList(result);
};

export const serialize = (
  { insights, dataType, dataRange, dataTitle }: AnalyzedData,
  {
    datesWithTime,
    maxListSymbols,
    clustersLimit,
    valuesLimit,
    groupsLimit,
  }: DataSummarizationConfig,
  {
    locale,
    translations,
  }: { locale: string; translations?: { [locale: string]: { [messageId: string]: string } } },
): string | null => {
  if (insights.length === 0) return null;

  const intl = getIntl(locale, translations);

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
    const trendsByDataKey: { [label: string]: (GeneralTrendNode | TrendNode)[] } = {};
    for (const insight of trendsInsights) {
      trendsByDataKey[insight.dataKey] = trendsByDataKey[insight.dataKey] ?? [];
      trendsByDataKey[insight.dataKey].push(insight);
    }

    const entities = intl.formatMessage(
      { id: 'entity-type-time-series' },
      { count: Object.keys(trendsByDataKey).length },
    );
    const entitiesList = intl.formatList(Object.keys(trendsByDataKey));
    const summaryHead = intl.formatMessage(
      { id: dataTitle ? 'chart-summary' : 'chart-summary-no-label' },
      { entities, entitiesList, label: dataTitle },
    );
    const summary = [summaryHead];
    if (dataRange) {
      const additionalAxe = intl.formatMessage(
        { id: dataRange.label ? 'additional-axe' : 'additional-axe-no-label' },
        { from, to, label: dataRange.label },
      );
      summary.push(additionalAxe);
    }
    const summaryBody = Object.entries(trendsByDataKey).map(([dataKey, insights]) => {
      const generalTrend = insights.find((insight) => insight.type === 'general-trend');
      const localTrends = insights.filter((insight) => insight !== generalTrend);
      const primaryTrend = generalTrend ?? localTrends[0];
      const secondaryTrends: (TrendNode | GeneralTrendNode)[] = insights.filter(
        (insight) => insight !== primaryTrend,
      );
      const mainSummary: string = intl.formatMessage(
        { id: 'time-series-general-trend' },
        {
          dataKey,
          trend: intl.formatMessage({ id: `trend-${primaryTrend.change.strength}` }),
          from: intl.formatNumber(primaryTrend.change.from),
          to: intl.formatNumber(primaryTrend.change.to),
        },
      );
      const secondarylSummaries = secondaryTrends.map((trend) =>
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

      if (secondarylSummaries.length === 0) {
        return mainSummary;
      }

      return intl.formatMessage(
        {
          id: 'time-series-detailed-trend',
        },
        {
          general: mainSummary,
          locals: formatLimitedSizeList(secondarylSummaries, intl, 500, false),
        },
      );
    });
    summary.push(...summaryBody);

    return summary.join('\n');
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

    const summary = intl.formatMessage(
      { id: dataTitle ? 'chart-summary' : 'chart-summary-no-label' },
      { entities, entitiesList: intl.formatList(entitiesList), label: dataTitle },
    );
    if (dataRange) {
      const additionalAxe = intl.formatMessage(
        { id: dataRange.label ? 'additional-axe' : 'additional-axe-no-label' },
        { from, to, label: dataRange.label },
      );
      return [summary, additionalAxe].join('\n');
    }

    return summary;
  } else if (dataType === 'values-set') {
    const [valuesInsight] = insights as [ComparisonNode];
    const entities = intl.formatMessage(
      { id: 'entity-type-values' },
      { count: valuesInsight.values.length },
    );
    const entitiesList = formatValuesList(valuesInsight.values, {
      intl,
      limit: valuesLimit,
      datesWithTime,
      maxListSymbols,
    });

    const sumamry = intl.formatMessage(
      { id: dataTitle ? 'chart-summary' : 'chart-summary-no-label' },
      { entities, entitiesList: entitiesList, label: dataTitle },
    );

    return sumamry;
  } else if (dataType === 'grouped-values') {
    const groupInsights = insights as ComparisonNode[];
    const valueCounts = groupInsights.map((group) => group.values.length);

    const entities = intl.formatMessage(
      { id: 'entity-type-grouped-values' },
      {
        groupsCount: groupInsights.length,
        valuesCount: valueCounts[0],
        minValuesCount: Math.min(...valueCounts),
        maxValuesCount: Math.max(...valueCounts),
      },
    );
    const entitiesList = groupInsights.slice(0, groupsLimit).map(({ label, values }) => {
      const formattedValues = formatValuesList(values, {
        intl,
        limit: valuesLimit,
        datesWithTime,
        maxListSymbols,
      });
      return intl.formatMessage({ id: 'values-group' }, { label, values: formattedValues });
    });
    if (groupInsights.values.length > groupsLimit) {
      entitiesList.push(
        intl.formatMessage(
          { id: 'ellipsis' },
          { leftCount: groupInsights.values.length - groupsLimit },
        ),
      );
    }

    const sumamry = intl.formatMessage(
      { id: dataTitle ? 'chart-summary' : 'chart-summary-no-label' },
      { entities, entitiesList: intl.formatList(entitiesList), label: dataTitle },
    );

    return sumamry;
  }

  return null;
};
