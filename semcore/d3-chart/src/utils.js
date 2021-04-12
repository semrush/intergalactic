import { extent, bisector } from 'd3-array';
import { scaleQuantize } from 'd3-scale';

const CONSTANT = {
  VIRTUAL_ELEMENT: Symbol('VIRTUAL_ELEMENT'),
};

export { CONSTANT };

export function eventToPoint(event, svgRoot) {
  const node = event.currentTarget || event.target;
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

export function getNullData(data, defined, name) {
  return data.reduce((acc, d, i, data) => {
    if (defined(d)) {
      acc.push({
        [name]: null,
      });
    } else {
      const prev = data[i - 1];
      const next = data[i + 1];

      if (i === 0) {
        const defNext = data.find(defined);
        acc.push({
          ...d,
          [name]: defNext ? defNext[name] : null,
        });
      }

      // prev
      if (prev && defined(prev)) {
        acc.push(prev);
      }

      // next
      if (next && defined(next)) {
        acc.push(next);
      }

      if (data.length - 1 === i) {
        const defPrev = data
          .slice()
          .reverse()
          .find(defined);
        acc.push({
          ...d,
          [name]: defPrev ? defPrev[name] : null,
        });
      }
    }
    return acc;
  }, []);
}

export function getIndexFromData(data, scale, key, value) {
  // detect line chart
  if ('invert' in scale && typeof scale.invert === 'function') {
    const bisect = bisector((d) => d[key]).center;
    return bisect(data, value);
  }
  // detect bar chart
  else if ('step' in scale && typeof scale.step !== 'undefined') {
    const index = data.findIndex((d) => d[key] === value);
    return index >= 0 ? index : null;
  } else {
    console.warn('[d3-chart/utils/getIndexFromData] encountered incompatible scale type');
    return null;
  }
}
