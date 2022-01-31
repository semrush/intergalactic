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

export function definedNullData(x, y) {
  return (p) => p[x] !== null && p[y] !== null;
}

export function definedData(x, y) {
  return (p) => {
    return p[x] !== null && p[x] !== undefined && p[y] !== null && p[y] !== undefined;
  };
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
        const defPrev = data.slice().reverse().find(defined);
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

export function roundedPath(x, y, w, h, r, tl = false, tr = false, bl = false, br = false) {
  let retval;
  retval = 'M' + (x + r) + ',' + y;
  retval += 'h' + (w - 2 * r);
  if (tr) {
    retval += 'a' + r + ',' + r + ' 0 0 1 ' + r + ',' + r;
  } else {
    retval += 'h' + r;
    retval += 'v' + r;
  }
  retval += 'v' + (h - 2 * r);
  if (br) {
    retval += 'a' + r + ',' + r + ' 0 0 1 ' + -r + ',' + r;
  } else {
    retval += 'v' + r;
    retval += 'h' + -r;
  }
  retval += 'h' + (2 * r - w);
  if (bl) {
    retval += 'a' + r + ',' + r + ' 0 0 1 ' + -r + ',' + -r;
  } else {
    retval += 'h' + -r;
    retval += 'v' + -r;
  }
  retval += 'v' + (2 * r - h);
  if (tl) {
    retval += 'a' + r + ',' + r + ' 0 0 1 ' + r + ',' + -r;
  } else {
    retval += 'v' + -r;
    retval += 'h' + r;
  }
  retval += 'z';
  return retval;
}

export function getBandwidth(scale) {
  if ('bandwidth' in scale) {
    return scale.bandwidth();
  }

  const range = scale.range();
  const domain = scale.domain();
  return Math.abs(range[range.length - 1] - range[0]) / domain.length;
}
