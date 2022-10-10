import { Point } from 'recharts';
import hasNull from './hasNull';

/**
 * Divides an array of plot points into an array with arrays of points
 * separated by segments of no data points 🤯
 * @param {Point[]} points - array of points
 * @param {String} dataKey - data key
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
