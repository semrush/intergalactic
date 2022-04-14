import { extent, bisector, Numeric } from 'd3-array';
import {
  scaleQuantize,
  ScaleIdentity,
  ScaleTime,
  ScaleContinuousNumeric,
  ScaleBand,
  ScalePoint,
  NumberValue,
} from 'd3-scale';
import React from 'react';

const CONSTANT = {
  VIRTUAL_ELEMENT: Symbol('VIRTUAL_ELEMENT'),
} as const;

export { CONSTANT };

export const eventToPoint = (event: React.MouseEvent<HTMLElement>, svgRoot: SVGElement) => {
  const node = (event.currentTarget || event.target) as HTMLElement;
  const rect = svgRoot.getBoundingClientRect();
  return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
};

type InvertableScale =
  | ScaleIdentity
  | ScaleTime<unknown, unknown>
  | ScaleContinuousNumeric<unknown, unknown>;
export const invert = <Scale extends InvertableScale = InvertableScale>(
  scale: Scale,
  value: number,
) => {
  if (scale.invert) return scale.invert(value);

  const range = scale.range() as number[];
  const domain = scale.domain();

  return scaleQuantize()
    .domain((range[0] <= range[1] ? range : range.slice().reverse()) as NumberValue[])
    .range((range[0] <= range[1] ? domain : domain.slice().reverse()) as number[])(value);
};

export const definedNullData = (x: number, y: number) => (plot: { [xOrY: number]: unknown }) =>
  plot[x] !== null && plot[y] !== null;

export const definedData = (x: number, y: number) => (plot: { [xOrY: number]: unknown }) =>
  plot[x] !== null && plot[x] !== undefined && plot[y] !== null && plot[y] !== undefined;

export const scaleOfBandwidth = <Scale extends ScaleBand<{}>>(scale: Scale, value: number) =>
  scale.bandwidth ? scale(value)! + scale.bandwidth() / 2 : scale(value);

export const minMax = <
  Key extends string = string,
  Data extends Iterable<{ [key in Key]: Numeric | null | undefined }> = Iterable<{
    [key in Key]: Numeric | null | undefined;
  }>,
>(
  data: Data,
  key: Key,
) => {
  if (typeof key === 'string') {
    return extent(data, (d) => d[key]);
  }
  return extent(data, key);
};

export const getNullData = <
  Name extends string = string,
  Data extends { [name in Name]?: unknown | null } = {},
>(
  data: Data[],
  defined: (data: Data) => boolean,
  name: Name,
) =>
  data.reduce((acc, d, i, data) => {
    if (defined(d)) {
      acc.push({
        [name]: null,
      } as Data);
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
  }, [] as Data[]);

type IndexFromDataScale =
  | ScaleIdentity
  | ScaleTime<unknown, unknown>
  | ScaleContinuousNumeric<unknown, unknown>
  | ScaleBand<{}>
  | ScalePoint<{}>;
export const getIndexFromData = <
  Data extends {
    [key: string]: number;
  } = {},
  Scale extends IndexFromDataScale = IndexFromDataScale,
>(
  data: Data[],
  scale: Scale,
  key: string,
  value: number,
) => {
  // detect line chart
  if ('invert' in scale && typeof scale.invert === 'function') {
    const bisect = bisector((d: { [key: string]: number }) => d[key]).center;
    return bisect(data, value);
  }
  // detect bar chart
  else if ('step' in scale && typeof scale.step !== 'undefined') {
    const index = data.findIndex((d) => d[key] === value);
    return index >= 0 ? index : null;
  } else {
    // eslint-disable-next-line no-console
    console.warn('[d3-chart/utils/getIndexFromData] encountered incompatible scale type');
    return null;
  }
};

export const roundedPath = (
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
  tl = false,
  tr = false,
  bl = false,
  br = false,
) => {
  let result = 'M' + (x + r) + ',' + y;
  result += 'h' + (w - 2 * r);
  if (tr) {
    result += 'a' + r + ',' + r + ' 0 0 1 ' + r + ',' + r;
  } else {
    result += 'h' + r;
    result += 'v' + r;
  }
  result += 'v' + (h - 2 * r);
  if (br) {
    result += 'a' + r + ',' + r + ' 0 0 1 ' + -r + ',' + r;
  } else {
    result += 'v' + r;
    result += 'h' + -r;
  }
  result += 'h' + (2 * r - w);
  if (bl) {
    result += 'a' + r + ',' + r + ' 0 0 1 ' + -r + ',' + -r;
  } else {
    result += 'h' + -r;
    result += 'v' + -r;
  }
  result += 'v' + (2 * r - h);
  if (tl) {
    result += 'a' + r + ',' + r + ' 0 0 1 ' + r + ',' + -r;
  } else {
    result += 'v' + -r;
    result += 'h' + r;
  }
  result += 'z';
  return result;
};

export const getBandwidth = <Scale extends ScaleBand<{}>>(scale: Scale) => {
  if ('bandwidth' in scale) {
    return scale.bandwidth();
  }

  const range = scale.range();
  const domain = scale.domain();
  return Math.abs(range[range.length - 1] - range[0]) / domain.length;
};

export const memoize = <Func extends (...args: any[]) => any>(func: Func): Func => {
  const results: { [cacheKey: string]: any } = {};
  return ((...args: any[]) => {
    const argsKey = args.join(',');
    if (!results[argsKey]) {
      results[argsKey] = func(...args);
    }
    return results[argsKey];
  }) as Func;
};

export const measureText = memoize((text: string, fontSize?: number) => {
  if (!text) return 0;

  const span = document.createElement('span');
  if (fontSize) {
    span.style.fontSize = `${fontSize}px`;
  }
  for (const line of text.split('\n')) {
    span.append(document.createTextNode(line));
    span.append(document.createElement('br'));
  }
  span.style.display = 'inline-block';
  document.body.append(span);
  const textWidth = span.offsetWidth;
  span.remove();
  return textWidth;
});
