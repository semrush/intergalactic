export function getScrollOffsetValue(columns) {
  return columns.reduce(
    (acc, c) => {
      if (c.fixed === 'left') {
        acc[0] += c.width;
      }
      if (c.fixed === 'right') {
        acc[1] += c.width;
      }
      return acc;
    },
    [0, 0],
  );
}

export function flattenColumns(columns) {
  return columns.reduce((acc, c) => {
    let columns = [c];
    if (c.columns) {
      columns = flattenColumns(c.columns);
    }
    acc = acc.concat(columns);
    return acc;
  }, []);
}

export function getFixedStyle(column, columns) {
  const side = column.fixed;
  if (!side) return [undefined, undefined];
  const names = column.name.split('/');
  const nameSideMap = {
    left: names[0],
    right: names[names.length - 1],
  };
  const name = nameSideMap[side];
  const index = columns.findIndex((c) => c.name === name);

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

  const vars = columnsFixed.map((c) => `var(--${c.name}_width)`);
  return [side, vars.length === 1 ? vars[0] : `calc(${vars.join(' + ')})`];
}
