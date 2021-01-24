import { Point } from 'recharts';
import hasNull from './hasNull';

export default function filterDotPoints(dataKey?: string) {
  return function filter(point: Point, index: number, points: Point[]) {
    const { length } = points;
    if (hasNull(point, dataKey) || index > length) return false;
    const prev = index > 0 ? points[index - 1] : points[index + 1];
    const next = index < length - 1 ? points[index + 1] : points[index - 1];
    return hasNull(prev, dataKey) && hasNull(next, dataKey);
  };
}
