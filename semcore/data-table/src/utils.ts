import type { DTColumn } from './components/Head/Column.types';

export const getScrollOffsetValue = (columns: DTColumn[]) =>
  columns.reduce(
    (acc, column) => {
      if (column.fixed === 'left') {
        acc[0] += column.calculatedWidth;
      }
      if (column.fixed === 'right') {
        acc[1] += column.calculatedWidth;
      }
      return acc;
    },
    [0, 0] as [leftOffset: number, rightOffset: number],
  );

const cssVarReg = /[:;\W]/g;

export const createCssVarForWidth = (name: string) => {
  return `--${name.replace(cssVarReg, '_')}_width`;
};

/**
 * todo: Remove after v16
 */
export const flattenColumns = (columns: any[]) =>
  columns.reduce((acc, column) => {
    const hasNestedColumns = 'columns' in column && column.columns.length > 0;
    const columns: any[] = hasNestedColumns ? flattenColumns(column.columns) : [column];
    acc = acc.concat(columns);
    return acc;
  }, [] as any[]);

export const getFixedStyle = (
  cell: Pick<DTColumn, 'name' | 'fixed'>,
  columns: DTColumn[],
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
    right: index + 1,
  };
  const endIndexSideMap = {
    left: index,
    right: columns.length,
  };
  const columnsFixed = columns.slice(startIndexSideMap[side], endIndexSideMap[side]);

  if (columnsFixed.length < 1) return [side, 0];

  const sum = columnsFixed.reduce((acc, column) => acc + column.calculatedWidth, 0);
  return [side, `${sum}px`];
};
