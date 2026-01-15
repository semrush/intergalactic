import { DataTable, ROW_GROUP } from '@semcore/ui/data-table';
import React from 'react';

export type MergedRowColumnWithFixedProps = {
  rowsCount?: 2 | 5 | 10;
  columnsCount?: 2 | 3 | 4;
  withBorders?: boolean;
  headerLevels?: 1 | 2;
  showLastRows?: boolean;
  lastRowsPosition?: 'top' | 'bottom' | 'both';
  showRightColumn?: boolean;
  fixedColumns?: boolean;
};

const generateData = (
  rowsCount: number,
  columnsCount: number,
  showLastRows: boolean,
  lastRowsPosition: 'top' | 'bottom' | 'both',
  showRightColumn: boolean,
) => {
  const childRows = Array.from({ length: rowsCount }, (_, i) => ({
    keyword: `${77.8 + i * 10}`,
    ...(showRightColumn && { keywordRight: `Right ${77.8 + i * 10}` }),
  }));

  const columnKeys = ['kd', 'cpc', 'vol', 'extra'];
  const mergedKey = columnKeys.slice(0, columnsCount).join('/');

  const additionalRows = [
    {
      keyword: 'google',
      kd: '88.5',
      cpc: '$2.50',
      vol: '40,000,000',
      ...(columnsCount >= 4 && { extra: '100' }),
      ...(showRightColumn && { keywordRight: 'google (right)' }),
    },
    {
      keyword: 'amazon',
      kd: '92.1',
      cpc: '$3.00',
      vol: '50,000,000',
      ...(columnsCount >= 4 && { extra: '200' }),
      ...(showRightColumn && { keywordRight: 'amazon (right)' }),
    },
  ];

  const groupedRow = {
    [mergedKey]: 'ebay buy',
    [ROW_GROUP]: childRows,
  };

  const data: any[] = [];

  if (showLastRows && (lastRowsPosition === 'top' || lastRowsPosition === 'both')) {
    data.push(...additionalRows);
  }

  data.push(groupedRow);

  if (showLastRows && (lastRowsPosition === 'bottom' || lastRowsPosition === 'both')) {
    data.push(...additionalRows);
  }

  return data;
};

const generateColumns = (
  columnsCount: number,
  withBorders: boolean,
  headerLevels: number,
  showRightColumn: boolean,
  fixedColumns: boolean,
) => {
  const columnConfigs = [
    { name: 'kd', children: 'KD %', gtcWidth: '150px' },
    { name: 'cpc', children: 'CPC', gtcWidth: '150px' },
    { name: 'vol', children: 'Vol.', gtcWidth: '150px' },
    { name: 'extra', children: 'Extra', gtcWidth: '150px' },
  ];

  const columns: any[] = [
    {
      name: 'keyword',
      children: 'Keyword',
      ...(fixedColumns && { fixed: 'left' }),
      gtcWidth: '150px',
    },
  ];

  if (headerLevels === 1) {
    columns.push(...columnConfigs.slice(0, columnsCount));
  } else if (headerLevels === 2) {
    columns.push({
      name: 'group',
      children: 'Organic Sessions',
      borders: withBorders ? 'both' : undefined,
      columns: columnConfigs.slice(0, columnsCount),
    });
  }

  if (showRightColumn) {
    columns.push({
      name: 'keywordRight',
      children: 'Keyword (right)',
      ...(fixedColumns && { fixed: 'right' }),
      ...(withBorders && { borders: 'left' }),
      gtcWidth: '150px',
    });
  }

  return columns;
};

const Demo = (props: MergedRowColumnWithFixedProps) => {
  const {
    rowsCount = 5,
    columnsCount = 3,
    withBorders = true,
    headerLevels = 2,
    showLastRows = true,
    lastRowsPosition = 'bottom',
    showRightColumn = false,
    fixedColumns = true,
  } = props;

  const data = generateData(rowsCount, columnsCount, showLastRows, lastRowsPosition, showRightColumn);
  const columns = generateColumns(columnsCount, withBorders, headerLevels, showRightColumn, fixedColumns);

  return (
    <DataTable
      data={data}
      aria-label='Merged cells with fixed column'
      wMax={500}
      columns={columns}
    />
  );
};

export const mergedRowColumnWithFixedProps: MergedRowColumnWithFixedProps = {
  rowsCount: 5,
  columnsCount: 3,
  withBorders: true,
  headerLevels: 2,
  showLastRows: true,
  lastRowsPosition: 'bottom',
  showRightColumn: false,
  fixedColumns: true,
};

Demo.defaultProps = mergedRowColumnWithFixedProps;

export default Demo;
