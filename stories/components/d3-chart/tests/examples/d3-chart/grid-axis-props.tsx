import { Plot, Bar, XAxis, YAxis } from '@semcore/ui/d3-chart';
import { scaleLinear, scaleBand } from 'd3-scale';
import React from 'react';

type BaseExampleProps = {
  // YAxis
  yPosition?: 'left' | 'right';
  yHide?: boolean;
  yTicks?: number[];
  yTickSuffix?: string;
  // YAxis.Ticks
  yTicksHide?: boolean;
  yTicksMultiline?: boolean;
  yTicksPrimaryText?: boolean;
  // YAxis.Grid
  yShowGrid?: boolean;
  // YAxis.Title
  yShowTitle?: boolean;
  yTitle?: string;
  yTitlePosition?: 'top' | 'right' | 'bottom' | 'left';
  yVerticalWritingMode?: boolean;

  // XAxis
  xPosition?: 'top' | 'bottom';
  xHide?: boolean;
  xCategories?: string[];
  // XAxis.Ticks
  xTicksHide?: boolean;
  xTicksMultiline?: boolean;
  xTicksPrimaryText?: boolean;
  // XAxis.Grid
  xShowGrid?: boolean;
  // XAxis.Title
  xShowTitle?: boolean;
  xTitle?: string;
  xTitlePosition?: 'top' | 'right' | 'bottom' | 'left';
  xVerticalWritingMode?: boolean;
};

const Demo = (props: BaseExampleProps) => {
  const MARGIN = 80;
  const width = 520;
  const height = 360;

  const yTicks = props.yTicks && props.yTicks.length > 0 ? props.yTicks : [0, 2.5, 5, 7.5, 10];
  const yMin = Math.min(...yTicks);
  const yMax = Math.max(...yTicks);

  const xCategories =
    props.xCategories && props.xCategories.length > 0
      ? props.xCategories
      : ['Cat Cat Cat 0', 'Cat Cat Cat 1', 'Cat Cat Cat 2', 'Cat Cat Cat 3', 'Cat Cat Cat 4'];

  const data = xCategories.map((category, i) => ({
    category,
    bar: yMin + (Math.sin(i / 2) * 0.5 + 0.5) * (yMax - yMin),
  }));

  const xScale = scaleBand()
    .range([MARGIN, width - MARGIN])
    .domain(xCategories)
    .paddingInner(0.4)
    .paddingOuter(0.2);

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([yMin, yMax]);

  const suffix = props.yTickSuffix ?? '';

  return (
    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
      <YAxis position={props.yPosition} hide={props.yHide}>
        <YAxis.Ticks
          ticks={yTicks}
          hide={props.yTicksHide}
          multiline={props.yTicksMultiline}
          primaryText={props.yTicksPrimaryText}
        >
          {suffix ? ({ value }) => ({ children: `${value}${suffix}` }) : undefined}
        </YAxis.Ticks>
        {props.yShowGrid && <YAxis.Grid />}
        {props.yShowTitle && (
          <YAxis.Title
            {...(props.yTitlePosition ? { position: props.yTitlePosition } : {})}
            verticalWritingMode={props.yVerticalWritingMode}
          >
            {props.yTitle}
          </YAxis.Title>
        )}
      </YAxis>
      <XAxis position={props.xPosition} hide={props.xHide}>
        <XAxis.Ticks
          ticks={xCategories}
          hide={props.xTicksHide}
          multiline={props.xTicksMultiline}
          primaryText={props.xTicksPrimaryText}
        />
        {props.xShowGrid && <XAxis.Grid />}
        {props.xShowTitle && (
          <XAxis.Title
            {...(props.xTitlePosition ? { position: props.xTitlePosition } : {})}
            verticalWritingMode={props.xVerticalWritingMode}
          >
            {props.xTitle}
          </XAxis.Title>
        )}
      </XAxis>
      <Bar x='category' y='bar' />
    </Plot>
  );
};

export const defaultProps: BaseExampleProps = {
  yPosition: 'left',
  yHide: false,
  yTicks: [0, 2.5, 5, 7.5, 10],
  yTickSuffix: '',
  yTicksHide: false,
  yTicksMultiline: false,
  yTicksPrimaryText: false,
  yShowGrid: true,
  yShowTitle: true,
  yTitle: 'YAxis title',
  yTitlePosition: 'top',
  yVerticalWritingMode: false,

  xPosition: 'bottom',
  xHide: false,
  xCategories: ['Cat Cat Cat 0', 'Cat Cat Cat 1', 'Cat Cat Cat 2', 'Cat Cat Cat 3', 'Cat Cat Cat 4'],
  xTicksHide: false,
  xTicksMultiline: false,
  xTicksPrimaryText: false,
  xShowGrid: false,
  xShowTitle: true,
  xTitle: 'XAxis title',
  xTitlePosition: 'right',
  xVerticalWritingMode: false,
};

export default Demo;
