import EventEmitter from '@semcore/core/lib/utils/eventEmitter';
import { extent, bisector, Numeric } from 'd3-array';
import {
  scaleQuantize,
  ScaleIdentity,
  ScaleTime,
  ScaleContinuousNumeric,
  ScaleBand,
  ScalePoint,
  NumberValue,
  scaleBand,
  scaleSqrt,
} from 'd3-scale';
import React from 'react';

export const eventToPoint = (event: React.MouseEvent<HTMLElement>, svgRoot: SVGElement) => {
  const node = (event.currentTarget || event.target) as HTMLElement;
  const rect = svgRoot.getBoundingClientRect();
  return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
};

type InvertableScale =
  | ScaleIdentity
  | ScaleBand<{}>
  | ScaleTime<unknown, unknown>
  | ScaleContinuousNumeric<unknown, unknown>;
export const invert = <Scale extends InvertableScale = InvertableScale>(
  scale: Scale,
  value: number,
) => {
  if ('invert' in scale && scale.invert) return scale.invert(value);

  const range = scale.range() as [number, number];
  const domain = scale.domain();
  if ('paddingOuter' in scale) {
    range[0] += scale.paddingOuter() * scale.step();
    range[1] -= scale.paddingOuter() * scale.step();
  }

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
  Data extends { [key: string]: Numeric | null | undefined }[] = {
    [key: string]: Numeric | null | undefined;
  }[],
>(
  data: Data,
  key: Key,
): [min: Data[0][Key], max: Data[0][Key]] => {
  if (typeof key === 'string') {
    return extent(data, (d) => d[key]) as any;
  }
  return extent(data, key) as any;
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
  Key extends string,
  Data extends {
    [key in Key]: number;
  } = { [key in Key]: number },
  Scale extends IndexFromDataScale = IndexFromDataScale,
>(
  data: Data[],
  scale: Scale,
  key: Key,
  value: number,
) => {
  // detect line chart
  if ('invert' in scale && typeof scale.invert === 'function' && Array.isArray(data)) {
    const bisect = bisector((d: { [key: string]: number }) => d[key]).center;
    return bisect(data, value);
  }
  // detect bar chart
  else if ('step' in scale && typeof scale.step !== 'undefined' && Array.isArray(data)) {
    const index = data.findIndex((d) => d[key] === value);
    return index >= 0 ? index : null;
  }
  // detect cigarette chart
  else if ('invert' in scale && typeof scale.invert === 'function' && !Array.isArray(data)) {
    const keys = Object.keys(data);
    const domain = keys.map((key, index) => {
      return keys.slice(0, index).reduce((acc, item) => {
        if (data[item] !== interpolateValue) {
          acc = acc + data[item];
        }

        return acc;
      }, 0);
    });

    let key = null;

    const lastKeyIndex = keys.length - 1;

    if (value > domain[lastKeyIndex]) {
      key = keys[lastKeyIndex];
    } else {
      for (let i = 0; i < lastKeyIndex; i++) {
        if (i === 0 && value < domain[i]) {
          break;
        }

        if (value > domain[i] && value < domain[i + 1]) {
          key = keys[i];
          break;
        }
      }
    }

    return key;
  } else {
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
  let result = `M${x + r},${y}`;
  result += `h${w - 2 * r}`;
  if (tr) {
    result += `a${r},${r} 0 0 1 ${r},${r}`;
  } else {
    result += `h${r}`;
    result += `v${r}`;
  }
  result += `v${h - 2 * r}`;
  if (br) {
    result += `a${r},${r} 0 0 1 ${-r},${r}`;
  } else {
    result += `v${r}`;
    result += `h${-r}`;
  }
  result += `h${2 * r - w}`;
  if (bl) {
    result += `a${r},${r} 0 0 1 ${-r},${-r}`;
  } else {
    result += `h${-r}`;
    result += `v${-r}`;
  }
  result += `v${2 * r - h}`;
  if (tl) {
    result += `a${r},${r} 0 0 1 ${r},${-r}`;
  } else {
    result += `v${-r}`;
    result += `h${r}`;
  }
  result += 'z';
  return result;
};

export const scaleToBand = (scale: ScaleBand<{}>) => {
  if ('bandwidth' in scale) {
    return scale;
  }

  const band = scaleBand()
    .range((scale as any).range())
    .domain((scale as any).domain());

  return band;
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
  const textHeight = span.offsetHeight;
  span.remove();
  return Math.max(textWidth, textHeight);
});

let idCounter = 0;
export const uniqueId = (prefix = 'id-') => `${prefix}${idCounter++}`;

export const interpolateValue = Symbol('intergalactic-d3-chart-line-interpolate');

export const getChartDefaultColorName = (index: number) => {
  index++;
  if (index < 1) index = 1;
  if (index > 24) index %= 24;

  return `chart-palette-order-${index}`;
};

export const getBubbleChartValueScale = (data: any[], key: string) => {
  const z = scaleSqrt()
    .domain([0, Math.max(...data.map((el) => el[key]))])
    .range([5.5, 50.5]);

  return z;
};

export const getScatterPlotRadius = (valueKey?: string): number => {
  return valueKey !== undefined ? 12 : 5.5;
};

type BubbleChartDataItem = {
  value: number;
  x: number;
  y: number;
};

export const calculateBubbleDomain = (
  data: Array<BubbleChartDataItem>,
  key: 'x' | 'y',
  range: [number, number],
): [min: number, max: number] => {
  const miniestValue = data.reduce(
    (acc, item) => {
      if (item[key] - item.value < acc.min) {
        acc.min = item[key] - item.value;
        acc.value = item.value;
      }
      return acc;
    },
    { value: data[0].value, min: data[0][key] - data[0].value },
  ).value;
  const maxestValue = data.reduce(
    (acc, item) => {
      if (item.value + item[key] > acc.max) {
        acc.max = item.value + item.x;
        acc.value = item.value;
      }
      return acc;
    },
    { value: data[0].value, max: data[0].value + data[0][key] },
  ).value;

  let [min, max] = minMax(data, key);

  const pixelRatio = Math.abs(max - min) / Math.abs(range[0] - range[1]);
  const valueScale = getBubbleChartValueScale(data, 'value');
  const minValueShift = valueScale(miniestValue) * pixelRatio;
  const maxValueShift = valueScale(maxestValue) * pixelRatio;
  min -= minValueShift * 2;
  max += maxValueShift * 2;

  return [min, max];
};

interface PlotEventEmitterEmit {
  (event: 'setTooltipVisible', visible: boolean): void;
  (event: 'setTooltipPosition', x: number, y: number): void;
}
type Unsubscribe = () => void;
interface PlotEventEmitterSubscribe {
  (event: 'setTooltipVisible', callback: (visible: boolean) => void): Unsubscribe;
  (event: 'setTooltipPosition', callback: (x: number, y: number) => void): Unsubscribe;
}
export const PlotEventEmitter = EventEmitter as typeof EventEmitter<
  PlotEventEmitterEmit,
  PlotEventEmitterSubscribe
>;
