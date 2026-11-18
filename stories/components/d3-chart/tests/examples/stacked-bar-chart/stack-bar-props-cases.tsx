import { Plot, YAxis, XAxis, StackBar } from '@semcore/ui/d3-chart';
import { scaleLinear, scaleBand } from 'd3-scale';
import React from 'react';

type DataSet = 'positive' | 'negative' | 'edge';

interface StackBarPropsStoryProps {
  barColor1?: string;
  barColor2?: string;
  barColor3?: string;
  barRadius?: number;
  barHMin?: number;
  barTransparent?: boolean;
  maxBarSize?: number;
  duration?: number;
  invertAxis?: boolean;
  dataSet?: DataSet;
}

type Row = { time: string; stack1: number | null; stack2: number | null; stack3: number | null };

const dataSets: Record<DataSet, Row[]> = {
  positive: [
    { time: '0', stack1: 1, stack2: 4, stack3: 3 },
    { time: '1', stack1: 2, stack2: 3, stack3: 4 },
    { time: '2', stack1: 1, stack2: 4, stack3: 5 },
    { time: '3', stack1: 3, stack2: 2, stack3: 6 },
    { time: '4', stack1: 2, stack2: 4, stack3: 4 },
    { time: '5', stack1: 3, stack2: 4, stack3: 3 },
    { time: '6', stack1: 4, stack2: 1, stack3: 5 },
    { time: '7', stack1: 2, stack2: 5, stack3: 3 },
    { time: '8', stack1: 2, stack2: 6, stack3: 5 },
    { time: '9', stack1: 5, stack2: 5, stack3: 3 },
  ],
  negative: [
    { time: '0', stack1: -1, stack2: -4, stack3: -3 },
    { time: '1', stack1: -2, stack2: -3, stack3: -4 },
    { time: '2', stack1: -1, stack2: -4, stack3: -5 },
    { time: '3', stack1: -3, stack2: -2, stack3: -6 },
    { time: '4', stack1: -2, stack2: -4, stack3: -4 },
  ],
  // Tiny, zero, empty and negative segments next to regular ones.
  edge: [
    { time: '0', stack1: 0.01, stack2: 0.03, stack3: 0.01 },
    { time: '1', stack1: -0.01, stack2: -1, stack3: -0.01 },
    { time: '2', stack1: -1, stack2: -1, stack3: -1 },
    { time: '3', stack1: -0.01, stack2: -0.01, stack3: -0.01 },
    { time: '4', stack1: 3, stack2: 0, stack3: 5 },
    { time: '5', stack1: 0.01, stack2: 1, stack3: 0.01 },
    { time: '6', stack1: 2, stack2: null, stack3: 2 },
  ],
};

/** Lowest and highest running sums, the way the default d3 stack lays the segments out. */
const getValueDomain = (data: Row[]) =>
  data.reduce(
    ([min, max], row) => {
      let sum = 0;
      for (const value of [row.stack1, row.stack2, row.stack3]) {
        sum += value ?? 0;
        min = Math.min(min, sum);
        max = Math.max(max, sum);
      }
      return [min, max];
    },
    [0, 0],
  );

const Demo = (props: StackBarPropsStoryProps = {}) => {
  const {
    barColor1,
    barColor2,
    barColor3,
    barRadius,
    barHMin,
    barTransparent = false,
    maxBarSize,
    duration = 0,
    invertAxis = false,
    dataSet = 'positive',
  } = props;

  const MARGIN = 40;
  const width = 500;
  const height = 300;

  const data = dataSets[dataSet];
  const [min, max] = getValueDomain(data);

  const bandScale = scaleBand()
    .range(invertAxis ? [height - MARGIN, MARGIN] : [MARGIN, width - MARGIN])
    .domain(data.map((d) => d.time))
    .paddingInner(0.4)
    .paddingOuter(0.2);

  const valueScale = scaleLinear()
    .range(invertAxis ? [MARGIN, width - MARGIN] : [height - MARGIN, MARGIN])
    .domain(dataSet === 'positive' ? [0, 15] : [min, max]);

  if (dataSet !== 'positive') valueScale.nice();

  const bars = (['stack1', 'stack2', 'stack3'] as const).map((key, i) => {
    const barProps = {
      color: [barColor1, barColor2, barColor3][i],
      duration,
      r: barRadius,
      transparent: barTransparent,
    };

    return invertAxis
      ? <StackBar.HorizontalBar key={key} x={key} {...barProps} />
      : <StackBar.Bar key={key} y={key} hMin={barHMin} {...barProps} />;
  });

  return (
    <Plot
      data={data}
      scale={invertAxis ? [valueScale, bandScale] : [bandScale, valueScale]}
      width={width}
      height={height}
    >
      <YAxis>
        <YAxis.Ticks />
        {!invertAxis && <YAxis.Grid />}
      </YAxis>
      <XAxis>
        <XAxis.Ticks />
        {invertAxis && <XAxis.Grid />}
      </XAxis>
      {min < 0 && (invertAxis ? <YAxis position={0} /> : <XAxis position={0} />)}
      <StackBar {...(invertAxis ? { y: 'time' } : { x: 'time' })} maxBarSize={maxBarSize}>
        {bars}
      </StackBar>
    </Plot>
  );
};

export const defaultProps: StackBarPropsStoryProps = {
  duration: 0,
  barColor1: 'yellow',
  barColor2: 'blue',
  barColor3: 'violet',
  barRadius: undefined,
  barHMin: undefined,
  barTransparent: undefined,
  invertAxis: false,
  dataSet: 'positive',
};

Demo.defaultProps = defaultProps;

export default Demo;
