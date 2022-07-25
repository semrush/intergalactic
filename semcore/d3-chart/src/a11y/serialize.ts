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
      cutItems.push(intl.formatMessage({ id: 'ellipsis' }, { leftCount: limit - items.length }));
    }

    return intl.formatList(cutItems);
  };

  let formattedList = stringifyList();
  if (formattedList.length <= maxFinalStringLength) {
    return formattedList;
  }

  const overflowRatio = formattedList.length / maxFinalStringLength;
  limit = Math.floor(limit / overflowRatio);
  if (limit === 0) {
    limit = 1;
    return stringifyList();
  }

  formattedList = stringifyList();

  const maxIncreaseAttempts = 4;
  for (let i = 0; i < maxIncreaseAttempts; i++) {
    limit++;
    const newLimitFormattedList = stringifyList();

    if (newLimitFormattedList.length > maxFinalStringLength) {
      return formattedList;
    }

    formattedList = newLimitFormattedList;
  }

  return formattedList;
};

const isReactComponent = (obj: any) =>
  typeof obj === 'object' && obj && 'displayName' in obj && typeof obj.displayName === 'string';

const guessNumberAsTimestampMinDate = new Date('1975').getTime();

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
    if (value >= guessNumberAsTimestampMinDate) {
      return formatValue(intl, new Date(value), {
        siblingsTimeMark,
        maxListSymbols,
        datesWithTime,
      });
    }
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

  if (isReactComponent(value)) {
    return String((value as React.FC).displayName);
  }

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
    if (rawValue === undefined) return label;

    const value = formatValue(intl, rawValue, { datesWithTime, maxListSymbols });

    if (value === label) return value;

    return intl.formatMessage({ id: 'value-labeled' }, { label, value });
  });
  if (values.length > limit) {
    result.push(
      intl.formatMessage({ id: 'ellipsis' }, { leftCount: limit - values.values.length }),
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

  const dataRnageSummary = intl.formatList(
    dataRange.map((range) => {
      const from = formatValue(intl, range.from, {
        siblingsTimeMark: range.to,
        datesWithTime,
        maxListSymbols,
      });
      const to = formatValue(intl, range.to, {
        siblingsTimeMark: range.from,
        datesWithTime,
        maxListSymbols,
      });

      return intl.formatMessage(
        { id: range.label ? 'additional-axe' : 'additional-axe-no-label' },
        { from, to, label: range.label },
      );
    }),
  );

  if (dataType === 'time-series') {
    const trendsInsights = insights as (GeneralTrendNode | TrendNode)[];
    const trendsByDataKey: { [label: string]: (GeneralTrendNode | TrendNode)[] } = {};
    for (const insight of trendsInsights) {
      trendsByDataKey[insight.dataKey] = trendsByDataKey[insight.dataKey] ?? [];
      trendsByDataKey[insight.dataKey].push(insight);
    }

    const entitiesCount = Object.keys(trendsByDataKey).length;
    const entities = intl.formatMessage(
      { id: 'entity-type-time-series' },
      { count: entitiesCount },
    );
    const entitiesList = Object.entries(trendsByDataKey).map(([dataKey, insights]) => {
      const generalTrend = insights.find((insight) => insight.type === 'general-trend');
      const localTrends = insights.filter((insight) => insight !== generalTrend);
      const primaryTrend = generalTrend ?? localTrends[0];
      const secondaryTrends: (TrendNode | GeneralTrendNode)[] = insights.filter(
        (insight) => insight !== primaryTrend,
      );
      const mainSummary: string = intl.formatMessage(
        { id: 'time-series-general-trend' },
        {
          dataKey: entitiesCount !== 1 ? dataKey : '',
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
          locals: formatLimitedSizeList(secondarylSummaries, intl, 400, false),
        },
      );
    });

    const summary = intl.formatMessage(
      { id: dataTitle ? 'chart-summary' : 'chart-summary-no-label' },
      { entities, entitiesList: intl.formatList(entitiesList), label: dataTitle },
    );

    if (dataRnageSummary.length > 0) {
      return `${summary}\n${dataRnageSummary}`;
    }

    return summary;
  } else if (dataType === 'points-cloud') {
    const clustersInsights = insights as ClusterNode[];
    const biggestClusters = clustersInsights.slice(0, clustersLimit);

    const maxSize = clustersInsights[0].size;
    const minSize = clustersInsights[clustersInsights.length - 1].size;
    const entities =
      maxSize === minSize
        ? intl.formatMessage(
            { id: 'entity-type-clusters-single-size' },
            { count: insights.length, size: maxSize },
          )
        : intl.formatMessage(
            { id: 'entity-type-clusters-multiple-size' },
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

    if (dataRnageSummary.length > 0) {
      return `${summary}\n${dataRnageSummary}`;
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
    const minValuesCount = Math.min(...valueCounts);
    const maxValuesCount = Math.max(...valueCounts);

    const entities =
      minValuesCount === maxValuesCount
        ? intl.formatMessage(
            { id: 'entity-type-grouped-values-single-size' },
            { groupsCount: groupInsights.length, valuesCount: valueCounts[0] },
          )
        : intl.formatMessage(
            { id: 'entity-type-grouped-values-multiple-size' },
            { groupsCount: groupInsights.length, minValuesCount, maxValuesCount },
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
