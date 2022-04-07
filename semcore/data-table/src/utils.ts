import type { Column } from './types';

export const getScrollOffsetValue = (columns: Column[]) =>
  columns.reduce(
    (acc, column) => {
      if (column.fixed === 'left') {
        acc[0] += column.width;
      }
      if (column.fixed === 'right') {
        acc[1] += column.width;
      }
      return acc;
    },
    [0, 0] as [leftOffset: number, rightOffset: number],
  );

export const flattenColumns = (columns: Column[]) =>
  columns.reduce((acc, column) => {
    const hasNestedColumns = 'columns' in column && column.columns.length > 0;
    const columns: Column[] = hasNestedColumns ? flattenColumns(column.columns) : [column];
    acc = acc.concat(columns);
    return acc;
  }, [] as Column[]);

export const getFixedStyle = (
  cell: Pick<Column, 'name' | 'fixed'>,
  columns: Column[],
): [side: 'left' | 'right', style: string | number] | [side: undefined, style: undefined] => {
  const side = cell.fixed;
  if (!side) return [undefined, undefined];
  const names = cell.name.split('/');
  const nameSideMap = {
    left: names[0],
    right: names[names.length - 1],
  };
  const name = nameSideMap[side];
  const index = columns.findIndex((column) => column.name === name);

  if (index === -1) return [undefined, undefined];

  const startIndexSideMap = {
    left: 0,
    right: index,
  };
  const endIndexSideMap = {
    left: index,
    right: columns.length - 1,
  };
  const columnsFixed = columns.slice(startIndexSideMap[side], endIndexSideMap[side]);

  if (columnsFixed.length < 1) return [side, 0];

  const vars = columnsFixed.map((column) => `var(--${column.name}_width)`);
  return [side, vars.length === 1 ? vars[0] : `calc(${vars.join(' + ')})`];
};
