import { Point } from 'recharts';
import hasNull from './hasNull';

export default function deleteNullCurvePoints(points: Point[], dataKey: string): Point[] {
  return points.reduce((acc, point, index) => {
    if (!hasNull(point, dataKey) || index === 0 || index === points.length - 1) {
      acc.push(point);
    }
    return acc;
  }, []);
}
