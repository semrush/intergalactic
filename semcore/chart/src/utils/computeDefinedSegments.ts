import { Point } from 'recharts';
import hasNull from './hasNull';

/**
 * Делит массив точек графика на массив с массивами точек,
 * разделенных сегментами точек без данных 🤯
 * @param {Point[]} points - массив точек
 * @param {String} dataKey - key данных
 * @return {Point[][]}
 */
export default function computeDefinedSegments(points: Point[], dataKey: string): Point[][] {
  let startNewSegment = true;

  return points.reduce((segments, point) => {
    if (hasNull(point, dataKey)) {
      startNewSegment = true;
      return segments;
    }

    if (startNewSegment) {
      segments.push([point]);
      startNewSegment = false;
    } else {
      const lastSegment = segments[segments.length - 1];
      lastSegment.push(point);
    }

    return segments;
  }, []);
}
