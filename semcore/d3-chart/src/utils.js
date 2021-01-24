import { extent } from 'd3-array';
import { scaleQuantize } from 'd3-scale';

export function eventToPoint(event, svgRoot) {
  const node = event.currentTarget || event.target;
  const svg = node.ownerSVGElement;
  if (svg) {
    let point = svg.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    point = point.matrixTransform(node.getScreenCTM().inverse());
    return [point.x, point.y];
  }
  const rect = svgRoot.getBoundingClientRect();
  return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
}

export function invert(scale, value) {
  if (scale.invert) return scale.invert(value);

  const range = scale.range();
  const domain = scale.domain();

  return scaleQuantize()
    .domain(range[0] <= range[1] ? range : range.slice().reverse())
    .range(range[0] <= range[1] ? domain : domain.slice().reverse())(value);
}

export function definedData(x, y) {
  return (p) => p[x] !== null && p[y] !== null;
}

export function scaleOfBandwidth(scale, value) {
  return scale.bandwidth ? scale(value) + scale.bandwidth() / 2 : scale(value);
}

export function minMax(data, key) {
  if (typeof key === 'string') {
    return extent(data, (d) => d[key]);
  }
  return extent(data, key);
}
