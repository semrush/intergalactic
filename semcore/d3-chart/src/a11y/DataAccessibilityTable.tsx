import React from 'react';
import type { DataStructureHints, DataSummarizationConfig } from './hints';
import type { Intl } from './intl';
import { defaultValueFormatter } from './serialize';

export const DataAccessibilityTable: React.FC<{
  id: string;
  dataTableRef: React.RefObject<HTMLTableElement>;
  data: Record<string | number, unknown>[];
  hints: DataStructureHints;
  config: DataSummarizationConfig;
  intl: Intl;
}> = ({ id, dataTableRef, data, hints, config, intl }) => {
  const keys = React.useMemo(() => {
    let fromHints: (string | number)[] = [];
    fromHints.push(...hints.fields.verticalAxes);
    fromHints.push(...hints.fields.horizontalAxes);
    fromHints.push(...hints.fields.valueAxes);
    fromHints.push(...config.additionalFields);
    fromHints.push(...Object.keys(hints.fields.values));

    fromHints = [...new Set(fromHints)].filter((key) => key in data[0]);

    if (fromHints.length === 0) {
      data.forEach((row) => fromHints.push(...Object.keys(row)));
    }

    return [...new Set(fromHints)];
  }, [data, hints]);
  const duplicatedBaseKeys = React.useMemo(() => {
    const baseKeys = keys
      .filter((key) => !hints.titles.valuesAxes[key])
      .map((key) => {
        if (hints.fields.verticalAxes.has(key) && hints.axesTitle.vertical)
          return [key, hints.axesTitle.vertical];
        if (hints.fields.horizontalAxes.has(key) && hints.axesTitle.horizontal)
          return [key, hints.axesTitle.horizontal];
      })
      .filter((entry) => entry !== undefined)
      .map((entry) => entry!);
    const doublicated: Record<string, true> = {};
    const handled: Record<string, string | number> = {};
    for (const [key, label] of baseKeys) {
      if (handled[label]) {
        doublicated[key] = true;
        doublicated[handled[label]] = true;
      }
      handled[label] = key;
    }
    return doublicated;
  }, [keys, hints]);
  const renderTitle = React.useCallback(
    (dataKey: string | number) => {
      const formatted = config.titlesFormatter?.(dataKey);
      if (formatted !== undefined) return formatted;
      if (hints.titles.valuesAxes[dataKey]) return hints.titles.valuesAxes[dataKey];
      if (!duplicatedBaseKeys[dataKey]) {
        if (hints.fields.verticalAxes.has(dataKey) && hints.axesTitle.vertical)
          return hints.axesTitle.vertical;
        if (hints.fields.horizontalAxes.has(dataKey) && hints.axesTitle.horizontal)
          return hints.axesTitle.horizontal;
      }

      return dataKey;
    },
    [data, hints, duplicatedBaseKeys, config],
  );
  const formatValue = React.useCallback(
    (value: unknown, row: string) => {
      return config.valuesFormatter?.(value, row) ?? defaultValueFormatter(intl, value);
    },
    [intl, config],
  );

  return (
    <table id={`${id}-data-table`} tabIndex={0} ref={dataTableRef}>
      <thead>
        <tr>
          {keys.map((key, index) => (
            <th key={`${key}-${index}`}>{renderTitle(key)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => {
          const key = `${Object.values(row)
            .filter((item) => typeof item !== 'symbol')
            .join('-')}-${index}`;
          const cells = keys.map((key) =>
            typeof row[key] !== 'symbol' ? [key, row[key]] : [key, ''],
          );

          return (
            <tr key={key}>
              {cells.map(([key, value], index) => (
                <td key={`${key}-${index}`}>{formatValue(value, keys[index] as string)}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
