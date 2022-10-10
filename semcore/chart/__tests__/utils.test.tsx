import { normalizeCurvePoints, filterDotPoints } from '../src/utils';
import { colors } from '../src/utils/colors';
/**
 * @param {Number[]} indexes
 * @param {Object[]} arr
 * @return {Object[]}
 */
function addNulls(indexes, arr) {
  return arr.map((item, idx) => {
    if (!indexes.includes(idx)) return item;
    const field = Math.random() > 0.5 ? 'x' : 'y';
    return { ...item, [field]: null };
  });
}

const pointsMock = Array(20).fill({
  x: 120,
  y: 10,
  payload: {},
});

describe('normalizeCurvePoints', () => {
  test('Replace points with nulls with closest non-null variable in the start of array', () => {
    const source = addNulls([0, 1, 2, 3, 4], pointsMock);
    expect(normalizeCurvePoints(source)).toEqual(pointsMock);
  });

  test('Replace points with nulls with closest non-null variable in the end of array', () => {
    const source = addNulls([15, 16, 17, 18, 19], pointsMock);
    expect(normalizeCurvePoints(source)).toEqual(pointsMock);
  });

  test('Don`t replace points if they are not located in the start or in the end of array', () => {
    const source = addNulls([1, 2, 3, 5, 6, 10, 15], pointsMock);
    expect(normalizeCurvePoints(source)).toEqual(source);
  });
});

describe('filterPoints', () => {
  const filterFn = filterDotPoints();
  test('Returns false if point has null', () => {
    const source = addNulls([0], pointsMock);
    expect(source.filter(filterFn)).toHaveLength(0);
  });
  test('Returns false if point is first or last element of points array', () => {
    const source = addNulls([0, pointsMock.length - 1], pointsMock);
    expect(source.filter(filterFn)).toHaveLength(0);
  });
  test('Returns false if point before or after doesnt have nulls', () => {
    expect(pointsMock.filter(filterFn)).toHaveLength(0);
  });
  test('Returns false if only point before or after has hulls', () => {
    const source = addNulls([0, 3], pointsMock);
    expect(source.filter(filterFn)).toHaveLength(0);
  });
  test('Returns true if point before has null & point after has null', () => {
    const source = addNulls([0, 2], pointsMock);
    expect(source.filter(filterFn)).toHaveLength(1);
  });

  test('Returns true if point start get data & point next has null', () => {
    const source = addNulls([1], pointsMock);
    expect(source.filter(filterFn)).toHaveLength(1);
  });

  test('Returns true if point finish get null & point after has null', () => {
    const source = addNulls([18], pointsMock);
    expect(source.filter(filterFn)).toHaveLength(1);
  });

  test('Support export function colors', () => {
    expect(typeof colors).toEqual('object');
    expect(colors['white']).toEqual('#ffffff');
  });
});
