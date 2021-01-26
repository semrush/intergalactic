import { Point } from 'recharts';
import hasNull from './hasNull';

function replaceNullValue(targetPoint: Point, sourcePoint: Point) {
  let field;
  if (targetPoint.x === null || (targetPoint.value && targetPoint.value[0] === 0)) field = 'x';
  if (targetPoint.y === null || (targetPoint.value && targetPoint.value[0] === 0)) field = 'y';
  return Object.assign({}, targetPoint, field ? { [field]: sourcePoint[field] } : {});
}

/**
 * Normalizes the array of points for the plot.
 * Fills points without data with points from neighboring ones.
 * It is necessary to continue the dotted line in those places where there is no data on the edges.
 * @param points
 * @param dataKey
 */
export default function normalizeCurvePoints(points: Point[], dataKey?: string): Point[] {
  const curvePoints = Array.from(points);
  if (hasNull(curvePoints[0], dataKey)) {
    const firstDefinedIndex = points.findIndex((point) => !hasNull(point, dataKey));
    curvePoints.forEach((point, index) => {
      if (index < firstDefinedIndex) {
        curvePoints[index] = replaceNullValue(point, points[firstDefinedIndex]);
      }
    });
  }
  const { length } = curvePoints;
  if (hasNull(curvePoints[length - 1], dataKey)) {
    const definedIndex = curvePoints
      .map((i) => i)
      .reverse()
      .findIndex((point) => !hasNull(point, dataKey));
    const firstDefinedIndex = length - 1 - definedIndex;
    curvePoints.forEach((point, index) => {
      if (index > firstDefinedIndex) {
        curvePoints[index] = replaceNullValue(point, points[firstDefinedIndex]);
      }
    });
  }
  return curvePoints;
}
