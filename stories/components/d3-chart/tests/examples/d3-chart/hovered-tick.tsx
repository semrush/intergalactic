import { Bar, HoverLine, HoverRect, Line, Plot, XAxis, YAxis, minMax } from '@semcore/ui/d3-chart';
import { scaleBand, scaleLinear } from 'd3-scale';
import React from 'react';

type HoveredTickStoryProps = {
  /** `Line` renders HoverLine (notched line + tick pill), `Rect` renders HoverRect. */
  hoverType?: 'Line' | 'Rect';
  /** Hides the tick pill rendered under the hovered tick. */
  hideTickHover?: boolean;
  /** Hides the whole hover line / hover rect. */
  hideHoverLine?: boolean;
  width?: number;
  height?: number;
};

const MARGIN = 40;

// Long labels on the edges make the first/last tick pill clamping visible.
const data = [
  { category: 'First long label', value: 3 },
  { category: 'Second', value: 7 },
  { category: 'Third', value: 4 },
  { category: 'Fourth', value: 9 },
  { category: 'Last long label', value: 5 },
];

const linearData = data.map((item, index) => ({ ...item, x: index }));

const Demo = (props: HoveredTickStoryProps) => {
  const {
    hoverType = 'Line',
    hideTickHover = false,
    hideHoverLine = false,
    width = 500,
    height = 300,
  } = props;

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 10]);

  if (hoverType === 'Rect') {
    const xScale = scaleBand()
      .range([MARGIN, width - MARGIN])
      .domain(data.map((item) => item.category))
      .paddingInner(0.4)
      .paddingOuter(0.2);

    return (
      <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
        <YAxis>
          <YAxis.Ticks />
          <YAxis.Grid />
        </YAxis>
        <XAxis>
          <XAxis.Ticks />
        </XAxis>
        <HoverRect
          x='category'
          hideTickHover={hideTickHover}
          hideHoverLine={hideHoverLine}
        />
        <Bar x='category' y='value' />
      </Plot>
    );
  }

  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain(minMax(linearData, 'x'));

  return (
    <Plot data={linearData} scale={[xScale, yScale]} width={width} height={height}>
      <YAxis>
        <YAxis.Ticks />
        <YAxis.Grid />
      </YAxis>
      <XAxis>
        <XAxis.Ticks />
      </XAxis>
      <HoverLine
        x='x'
        hideTickHover={hideTickHover}
        hideHoverLine={hideHoverLine}
      />
      <Line x='x' y='value'>
        <Line.Dots display />
      </Line>
    </Plot>
  );
};

export const defaultProps: HoveredTickStoryProps = {
  hoverType: 'Line',
  hideTickHover: false,
  hideHoverLine: false,
  width: 500,
  height: 300,
};

Demo.defaultProps = defaultProps;

export default Demo;
