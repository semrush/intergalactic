import React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import * as sharedTests from '@semcore/testing-utils/shared-tests';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import { render, fireEvent, cleanup, userEvent } from '@semcore/testing-utils/testing-library';
const { shouldSupportClassName, shouldSupportRef } = sharedTests;

import { scaleLinear, scaleBand } from 'd3-scale';
import {
  Plot,
  YAxis,
  XAxis,
  Venn,
  Bar,
  StackBar,
  colors,
  Bubble,
  ScatterPlot,
  HoverLine,
  HoverRect,
  RadialTree,
  Line,
  Donut,
  HorizontalBar,
  CompactHorizontalBar,
  GroupBar,
  minMax,
  Area,
  StackedArea,
  ReferenceLine,
  ReferenceStripes,
  ReferenceBackground,
  Radar,
  ChartLegend,
  ChartLegendTable,
  makeDataHintsContainer,
  Chart,
  // @ts-ignore
} from '../src';
import { getIndexFromData } from '../src/utils';
import { PlotA11yView } from '../src/a11y/PlotA11yView';

import { curveCardinal } from 'd3-shape';
import { Flex, Box } from '@semcore/flex-box';
import Ellipsis from '@semcore/ellipsis';
import { Text } from '@semcore/typography';
import Button from '@semcore/button';
import LikeM from '@semcore/icon/Like/m';
import { I18nProvider } from '@semcore/core/lib/utils/enhances/WithI18n';
import Icon from '@semcore/icon/Video/m';
import { useColorResolver } from '@semcore/core/lib/utils/use/useColorResolver';

const xScale = scaleLinear().range([10, 100]).domain([0, 10]);

const yScale = scaleLinear().range([100, 10]).domain([0, 10]);

const data = [...Array(10).keys()].map((d, i) => ({
  x: i,
  y: Math.abs(Math.sin(Math.exp(i))) * i,
}));

const PlotTest = React.forwardRef((props, ref) => (
  <Plot ref={ref} data={data} scale={[xScale, yScale]} width={100} height={100} {...props} />
));

import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';

describe('d3-chart Dependency imports', () => {
  runDependencyCheckTests('d3-chart');
});

describe('Plot', () => {
  beforeEach(cleanup);
  shouldSupportClassName(PlotTest);
  shouldSupportRef(PlotTest);

  test.concurrent('Should support render null', () => {
    const { queryByText } = render(<Plot>Test</Plot>);
    expect(queryByText(/Test/)).toBeNull();
  });
});

describe('YAxis', () => {
  beforeEach(cleanup);

  shouldSupportClassName(YAxis, PlotTest);
  shouldSupportRef(YAxis, PlotTest);

  test.concurrent(
    'Should support call children function for Grid how many ticks are passed',
    ({ expect }) => {
      expect.assertions(2);

      render(
        <Plot data={data} scale={[xScale, yScale]} width={100} height={100}>
          <YAxis ticks={[0, 1]}>
            <YAxis.Grid>
              {(props: any) => {
                expect(props).toBeTruthy();
                return props;
              }}
            </YAxis.Grid>
          </YAxis>
        </Plot>,
      );
    },
  );

  test.concurrent(
    'Should support call children function for Ticks how many ticks are passed',
    ({ expect }) => {
      expect.assertions(2);

      render(
        <Plot data={data} scale={[xScale, yScale]} width={100} height={100}>
          <YAxis ticks={[0, 1]}>
            <YAxis.Ticks>
              {(props: any) => {
                expect(props).toBeTruthy();
                return props;
              }}
            </YAxis.Ticks>
          </YAxis>
        </Plot>,
      );
    },
  );

  test.concurrent('should support set data-ui-name for Line.Ticks', () => {
    const { queryByTestId } = render(
      <Plot data={data} scale={[xScale, yScale]} width={100} height={100}>
        <YAxis ticks={[0]}>
          <YAxis.Ticks data-testid='test' />
        </YAxis>
      </Plot>,
    );
    expect((queryByTestId('test')!.attributes as any)['data-ui-name']).toBeTruthy();
    expect((queryByTestId('test')!.attributes as any)['data-ui-name'].value).toBe('Axis.Ticks');
  });

  test.sequential('should support change tag YAxis.Ticks', () => {
    const { queryByTestId } = render(
      <Plot data={data} scale={[xScale, yScale]} width={100} height={100}>
        <YAxis ticks={[0]}>
          <YAxis.Ticks data-testid='test' tag='foreignObject' />
        </YAxis>
      </Plot>,
    );
    expect(queryByTestId('test')!.tagName).toBe('foreignObject');
  });
});

describe('XAxis', () => {
  beforeEach(cleanup);

  shouldSupportClassName(XAxis, PlotTest);
  shouldSupportRef(XAxis, PlotTest);

  test.concurrent('should support hover for custom XAxis.Ticks', () => {
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => (cb as any)());
    // const bisect = bisector((d) => d.x).center;
    class EventEmitter {
      emit() {}
      subscribe() {}
    }

    const eventEmitter = new EventEmitter();
    eventEmitter.emit = vi.fn();
    const { getAllByTestId } = render(
      <Plot
        data={data}
        scale={[xScale, yScale]}
        width={100}
        height={130}
        eventEmitter={eventEmitter}
      >
        <XAxis>
          <XAxis.Ticks tag='foreignObject' width='12' height='12'>
            {() => ({
              children: (
                <svg viewBox='0 0 12 12' width='12' height='12' data-testid='tick'>
                  <path
                    xmlns='http://www.w3.org/2000/svg'
                    d='M9,0 L3,0 C1.344,0 0,1.343 0,3 L0,6 C0,7.657 1.344,9 3,9 L3,11.323 C3,11.925 3.729,12.227 4.154,11.801 L6.955,9 L9,9 C10.656,9 12,7.657 12,6 L12,3 C12,1.343 10.656,0 9,0'
                  />
                </svg>
              ),
            })}
          </XAxis.Ticks>
        </XAxis>
      </Plot>,
    );

    fireEvent.mouseMove(getAllByTestId('tick')[9]);
    expect(eventEmitter.emit).toHaveBeenCalledTimes(2); //onMouseMoveRoot, onMouseLeaveChart
    (window.requestAnimationFrame as any).mockRestore();
  });

  test.concurrent(
    'should support to render custom components as Axis tick value',
    async ({ task }) => {
      const size = 16;
      const TickFormatter = (props: any): any => {
        return (
          <foreignObject
            transform={`translate(${props.x - size / 2},${props.y + 8})`}
            width={`${size}px`}
            height={`${size}px`}
          >
            {props.index === 3 && props.value}
            {props.value === 0 && 'INIT'}
            {props.index !== 3 && props.value !== 0 && (props.value === 10 ? 'V' : <Icon />)}
          </foreignObject>
        );
      };

      const component = (
        <Plot data={data} scale={[xScale, yScale]} width={120} height={130}>
          <XAxis>
            <XAxis.Ticks ticks={xScale.ticks(5)} childrenPosition={'below'}>
              {({ value, x, y, index }: any) => ({
                children: <TickFormatter value={value} x={x} y={y} index={index} />,
              })}
            </XAxis.Ticks>
          </XAxis>
        </Plot>
      );

      await expect(await snapshot(component)).toMatchImageSnapshot(task);
    },
  );
});

describe('utils', () => {
  test.concurrent('should support getIndexFromData for Line, Bar chart', () => {
    const data = [
      { x: 1, y: 'test' },
      { x: 2, y: 'describe' },
    ];
    const yScale = scaleBand()
      .range([100, 10])
      .domain(data.map((d) => d.y));

    expect(getIndexFromData(data, xScale, 'x', 2)).toBe(1);
    expect((getIndexFromData as any)(data, yScale, 'y', 'test')).toBe(0);
  });
});

describe('Area', () => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;
  const data = [
    { time: 0, stack1: 1, stack2: 4, stack3: 3 },
    { time: 1, stack1: 2, stack2: 3, stack3: 4 },
    { time: 2, stack1: 1, stack2: 4, stack3: 5 },
    { time: 3, stack1: 3, stack2: 2, stack3: 6 },
    { time: 4, stack1: 2, stack2: 4, stack3: 4 },
    { time: 5, stack1: 3, stack2: 4, stack3: 3 },
    { time: 6, stack1: 4, stack2: 1, stack3: 5 },
    { time: 7, stack1: 2, stack2: 5, stack3: 3 },
    { time: 8, stack1: 2, stack2: 6, stack3: 5 },
    { time: 9, stack1: 5, stack2: 5, stack3: 3 },
  ];

  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain(minMax(data, 'time'));

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 15]);

  test.concurrent('should render curve Area chart correctly', async ({ task }) => {
    const component = (
      <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
        <YAxis ticks={yScale.ticks()}>
          <YAxis.Ticks />
          <YAxis.Grid />
        </YAxis>
        <XAxis>
          <XAxis.Ticks />
        </XAxis>
        <Area x='time' y='stack1' curve={curveCardinal} duration={0}>
          <Area.Dots display />
        </Area>
      </Plot>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('should support dots display function', async ({ task }) => {
    const component = (
      <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
        <YAxis ticks={yScale.ticks()}>
          <YAxis.Ticks />
          <YAxis.Grid />
        </YAxis>
        <XAxis>
          <XAxis.Ticks />
        </XAxis>
        <Area x='time' y='stack1' curve={curveCardinal} duration={0}>
          <Area.Dots display={(i: number) => i % 2 === 0} />
        </Area>
      </Plot>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('should render Stacked Area chart without data correctly', async ({ task }) => {
    const data = [
      { time: 0, stack1: 1, stack2: 4, stack3: 3 },
      { time: 1, stack1: 2, stack2: 3, stack3: 4 },
      { time: 2, stack1: 1, stack2: 4, stack3: 5 },
      { time: 3, stack1: null, stack2: null, stack3: null },
      { time: 4, stack1: null, stack2: null, stack3: null },
      { time: 5, stack1: 3, stack2: 4, stack3: 3 },
      { time: 6, stack1: null, stack2: null, stack3: null },
      { time: 7, stack1: 2, stack2: 5, stack3: 3 },
      { time: 8, stack1: 2, stack2: 6, stack3: 5 },
      { time: 9, stack1: 5, stack2: 5, stack3: 3 },
    ];

    const component = (
      <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
        <YAxis>
          <YAxis.Ticks />
          <YAxis.Grid />
        </YAxis>
        <XAxis>
          <XAxis.Ticks />
        </XAxis>
        <StackedArea x='time'>
          <StackedArea.Area y='stack1' duration={0}>
            <StackedArea.Area.Null />
            <StackedArea.Area.Dots />
          </StackedArea.Area>
          <StackedArea.Area y='stack2' color='#3AB011' duration={0}>
            <StackedArea.Area.Null />
            <StackedArea.Area.Dots />
          </StackedArea.Area>
          <StackedArea.Area y='stack3' color='#FF8E29' duration={0}>
            <StackedArea.Area.Null />
            <StackedArea.Area.Dots />
          </StackedArea.Area>
        </StackedArea>
      </Plot>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent(
    'should render curve Stacked Area chart with dots correctly',
    async ({ task }) => {
      const component = (
        <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
          <YAxis>
            <YAxis.Ticks />
            <YAxis.Grid />
          </YAxis>
          <XAxis>
            <XAxis.Ticks />
          </XAxis>
          <StackedArea x='time'>
            <StackedArea.Area y='stack1' curve={curveCardinal} duration={0}>
              <StackedArea.Area.Dots display />
            </StackedArea.Area>
            <StackedArea.Area y='stack2' color='#3AB011' curve={curveCardinal} duration={0}>
              <StackedArea.Area.Dots display />
            </StackedArea.Area>
            <StackedArea.Area y='stack3' color='#FFA318' curve={curveCardinal} duration={0}>
              <StackedArea.Area.Dots display />
            </StackedArea.Area>
          </StackedArea>
        </Plot>
      );

      await expect(await snapshot(component)).toMatchImageSnapshot(task);
    },
  );

  test.concurrent('should render area-without-data', async ({ task }) => {
    const data = [
      { x: 0, y: 1 },
      { x: 1, y: 4 },
      { x: 2, y: null },
      { x: 3, y: null },
      { x: 4, y: 1 },
      { x: 5, y: null },
    ];

    const Component: React.FC = () => {
      const MARGIN = 40;
      const width = 500;
      const height = 300;

      const xScale = scaleLinear()
        .range([MARGIN, width - MARGIN])
        .domain(minMax(data, 'x'));

      const yScale = scaleLinear()
        .range([height - MARGIN, MARGIN])
        .domain([0, 10]);

      return (
        <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
          <YAxis>
            <YAxis.Ticks />
            <YAxis.Grid />
          </YAxis>
          <XAxis>
            <XAxis.Ticks />
          </XAxis>
          <Area x='x' y='y' duration={0}>
            <Area.Null />
            <Area.Dots />
          </Area>
        </Plot>
      );
    };

    await expect(await snapshot(<Component />)).toMatchImageSnapshot(task);
  });

  test.concurrent('should render area', async ({ task }) => {
    function formatDate(value: any, options: any) {
      return new Intl.DateTimeFormat('en', options).format(value);
    }

    const date = new Date('05-16-2022');
    const data = Array(10)
      .fill({})
      .map((d, i) => {
        return {
          time: new Date(date.setDate(date.getDate() + 5)),
          line: Math.abs(Math.sin(Math.exp(i))) * 10,
        };
      });

    const Component: React.FC = () => {
      const MARGIN = 40;
      const width = 500;
      const height = 300;

      const xScale = scaleLinear()
        .range([MARGIN, width - MARGIN])
        .domain(minMax(data, 'time'));

      const yScale = scaleLinear()
        .range([height - MARGIN, MARGIN])
        .domain([0, 10]);

      return (
        <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
          <YAxis>
            <YAxis.Ticks />
            <YAxis.Grid />
          </YAxis>
          <XAxis>
            <XAxis.Ticks ticks={data.map((d) => +d.time)}>
              {({ value }: any) => ({
                children: formatDate(value, {
                  month: 'short',
                  day: 'numeric',
                }),
              })}
            </XAxis.Ticks>
          </XAxis>
          <Area x='time' y='line' curve={curveCardinal} duration={0}>
            <Area.Dots display />
          </Area>
        </Plot>
      );
    };

    await expect(await snapshot(<Component />)).toMatchImageSnapshot(task);
  });

  test.concurrent('should support custom line in area chart', async ({ task }) => {
    const data = Array(10)
      .fill({})
      .map((d, i) => {
        return {
          x: i,
          y: i % 2 ? i / 2 : i,
        };
      });
    const customLineStyles = { strokeWidth: 1, stroke: 'orange' };

    const Component: React.FC = () => {
      const MARGIN = 40;
      const width = 500;
      const height = 300;

      const xScale = scaleLinear()
        .range([MARGIN, width - MARGIN])
        .domain(minMax(data, 'x'));

      const yScale = scaleLinear()
        .range([height - MARGIN, MARGIN])
        .domain([0, 10]);

      return (
        <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
          <YAxis>
            <YAxis.Ticks />
          </YAxis>
          <XAxis>
            <XAxis.Ticks />
          </XAxis>
          <Area x='x' y='y' curve={curveCardinal} duration={0}>
            <Area.Line style={customLineStyles} />
          </Area>
        </Plot>
      );
    };

    await expect(await snapshot(<Component />)).toMatchImageSnapshot(task);
  });

  test.concurrent('should render stacked-area-without-data', async ({ task }) => {
    const data = [
      { time: 0, stack1: 1, stack2: 4, stack3: 3 },
      { time: 1, stack1: 2, stack2: 3, stack3: 4 },
      { time: 2, stack1: 1, stack2: 4, stack3: 5 },
      { time: 3, stack1: null, stack2: null, stack3: null },
      { time: 4, stack1: null, stack2: null, stack3: null },
      { time: 5, stack1: 3, stack2: 4, stack3: 3 },
      { time: 6, stack1: null, stack2: null, stack3: null },
      { time: 7, stack1: 2, stack2: 5, stack3: 3 },
      { time: 8, stack1: 2, stack2: 6, stack3: 5 },
      { time: 9, stack1: 5, stack2: 5, stack3: 3 },
    ];

    const Component: React.FC = () => {
      const MARGIN = 40;
      const width = 500;
      const height = 300;

      const xScale = scaleLinear()
        .range([MARGIN, width - MARGIN])
        .domain(minMax(data, 'time'));

      const yScale = scaleLinear()
        .range([height - MARGIN, MARGIN])
        .domain([0, 15]);

      return (
        <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
          <YAxis>
            <YAxis.Ticks />
            <YAxis.Grid />
          </YAxis>
          <XAxis>
            <XAxis.Ticks ticks={data.map((d) => +d.time)} />
          </XAxis>
          <StackedArea x='time'>
            <StackedArea.Area y='stack1'>
              <StackedArea.Area.Null />
              <StackedArea.Area.Dots />
            </StackedArea.Area>
            <StackedArea.Area y='stack2' fill='#59DDAA50' color='#59DDAA'>
              <StackedArea.Area.Null />
              <StackedArea.Area.Dots />
            </StackedArea.Area>
            <StackedArea.Area y='stack3' fill='#FF622D50' color='#FF622D'>
              <StackedArea.Area.Null />
              <StackedArea.Area.Dots />
            </StackedArea.Area>
          </StackedArea>
        </Plot>
      );
    };

    await expect(await snapshot(<Component />)).toMatchImageSnapshot(task);
  });
});

describe('Venn', () => {
  shouldSupportRef(Venn, PlotTest);

  test.concurrent('should render venn-custom-intersection', async ({ task }) => {
    const data = {
      G: 200,
      F: 200,
      C: 200,
      'G/F': 100,
      'G/C': 100,
      'F/C': 100,
      'G/F/C': 100,
    };

    const Component: React.FC = () => {
      return (
        <Plot height={300} width={400} data={data}>
          <Venn>
            <Venn.Circle dataKey='G' />
            <Venn.Circle dataKey='F' color={colors['blue-03']} />
            <Venn.Circle dataKey='C' color={colors['orange-04']} />
            <Venn.Intersection dataKey='G/F' />
            <Venn.Intersection dataKey='G/C' />
            <Venn.Intersection dataKey='F/C' />
            <Venn.Intersection
              dataKey='G/F/C'
              style={{
                stroke: colors['violet-04'],
                fill: colors['violet-04'],
                fillOpacity: '0.3',
              }}
            />
          </Venn>
        </Plot>
      );
    };

    await expect(await snapshot(<Component />)).toMatchImageSnapshot(task);
  });

  test.concurrent('should render venn-orientation', async ({ task }) => {
    const orders = [
      (val1: any, val2: any) => val2.radius - val1.radius,
      (val1: any, val2: any) => val1.radius - val2.radius,
    ];

    const orientations = [Math.PI / 2, Math.PI];

    const data = {
      F: 5,
      S: 7,
      'F/S': 3,
    };

    const Component: React.FC = () => {
      const [orientation, setOrientation] = React.useState(0);
      const [order, setOrder] = React.useState(0);

      return (
        <Flex alignItems='flex-start' direction='column'>
          <Plot height={300} width={400} data={data}>
            <Venn orientation={orientations[orientation]} orientationOrder={orders[order]}>
              <Venn.Circle dataKey='F' />
              <Venn.Circle dataKey='S' color={colors['blue-03']} />
              <Venn.Intersection dataKey='F/S' />
            </Venn>
          </Plot>
          <Flex direction='row'>
            <Button onClick={() => setOrientation(Number(!orientation))} mr={2}>
              Change orientation
            </Button>
            <Button onClick={() => setOrder(Number(!order))}>Change order</Button>
          </Flex>
        </Flex>
      );
    };

    await expect(await snapshot(<Component />)).toMatchImageSnapshot(task);
  });

  test.skip('Should render venn [Too unstable]', async ({ task }) => {
    const data = {
      G: 200,
      F: 200,
      C: 500,
      U: 2,
      O: 0,
      'G/F': 100,
      'G/C': 100,
      'F/C': 100,
      'G/F/C': 100,
    };

    const Component: React.FC = () => {
      return (
        <Plot height={300} width={400} data={data}>
          <Venn>
            <Venn.Circle dataKey='G' name='Good' />
            <Venn.Circle dataKey='F' name='Fast' color={colors['blue-03']} />
            <Venn.Circle dataKey='C' name='Cheap' color={colors['orange-04']} />
            <Venn.Circle dataKey='U' name='Unknown' color={colors['pink-03']} />
            <Venn.Circle dataKey='O' name='Other' color={colors['red-03']} />
            <Venn.Intersection dataKey='G/F' name='Good & Fast' />
            <Venn.Intersection dataKey='G/C' name='Good & Cheap' />
            <Venn.Intersection dataKey='F/C' name='Fast & Cheap' />
            <Venn.Intersection dataKey='G/F/C' name='Good & Fast & Cheap' />
          </Venn>
        </Plot>
      );
    };

    await expect(await snapshot(<Component />)).toMatchImageSnapshot(task);
  });

  //unstable test
  test.skip('should render venn width defaults min radius for item', async ({ task }) => {
    const data = {
      G: 2000,
      F: 2000,
      C: 5000,
      U: 2,
      'G/F': 1000,
      'G/C': 1000,
      'F/C': 1000,
      'G/F/C': 1000,
    };

    const Component: React.FC = () => {
      return (
        <Plot height={300} width={400} data={data}>
          <Venn>
            <Venn.Circle dataKey='G' name='Good' />
            <Venn.Circle dataKey='F' name='Fast' color={colors['blue-03']} />
            <Venn.Circle dataKey='C' name='Cheap' color={colors['orange-04']} />
            <Venn.Circle dataKey='U' name='Unknown' color={colors['pink-03']} />
            <Venn.Intersection dataKey='G/F' name='Good & Fast' />
            <Venn.Intersection dataKey='G/C' name='Good & Cheap' />
            <Venn.Intersection dataKey='F/C' name='Fast & Cheap' />
            <Venn.Intersection dataKey='G/F/C' name='Good & Fast & Cheap' />
          </Venn>
        </Plot>
      );
    };

    await expect(await snapshot(<Component />)).toMatchImageSnapshot(task);
  });
});

describe('Bar', () => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;
  const data = [
    { time: 0, stack1: 1, stack2: 4, stack3: 3 },
    { time: 1, stack1: 2, stack2: 3, stack3: 4 },
    { time: 2, stack1: 1, stack2: 4, stack3: 5 },
    { time: 3, stack1: 3, stack2: 2, stack3: 6 },
    { time: 4, stack1: 2, stack2: 4, stack3: 4 },
    { time: 5, stack1: 3, stack2: 4, stack3: 3 },
    { time: 6, stack1: 4, stack2: 1, stack3: 5 },
    { time: 7, stack1: 2, stack2: 5, stack3: 3 },
    { time: 8, stack1: 2, stack2: 6, stack3: 5 },
    { time: 9, stack1: 5, stack2: 5, stack3: 3 },
  ];

  const xScale = scaleBand<number>()
    .range([MARGIN, width - MARGIN])
    .domain(data.map((d) => d.time))
    .paddingInner(0.4)
    .paddingOuter(0.2);

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 15]);

  test.concurrent('should render Bar chart correctly', async ({ task }) => {
    const component = (
      <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
        <YAxis>
          <YAxis.Ticks />
          <YAxis.Grid />
        </YAxis>
        <XAxis>
          <XAxis.Ticks />
        </XAxis>
        <Bar x='time' y='stack1' duration={0} />
      </Plot>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('should render Bar with radius = height if radius > height', async ({ task }) => {
    const component = (
      <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
        <YAxis>
          <YAxis.Ticks />
          <YAxis.Grid />
        </YAxis>
        <XAxis>
          <XAxis.Ticks />
        </XAxis>
        <Bar x='time' y='stack1' duration={0} r={15} />
      </Plot>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent(
    'should render the minimum height for bars with a height close to zero',
    async ({ task }) => {
      const yScale = scaleLinear()
        .range([height - MARGIN, MARGIN])
        .domain([-5, 5]);

      const data = [
        { time: 0, stack1: 0 },
        { time: 1, stack1: 0.05 },
        { time: 2, stack1: 0.5 },
        { time: 3, stack1: 1 },
        { time: 4, stack1: -4 },
        { time: 5, stack1: -0.05 },
        { time: 6, stack1: -0 },
        { time: 7, stack1: -0.5 },
      ];

      const component = (
        <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
          <YAxis>
            <YAxis.Ticks />
            <YAxis.Grid />
          </YAxis>
          <XAxis>
            <XAxis.Ticks />
          </XAxis>
          <Bar x='time' y='stack1' duration={0} />
        </Plot>
      );

      await expect(await snapshot(component)).toMatchImageSnapshot(task);
    },
  );

  test.concurrent('should render Bar chart without data correctly', async ({ task }) => {
    const data = [
      { time: 0, stack1: 0 },
      { time: 1, stack1: null },
      { time: 2, stack1: 10 },
      { time: 3, stack1: null },
      { time: 4, stack1: -0 },
    ];

    const component = (
      <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
        <YAxis>
          <YAxis.Ticks />
          <YAxis.Grid />
        </YAxis>
        <XAxis>
          <XAxis.Ticks />
        </XAxis>
        <Bar x='time' y='stack1' duration={0} />
      </Plot>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('should render Bar chart with maxBarSize correctly', async ({ task }) => {
    const component = (
      <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
        <YAxis>
          <YAxis.Ticks />
          <YAxis.Grid />
        </YAxis>
        <XAxis>
          <XAxis.Ticks />
        </XAxis>
        <Bar x='time' y='stack1' duration={0} maxBarSize={6} />
      </Plot>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('should render StackBar chart correctly', async ({ task }) => {
    const component = (
      <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
        <YAxis>
          <YAxis.Ticks />
          <YAxis.Grid />
        </YAxis>
        <XAxis>
          <XAxis.Ticks />
        </XAxis>
        <StackBar x='time'>
          <StackBar.Bar y='stack1' duration={0} />
          <StackBar.Bar y='stack2' color={colors['blue-02']} duration={0} />
        </StackBar>
      </Plot>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('should render StackBar chart correctly with zero values', async ({ task }) => {
    const data = [
      { time: 0, stack1: 1, stack2: 4, stack3: 3 },
      { time: 1, stack1: 2, stack2: 0, stack3: 4 },
      { time: 2, stack1: 1, stack2: 4, stack3: 0 },
      { time: 3, stack1: 3, stack2: 2, stack3: 6 },
      { time: 4, stack1: 0, stack2: 0, stack3: 4 },
      { time: 5, stack1: 3, stack2: 4, stack3: 3 },
      { time: 6, stack1: 4, stack2: 1, stack3: 5 },
      { time: 7, stack1: 0, stack2: 0, stack3: 0 },
      { time: 8, stack1: 2, stack2: 6, stack3: 5 },
      { time: 9, stack1: 5, stack2: 0, stack3: 3 },
    ];

    const component = (
      <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
        <YAxis>
          <YAxis.Ticks />
          <YAxis.Grid />
        </YAxis>
        <XAxis>
          <XAxis.Ticks />
        </XAxis>
        <StackBar x='time'>
          <StackBar.Bar y='stack1' duration={0} />
          <StackBar.Bar y='stack2' color={colors['blue-02']} duration={0} />
          <StackBar.Bar y='stack3' color={colors['green-02']} duration={0} hMin={5} />
        </StackBar>
      </Plot>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('should render StackBar chart correctly with custom hMin', async ({ task }) => {
    const yScale = scaleLinear()
      .range([height - MARGIN, MARGIN])
      .domain([-4, 4]);

    const data = [
      { time: 0, stack1: 0.01, stack2: 4, stack3: 3 },
      { time: 1, stack1: 2, stack2: 0.01, stack3: 4 },
      { time: 2, stack1: 1.5, stack2: 0.01, stack3: 1.3 },
      { time: 3, stack1: -3, stack2: 0, stack3: -0.02 },
      { time: 4, stack1: 0, stack2: 0.03, stack3: 0.01 },
      { time: 5, stack1: -0.01, stack2: -0.02, stack3: -0.03 },
      { time: 6, stack1: 3, stack2: 1, stack3: 4 },
      { time: 7, stack1: 0, stack2: 0, stack3: 0 },
      { time: 8, stack1: 0.03, stack2: 0.03, stack3: 0.03 },
      { time: 9, stack1: -3, stack2: -0.01, stack3: -4 },
    ];

    const component = (
      <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
        <YAxis>
          <YAxis.Ticks />
          <YAxis.Grid />
        </YAxis>
        <XAxis>
          <XAxis.Ticks />
        </XAxis>
        <StackBar x='time'>
          <StackBar.Bar y='stack1' color={colors['red-02']} hMin={5} duration={0} />
          <StackBar.Bar y='stack2' color={colors['blue-02']} hMin={5} duration={0} />
          <StackBar.Bar y='stack3' color={colors['green-02']} hMin={5} duration={0} />
        </StackBar>
      </Plot>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('should render StackBar chart correctly with default hMin', async ({ task }) => {
    const yScale = scaleLinear()
      .range([height - MARGIN, MARGIN])
      .domain([-10, 10]);

    const data = [
      { time: 0, stack1: 0.01, stack2: 4, stack3: 3 },
      { time: 1, stack1: 2, stack2: 0.01, stack3: 4 },
      { time: 2, stack1: 1, stack2: 4, stack3: 0.01 },
      { time: 3, stack1: -3, stack2: -2, stack3: -0.02 },
      { time: 4, stack1: 0, stack2: 0.03, stack3: 0.01 },
      { time: 5, stack1: -0.01, stack2: -0.02, stack3: -0.03 },
      { time: 6, stack1: 3, stack2: 1, stack3: 4 },
      { time: 7, stack1: 0, stack2: 0, stack3: 0 },
      { time: 8, stack1: 0.03, stack2: 0.03, stack3: 0.03 },
      { time: 9, stack1: -3, stack2: -0.01, stack3: -4 },
    ];

    const component = (
      <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
        <YAxis>
          <YAxis.Ticks />
          <YAxis.Grid />
        </YAxis>
        <XAxis>
          <XAxis.Ticks />
        </XAxis>
        <StackBar x='time'>
          <StackBar.Bar y='stack1' color={colors['red-02']} duration={0} />
          <StackBar.Bar y='stack2' color={colors['blue-02']} duration={0} />
          <StackBar.Bar y='stack3' color={colors['green-02']} duration={0} />
        </StackBar>
      </Plot>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('should not cut content on right with left margin', async ({ task }) => {
    const width = 500;
    const height = 300;

    const data = Array(10)
      .fill({})
      .map((d, i) => ({
        x: (i / 10) * 10,
        y: ((10 - i) / 10) * 10,
        value: i,
      }));

    const MARGIN = {
      top: 40,
      left: 40,
      bottom: 0,
      right: 0,
    };

    const xScale = scaleLinear()
      .range([MARGIN.left, width - MARGIN.right])
      .domain([0, 10]);

    const yScale = scaleLinear()
      .range([height - MARGIN.bottom, MARGIN.top])
      .domain([0, 10]);

    const component = (
      <>
        <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
          <YAxis>
            <YAxis.Grid />
          </YAxis>
          <Bubble x='x' y='y' value='value' />
        </Plot>
        <br />
        <br />
        <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
          <YAxis>
            <YAxis.Grid />
          </YAxis>
          <ScatterPlot x='x' y='y' value='value' r={30} />
        </Plot>
      </>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('should render bar-group', async ({ task }) => {
    const data = Array(5)
      .fill({})
      .map((d, i) => ({
        category: `Category ${i}`,
        bar1: Math.abs(Math.sin(Math.exp(i))) * 10,
        bar2: Math.abs(Math.sin(Math.exp(i))) * 10,
      }));

    const Component: React.FC = () => {
      const MARGIN = 40;
      const width = 500;
      const height = 300;

      const xScale = scaleBand()
        .range([MARGIN, width - MARGIN])
        .domain(data.map((d) => d.category))
        .paddingInner(0.4)
        .paddingOuter(0.2);

      const yScale = scaleLinear()
        .range([height - MARGIN, MARGIN])
        .domain([0, 10]);

      return (
        <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
          <YAxis>
            <YAxis.Ticks />
            <YAxis.Grid />
          </YAxis>
          <XAxis>
            <XAxis.Ticks />
          </XAxis>
          <GroupBar x='category'>
            <GroupBar.Bar y='bar1' duration={0} />
            <GroupBar.Bar y='bar2' color={colors['green-02']} duration={0} />
          </GroupBar>
        </Plot>
      );
    };

    await expect(await snapshot(<Component />)).toMatchImageSnapshot(task);
  });

  test.concurrent('should render bar-negative', async ({ task }) => {
    const data = Array(5)
      .fill({})
      .map((d, i) => ({
        category: `Category ${i}`,
        bar1: Math.abs(Math.sin(Math.exp(i))) * 10,
        bar2: -Math.abs(Math.sin(Math.exp(i))) * 10,
      }));

    const Component: React.FC = () => {
      const MARGIN = 40;
      const width = 500;
      const height = 300;

      const xScale = scaleBand()
        .range([MARGIN, width - MARGIN])
        .domain(data.map((d) => d.category))
        .paddingInner(0.4)
        .paddingOuter(0.2);

      const yScale = scaleLinear()
        .range([height - MARGIN, MARGIN])
        .domain([-10, 10]);

      return (
        <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
          <YAxis>
            <YAxis.Ticks />
            <YAxis.Grid />
          </YAxis>
          <XAxis>
            <XAxis.Ticks />
          </XAxis>
          <Bar x='category' y='bar1' color={colors['green-02']} duration={0} />
          <Bar x='category' y='bar2' color={colors['orange-04']} duration={0} />
          <XAxis position={0} />
        </Plot>
      );
    };

    await expect(await snapshot(<Component />)).toMatchImageSnapshot(task);
  });

  test.concurrent('should render bar-trend', async ({ task }) => {
    const data = Array(10)
      .fill({})
      .map((d, i) => ({
        category: i,
        bar: Math.abs(Math.sin(Math.exp(i))) * i,
      }));

    const Component: React.FC = () => {
      const MARGIN = 40;
      const width = 500;
      const height = 300;

      const resolveColor = useColorResolver();

      const xScale = scaleBand<number>()
        .range([MARGIN, width - MARGIN])
        .domain(data.map((d) => d.category))
        .paddingInner(0.4)
        .paddingOuter(0.2);

      const yScale = scaleLinear()
        .range([height - MARGIN, MARGIN])
        .domain(minMax(data, 'bar'));

      return (
        <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
          <YAxis>
            <YAxis.Ticks />
            <YAxis.Grid />
          </YAxis>
          <XAxis>
            <XAxis.Ticks />
          </XAxis>
          <HoverLine x='category' />
          <HoverRect x='category' />
          <Bar x='category' y='bar' duration={0} />
          <Line
            x='category'
            y='bar'
            color={resolveColor('text-placeholder')}
            style={{ strokeWidth: 3, strokeDasharray: 5 }}
            duration={0}
          >
            <Line.Dots display />
          </Line>
        </Plot>
      );
    };

    await expect(await snapshot(<Component />)).toMatchImageSnapshot(task);
  });

  test.concurrent('should render bar', async ({ task }) => {
    const data = Array(5)
      .fill({})
      .map((d, i) => ({
        category: `Category ${i}`,
        bar: Math.abs(Math.sin(Math.exp(i))) * 10,
      }));

    const Component: React.FC = () => {
      const MARGIN = 40;
      const width = 500;
      const height = 300;

      const xScale = scaleBand()
        .range([MARGIN, width - MARGIN])
        .domain(data.map((d) => d.category))
        .paddingInner(0.4)
        .paddingOuter(0.2);

      const yScale = scaleLinear()
        .range([height - MARGIN, MARGIN])
        .domain([0, 10]);

      return (
        <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
          <YAxis>
            <YAxis.Ticks />
            <YAxis.Grid />
          </YAxis>
          <XAxis>
            <XAxis.Ticks />
          </XAxis>
          <Bar x='category' y='bar' duration={0} />
        </Plot>
      );
    };

    await expect(await snapshot(<Component />)).toMatchImageSnapshot(task);
  });

  test.concurrent('should render bar-background', async ({ task }) => {
    const data = [...Array(5).keys()].map((d, i) => ({
      category: `Category ${i}`,
      bar: Math.abs(Math.sin(Math.exp(i))) * 10,
    }));

    const Component: React.FC = () => {
      const MARGIN = 40;
      const width = 500;
      const height = 300;
      const xScale = scaleLinear()
        .range([MARGIN * 2, width - MARGIN])
        .domain([0, 10]);
      const yScale = scaleBand()
        .range([height - MARGIN, MARGIN])
        .domain(data.map((d) => d.category))
        .paddingInner(0.4)
        .paddingOuter(0.2);
      return (
        <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
          <YAxis hide={false}>
            <YAxis.Ticks />
          </YAxis>
          <XAxis>
            <XAxis.Ticks />
          </XAxis>
          <HorizontalBar x='bar' y='category' duration={0}>
            <HorizontalBar.Background />
          </HorizontalBar>
        </Plot>
      );
    };

    await expect(await snapshot(<Component />)).toMatchImageSnapshot(task);
  });

  test.concurrent('should render bar-horizontal-group', async ({ task }) => {
    const data = [...Array(5).keys()].map((d, i) => ({
      category: `Category ${i}`,
      bar1: Math.abs(Math.sin(Math.exp(i))) * 10,
      bar2: Math.abs(Math.sin(Math.exp(i))) * 10,
    }));

    const Component: React.FC = () => {
      const MARGIN = 40;
      const width = 500;
      const height = 300;

      const xScale = scaleLinear()
        .range([MARGIN * 2, width - MARGIN])
        .domain([0, 10]);

      const yScale = scaleBand()
        .range([height - MARGIN, MARGIN])
        .domain(data.map((d) => d.category))
        .paddingInner(0.4)
        .paddingOuter(0.2);

      return (
        <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
          <YAxis hide={false}>
            <YAxis.Ticks />
          </YAxis>
          <XAxis>
            <XAxis.Ticks />
            <XAxis.Grid />
          </XAxis>
          <GroupBar y='category'>
            <GroupBar.HorizontalBar x='bar1' duration={0} />
            <GroupBar.HorizontalBar x='bar2' color={colors['green-02']} duration={0} />
          </GroupBar>
        </Plot>
      );
    };

    await expect(await snapshot(<Component />)).toMatchImageSnapshot(task);
  });

  test.concurrent('should render bar-horizontal', async ({ task }) => {
    const data = [...Array(5).keys()].map((d, i) => ({
      category: `Category ${i}`,
      bar: Math.abs(Math.sin(Math.exp(i))) * 10,
    }));

    const Component: React.FC = () => {
      const MARGIN = 40;
      const width = 500;
      const height = 300;

      const xScale = scaleLinear()
        .range([MARGIN * 2, width - MARGIN])
        .domain([0, 10]);

      const yScale = scaleBand()
        .range([height - MARGIN, MARGIN])
        .domain(data.map((d) => d.category))
        .paddingInner(0.4)
        .paddingOuter(0.2);

      return (
        <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
          <YAxis hide={false}>
            <YAxis.Ticks />
          </YAxis>
          <XAxis>
            <XAxis.Ticks />
            <XAxis.Grid />
          </XAxis>
          <HorizontalBar x='bar' y='category' duration={0} />
        </Plot>
      );
    };

    await expect(await snapshot(<Component />)).toMatchImageSnapshot(task);
  });

  test.concurrent(
    'should render bar-horizontal with null and negative values correctly',
    async ({ task }) => {
      const data = [
        { category: 'Category 1', bar: -0.05 },
        { category: 'Category 2', bar: 0 },
        { category: 'Category 3', bar: 5 },
        { category: 'Category 4', bar: 0.05 },
        { category: 'Category 5', bar: null },
        { category: 'Category 6', bar: -5 },
      ];

      const MARGIN = 40;
      const width = 500;
      const height = 300;

      const xScale = scaleLinear()
        .range([MARGIN * 2, width - MARGIN])
        .domain([-7, 7]);

      const yScale = scaleBand()
        .range([height - MARGIN, MARGIN])
        .domain(data.map((d) => d.category))
        .paddingInner(0.4)
        .paddingOuter(0.2);

      const component = (
        <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
          <YAxis hide={false}>
            <YAxis.Ticks />
          </YAxis>
          <XAxis>
            <XAxis.Ticks />
            <XAxis.Grid />
          </XAxis>
          <HorizontalBar x='bar' y='category' duration={0} />
        </Plot>
      );

      await expect(await snapshot(component)).toMatchImageSnapshot(task);
    },
  );

  test.concurrent('should render bar-label', async ({ task }) => {
    const data = [...Array(5).keys()].map((d, i) => ({
      category: `Category ${i}`,
      bar: i + 10 * Math.abs(Math.sin(Math.exp(i))),
    }));

    const Component: React.FC = () => {
      const MARGIN = 40;
      const width = 500;
      const height = 300;

      const resolveColor = useColorResolver();

      const xScale = scaleLinear()
        .range([MARGIN * 2, width - MARGIN * 2])
        .domain([0, Math.max(...data.map((d) => d.bar))]);

      const yScale = scaleBand()
        .range([height - MARGIN, MARGIN])
        .domain(data.map((d) => d.category))
        .paddingInner(0.4)
        .paddingOuter(0.2);

      return (
        <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
          <YAxis>
            <YAxis.Ticks />
          </YAxis>
          <HorizontalBar x='bar' y='category' duration={0}>
            {({ value, x, y, width, height }: any) => {
              return {
                children: (
                  <text
                    x={x + width + 16}
                    y={y + height / 2}
                    textAnchor='start'
                    alignmentBaseline='middle'
                    fill={resolveColor('chart-grid-text-label')}
                  >
                    $ {value.bar}
                  </text>
                ),
              };
            }}
          </HorizontalBar>
        </Plot>
      );
    };

    await expect(await snapshot(<Component />)).toMatchImageSnapshot(task);
  });

  test.concurrent('should render bar-stack', async ({ task }) => {
    const data = [...Array(5).keys()].map((d, i) => ({
      category: `Category ${i}`,
      stack1: Math.abs(Math.sin(Math.exp(i))) * 10,
      stack2: Math.abs(Math.sin(Math.exp(i))) * 10,
    }));

    const Component: React.FC = () => {
      const MARGIN = 40;
      const width = 500;
      const height = 300;

      const xScale = scaleBand()
        .range([MARGIN, width - MARGIN])
        .domain(data.map((d) => d.category))
        .paddingInner(0.4)
        .paddingOuter(0.2);

      const yScale = scaleLinear()
        .range([height - MARGIN, MARGIN])
        .domain([0, 20]);

      return (
        <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
          <YAxis>
            <YAxis.Ticks />
            <YAxis.Grid />
          </YAxis>
          <XAxis>
            <XAxis.Ticks />
          </XAxis>
          <StackBar x='category'>
            <StackBar.Bar y='stack1' duration={0} />
            <StackBar.Bar y='stack2' color={colors['blue-02']} duration={0} />
          </StackBar>
        </Plot>
      );
    };

    await expect(await snapshot(<Component />)).toMatchImageSnapshot(task);
  });

  test.concurrent('should render bar-horizontal-stack', async ({ task }) => {
    const data = [
      { category: 'Category 1', stack1: 0.01, stack2: 0.03, stack3: 0.01 },
      { category: 'Category 2', stack1: -0.01, stack2: -1, stack3: -0.01 },
      { category: 'Category 3', stack1: -1, stack2: -1, stack3: -1 },
      { category: 'Category 4', stack1: -0.01, stack2: -0.01, stack3: -0.01 },
      { category: 'Category 5', stack1: 3, stack2: 0, stack3: 5 },
      { category: 'Category 6', stack1: 0.01, stack2: 1, stack3: 0.01 },
    ];

    const Component: React.FC = () => {
      const MARGIN = 40;
      const width = 500;
      const height = 300;

      const xScale = scaleLinear()
        .range([MARGIN * 2, width - MARGIN])
        .domain([-10, 10]);

      const yScale = scaleBand()
        .range([height - MARGIN, MARGIN])
        .domain(data.map((d) => d.category))
        .paddingInner(0.4)
        .paddingOuter(0.2);

      return (
        <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
          <YAxis hide={false}>
            <YAxis.Ticks />
          </YAxis>
          <XAxis>
            <XAxis.Ticks />
            <XAxis.Grid />
          </XAxis>
          <StackBar y='category'>
            <StackBar.HorizontalBar x='stack1' color={colors['green-02']} wMin={5} duration={0} />
            <StackBar.HorizontalBar x='stack2' color={colors['blue-02']} wMin={5} duration={0} />
            <StackBar.HorizontalBar x='stack3' color={colors['red-02']} wMin={5} duration={0} />
          </StackBar>
        </Plot>
      );
    };

    await expect(await snapshot(<Component />)).toMatchImageSnapshot(task);
  });
});

describe('Bubble', () => {
  test.concurrent('should render bubble', async ({ task }) => {
    const data = Array(10)
      .fill({})
      .map((d, i) => ({
        x: Math.abs(Math.sin(Math.exp(i))) * 10,
        y: Math.abs(Math.sin(Math.exp(i))) * 10,
        value: Math.abs(Math.sin(Math.exp(i))) * 1000,
      }));

    const Component: React.FC = () => {
      const MARGIN = 40;
      const width = 500;
      const height = 300;

      const xScale = scaleLinear()
        .range([MARGIN, width - MARGIN])
        .domain([0, 10]);

      const yScale = scaleLinear()
        .range([height - MARGIN, MARGIN])
        .domain([0, 10]);

      return (
        <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
          <YAxis>
            <YAxis.Ticks />
            <YAxis.Grid />
          </YAxis>
          <XAxis>
            <XAxis.Ticks />
          </XAxis>
          <Bubble x='x' y='y' value='value' duration={0} />
        </Plot>
      );
    };

    await expect(await snapshot(<Component />)).toMatchImageSnapshot(task);
  });

  test.concurrent('should render custom-color', async ({ task }) => {
    const data = [
      { x: 2, y: 3, value: 5040, label: 'label 1', color: '#2BB3FF' },
      { x: 1, y: 9, value: 40, label: 'label 2', color: '#59DDAA' },
      { x: 6, y: 2, value: 45634, label: 'label 3', color: '#FF4953' },
      { x: 4, y: 7, value: 245, label: 'label 4', color: '#AB6CFE' },
      { x: 9, y: 5, value: 7462, label: 'label 5', color: '#66C030' },
    ];

    const Component: React.FC = () => {
      const MARGIN = 40;
      const width = 500;
      const height = 300;

      const xScale = scaleLinear()
        .range([MARGIN, width - MARGIN])
        .domain([0, 10]);

      const yScale = scaleLinear()
        .range([height - MARGIN, MARGIN])
        .domain([0, 10]);

      return (
        <Plot scale={[xScale, yScale]} width={width} height={height}>
          <YAxis>
            <YAxis.Ticks />
            <YAxis.Grid />
          </YAxis>
          <XAxis>
            <XAxis.Ticks />
          </XAxis>
          <Bubble data={data} x='x' y='y' value='value' label='label' color='color' duration={0} />
        </Plot>
      );
    };

    await expect(await snapshot(<Component />)).toMatchImageSnapshot(task);
  });
});

describe('Donut', () => {
  test.concurrent('should render donut-without-data', async ({ task }) => {
    const data = {
      a: 0,
      b: 0,
      c: 0,
    };

    const Component: React.FC = () => {
      return (
        <Plot width={300} height={300} data={data}>
          <Donut innerRadius={100}>
            <Donut.EmptyData />
            <Donut.Pie dataKey='a' />
            <Donut.Pie dataKey='b' color={colors['green-02']} />
            <Donut.Pie dataKey='c' color={colors['pink-03']} />
          </Donut>
        </Plot>
      );
    };

    await expect(await snapshot(<Component />)).toMatchImageSnapshot(task);
  });

  test.concurrent('should render donut', async ({ task }) => {
    const data = {
      a: 3,
      b: 1,
      c: 2,
    };

    const Component: React.FC = () => {
      return (
        <Plot width={300} height={300} data={data}>
          <Donut innerRadius={100}>
            <Donut.Pie dataKey='a' name='Pie 1' />
            <Donut.Pie dataKey='b' color={colors['green-02']} name='Pie 2' />
            <Donut.Pie dataKey='c' color={colors['violet-04']} name='Pie 3' />
            <Donut.Label>Example</Donut.Label>
          </Donut>
        </Plot>
      );
    };

    await expect(await snapshot(<Component />)).toMatchImageSnapshot(task);
  });

  test.concurrent('should support active sector in donut chart', async ({ task }) => {
    const data = {
      a: 3,
      b: 1,
      c: 2,
    };

    const Component: React.FC = () => {
      return (
        <Plot width={300} height={300} data={data}>
          <Donut innerRadius={100}>
            <Donut.Pie dataKey='a' name='Pie 1' active />
            <Donut.Pie dataKey='b' color={colors['green-02']} name='Pie 2' />
            <Donut.Pie dataKey='c' color={colors['violet-04']} name='Pie 3' />
          </Donut>
        </Plot>
      );
    };

    await expect(await snapshot(<Component />)).toMatchImageSnapshot(task);
  });

  test.concurrent('should render semi-donut-with-one-data', async ({ task }) => {
    const data = {
      speed: 3,
      other: 200,
    };

    const Component: React.FC = () => {
      return (
        <Plot width={300} height={150} data={data}>
          <Donut halfsize innerRadius={100}>
            <Donut.Pie dataKey='speed' />
            <Donut.Pie dataKey='other' color='#C4C7CF' />
            <Donut.Label>
              <Text tag='tspan' x='0' dy='-1.2em' fill='#6C6E79' size={400}>
                Keyword volume
              </Text>
            </Donut.Label>
          </Donut>
        </Plot>
      );
    };

    await expect(await snapshot(<Component />)).toMatchImageSnapshot(task);
  });

  test.concurrent('should render semi-donut', async ({ task }) => {
    const data = {
      a: 3,
      b: 1,
      c: 2,
    };

    const Component: React.FC = () => {
      return (
        <Plot width={300} height={150} data={data}>
          <Donut halfsize innerRadius={100}>
            <Donut.Pie dataKey='a' name='Pie 1' />
            <Donut.Pie dataKey='b' color={colors['green-02']} name='Pie 2' />
            <Donut.Pie dataKey='c' color={colors['violet-04']} name='Pie 3' />
            <Donut.Label>
              <Text tag='tspan' x='0' dy='-1.2em' fill='#191b23' size={600}>
                71,240
              </Text>
              <Text tag='tspan' x='0' dy='1.2em' fill='#6c6e79' size={200}>
                Engagements
              </Text>
            </Donut.Label>
          </Donut>
        </Plot>
      );
    };

    await expect(await snapshot(<Component />)).toMatchImageSnapshot(task);
  });
});

describe('Radial', () => {
  test.concurrent('should render radial-tree-custom-center', async ({ task }) => {
    const Component: React.FC = () => {
      const width = 500;
      const height = 500;

      const data = Array(12)
        .fill({})
        .map((_, i) => ({
          label: `Sheep ${i + 1}`,
          icon: LikeM,
        }));

      return (
        <Plot data={data} scale={[scaleLinear(), scaleLinear()]} width={width} height={height}>
          <RadialTree centralMargin={85} color='#AB6CFE'>
            <RadialTree.Radian>
              <RadialTree.Radian.Label />
              <RadialTree.Radian.Line />
              <RadialTree.Radian.Cap />
              <RadialTree.Radian.Icon />
            </RadialTree.Radian>
            <circle r={60} cx={width / 2} cy={height / 2} fill='#AB6CFE' />
            <RadialTree.Title color='#FFFFFF'>Sleeping</RadialTree.Title>
          </RadialTree>
        </Plot>
      );
    };

    await expect(await snapshot(<Component />)).toMatchImageSnapshot(task);
  });

  test.concurrent('should render radial-tree-multicolor', async ({ task }) => {
    const movies = [
      { label: 'Action', color: '#008ff8' },
      { label: 'Comedy', color: '#008ff8' },
      { label: 'Drama', color: '#008ff8' },
      { label: 'Fantasy', color: '#008ff8' },
      { label: 'Mystery', color: '#008ff8' },
      { label: 'Romance', color: '#008ff8' },
      { label: 'Western', color: '#008ff8' },
      { label: 'Thriller', color: '#f160c3' },
      { label: 'Crime Thriller', color: '#f160c3' },
      { label: 'Disaster Thriller', color: '#f160c3' },
      { label: 'Psychological\nThriller', color: '#f160c3' },
      { label: 'Techno Thriller', color: '#f160c3' },
      { label: 'Horror', color: '#ff4953' },
      { label: 'Zombie Horror', color: '#ff4953' },
      { label: 'Folk Horror', color: '#ff4953' },
      { label: 'Body Horror', color: '#ff4953' },
      { label: 'Found\nFootage Horror', color: '#ff4953' },
    ];

    const Component: React.FC = () => {
      const width = 500;
      const height = 500;

      return (
        <Plot data={movies} scale={[scaleLinear(), scaleLinear()]} width={width} height={height}>
          <RadialTree>
            <RadialTree.Radian>
              <RadialTree.Radian.Label />
              <RadialTree.Radian.Line />
              <RadialTree.Radian.Cap />
              <RadialTree.Radian.Icon tag={LikeM} />
            </RadialTree.Radian>
            <RadialTree.Title>Movies</RadialTree.Title>
          </RadialTree>
        </Plot>
      );
    };

    await expect(await snapshot(<Component />)).toMatchImageSnapshot(task);
  });

  test.concurrent('should render radial-tree-multiline-text', async ({ task }) => {
    const Component: React.FC = () => {
      const width = 500;
      const height = 500;

      const data = Array(12)
        .fill({})
        .map((_, index) => ({
          label: [
            'consectetur\nadipiscing',
            'elit, sed do\neiusmod tempor',
            'incididunt ut\nlabore et\ndolore',
            'magna aliqua',
            'Ut enim',
            'ad minim veniam',
            'quis nostrud\nexercitation',
            'ullamco\nlaboris\nnisi',
            'ut aliquip ex',
            'ea commodo',
            'consequat',
            'Duis aute',
            'irure dolor\nin',
            'reprehenderit',
          ][index],
          icon: LikeM,
        }));

      const textSize = 12;
      const lineHeight = textSize * 1.2;
      const textLines = ['Lorem ipsum', 'dolor', 'sit amet'];

      return (
        <Plot
          data={data}
          scale={[scaleLinear(), scaleLinear()]}
          width={width}
          height={height}
          textSize={textSize}
        >
          <RadialTree color='#AB6CFE'>
            <RadialTree.Radian>
              <RadialTree.Radian.Label />
              <RadialTree.Radian.Line />
              <RadialTree.Radian.Cap />
              <RadialTree.Radian.Icon />
            </RadialTree.Radian>
            <RadialTree.Title textSize={lineHeight} color='#AB6CFE'>
              {textLines.map((line, lineIndex) => (
                <tspan
                  key={line}
                  x={width / 2}
                  y={height / 2 + (-(textLines.length - 1) / 2 + lineIndex) * lineHeight}
                >
                  {line}
                </tspan>
              ))}
            </RadialTree.Title>
          </RadialTree>
        </Plot>
      );
    };

    await expect(await snapshot(<Component />)).toMatchImageSnapshot(task);
  });

  test.concurrent('should render radial-tree', async ({ task }) => {
    const Component: React.FC = () => {
      const width = 500;
      const height = 500;

      const data = Array(12)
        .fill({})
        .map((_, i) => ({
          label: `Sheep ${i + 1}`,
          icon: LikeM,
        }));

      return (
        <Plot data={data} scale={[scaleLinear(), scaleLinear()]} width={width} height={height}>
          <RadialTree color='#AB6CFE'>
            <RadialTree.Radian>
              <RadialTree.Radian.Label />
              <RadialTree.Radian.Line />
              <RadialTree.Radian.Cap />
              <RadialTree.Radian.Icon />
            </RadialTree.Radian>
            <RadialTree.Title>Sleeping</RadialTree.Title>
          </RadialTree>
        </Plot>
      );
    };

    await expect(await snapshot(<Component />)).toMatchImageSnapshot(task);
  });
});

describe('Scatter', () => {
  test.concurrent('should render custom-color-values', async ({ task }) => {
    const data = Array(20)
      .fill({})
      .map((d, i) => ({
        x: i,
        y1: Math.abs(Math.sin(Math.exp(i))) * 10,
        y2: Math.abs(Math.sin(Math.exp(i))) * 10,
        value: i,
      }));

    const Component: React.FC = () => {
      const MARGIN = 40;
      const width = 500;
      const height = 300;

      const xScale = scaleLinear()
        .range([MARGIN, width - MARGIN])
        .domain(minMax(data, 'x'));

      const yScale = scaleLinear()
        .range([height - MARGIN, MARGIN])
        .domain([0, 10]);

      return (
        <Plot scale={[xScale, yScale]} width={width} height={height} data={data}>
          <YAxis>
            <YAxis.Ticks />
            <YAxis.Grid />
          </YAxis>
          <XAxis>
            <XAxis.Ticks />
          </XAxis>
          <ScatterPlot x='x' y='y1' value='value' color='#2BB3FF' valueColor='#008ff8' />
          <ScatterPlot x='x' y='y2' value='value' color='#59DDAA' valueColor='#00C192' />
        </Plot>
      );
    };

    await expect(await snapshot(<Component />)).toMatchImageSnapshot(task);
  });

  test.concurrent('should render custom-color', async ({ task }) => {
    const data = Array(20)
      .fill({})
      .map((d, i) => ({
        x: i,
        y1: Math.abs(Math.sin(Math.exp(i))) * 10,
        y2: Math.abs(Math.sin(Math.exp(i))) * 10,
      }));

    const Component: React.FC = () => {
      const MARGIN = 40;
      const width = 500;
      const height = 300;

      const xScale = scaleLinear()
        .range([MARGIN, width - MARGIN])
        .domain(minMax(data, 'x'));

      const yScale = scaleLinear()
        .range([height - MARGIN, MARGIN])
        .domain([0, 10]);

      return (
        <Plot scale={[xScale, yScale]} width={width} height={height} data={data}>
          <YAxis>
            <YAxis.Ticks />
            <YAxis.Grid />
          </YAxis>
          <XAxis>
            <XAxis.Ticks />
          </XAxis>
          <ScatterPlot x='x' y='y1' color='#2BB3FF' />
          <ScatterPlot x='x' y='y2' color='#59DDAA' />
        </Plot>
      );
    };

    await expect(await snapshot(<Component />)).toMatchImageSnapshot(task);
  });

  test.concurrent('should render scatterplot-values', async ({ task }) => {
    const data = Array(20)
      .fill({})
      .map((d, i) => ({
        x: i,
        y: Math.abs(Math.sin(Math.exp(i))) * 10,
        value: i,
      }));

    const Component: React.FC = () => {
      const MARGIN = 40;
      const width = 500;
      const height = 300;

      const xScale = scaleLinear()
        .range([MARGIN, width - MARGIN])
        .domain(minMax(data, 'x'));

      const yScale = scaleLinear()
        .range([height - MARGIN, MARGIN])
        .domain([0, 10]);

      return (
        <Plot scale={[xScale, yScale]} width={width} height={height} data={data}>
          <YAxis>
            <YAxis.Ticks />
            <YAxis.Grid />
          </YAxis>
          <XAxis>
            <XAxis.Ticks />
          </XAxis>
          <ScatterPlot x='x' y='y' value='value' />
        </Plot>
      );
    };

    await expect(await snapshot(<Component />)).toMatchImageSnapshot(task);
  });
});

describe('Radar', () => {
  test.concurrent('should render radar', async ({ task }) => {
    const data = {
      categories: [
        'Variable 1',
        'Variable 2',
        'Variable 3',
        'Variable 4',
        'Variable 5',
        'Variable 6',
      ],
      data_1: [1, 3, 5, 5, 9, 2],
      data_2: [5, 2, 1, 2, 7, 6],
    };

    const scale = scaleLinear().domain([0, 10]);

    const Component: React.FC = () => {
      return (
        <Plot data={data} width={300} height={300}>
          <Radar scale={scale}>
            <Radar.Axis dataKey='categories'>
              <Radar.Axis.Ticks />
              <Radar.Axis.Labels />
            </Radar.Axis>
            <Radar.Polygon dataKey='data_1'>
              <Radar.Polygon.Line />
              <Radar.Polygon.Dots />
            </Radar.Polygon>
            <Radar.Polygon dataKey='data_2' color='red'>
              <Radar.Polygon.Line />
              <Radar.Polygon.Dots />
            </Radar.Polygon>
          </Radar>
        </Plot>
      );
    };

    await expect(await snapshot(<Component />)).toMatchImageSnapshot(task);
  });
});

describe('Line', () => {
  test.concurrent('should render line', async ({ task }) => {
    const data = Array(20)
      .fill({})
      .map((d, i) => {
        const y = Math.abs(Math.sin(Math.exp(i))) * 10;
        return {
          x: i,
          y: i === 2 || i === 3 ? null : y,
        };
      });

    const Component: React.FC = () => {
      const MARGIN = 40;
      const width = 500;
      const height = 300;

      const xScale = scaleLinear()
        .range([MARGIN, width - MARGIN])
        .domain(minMax(data, 'x'));

      const yScale = scaleLinear()
        .range([height - MARGIN, MARGIN])
        .domain([0, 10]);

      return (
        <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
          <YAxis>
            <YAxis.Ticks />
            <YAxis.Grid />
          </YAxis>
          <XAxis>
            <XAxis.Ticks />
          </XAxis>
          <Line x='x' y='y' duration={0}>
            <Line.Dots display />
          </Line>
        </Plot>
      );
    };

    await expect(await snapshot(<Component />)).toMatchImageSnapshot(task);
  });

  test.concurrent('should render line with area', async ({ task }) => {
    const data = Array(20)
      .fill({})
      .map((d, i) => {
        const y = Math.abs(Math.sin(Math.exp(i))) * 10;

        return {
          x: i,
          y,
          y0: y - 2,
          y1: y + 2,
        };
      });

    const Component: React.FC = () => {
      const MARGIN = 40;
      const width = 500;
      const height = 300;

      const xScale = scaleLinear()
        .range([MARGIN, width - MARGIN])
        .domain(minMax(data, 'x'));

      const yScale = scaleLinear()
        .range([height - MARGIN, MARGIN])
        .domain([0, 10]);

      return (
        <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
          <YAxis>
            <YAxis.Ticks />
            <YAxis.Grid />
          </YAxis>
          <XAxis>
            <XAxis.Ticks />
          </XAxis>
          <Line x='x' y='y' duration={0}>
            <Line.Area y0='y0' y1='y1' />
          </Line>
        </Plot>
      );
    };

    await expect(await snapshot(<Component />)).toMatchImageSnapshot(task);
  });

  test.concurrent('should render line with area if line has null values', async ({ task }) => {
    const data = Array(20)
      .fill({})
      .map((d, i) => {
        const y = i > 8 && i < 16 ? Math.abs(Math.sin(Math.exp(i))) * 10 : null;

        return {
          x: i,
          y,
          y0: y ? y - 2 : null,
          y1: y ? y + 2 : null,
        };
      });

    const Component: React.FC = () => {
      const MARGIN = 40;
      const width = 500;
      const height = 300;

      const xScale = scaleLinear()
        .range([MARGIN, width - MARGIN])
        .domain(minMax(data, 'x'));

      const yScale = scaleLinear()
        .range([height - MARGIN, MARGIN])
        .domain([0, 10]);

      return (
        <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
          <YAxis>
            <YAxis.Ticks />
            <YAxis.Grid />
          </YAxis>
          <XAxis>
            <XAxis.Ticks />
          </XAxis>
          <Line x='x' y='y' duration={0}>
            <Line.Area y0='y0' y1='y1' />
            <Line.Null />
          </Line>
        </Plot>
      );
    };

    await expect(await snapshot(<Component />)).toMatchImageSnapshot(task);
  });
});

describe('ChartLegend', () => {
  test.concurrent('should correct render Ellipsis in tables', async ({ expect, task }) => {
    const data = [...Array(5).keys()].map((d, i) => ({
      x: i,
      Line1: Math.random() * 10,
      Line2: Math.random() * 10,
      Line3: Math.random() * 10,
      Line4: Math.random() * 10,
      Line5: Math.random() * 10,
    }));

    const Component = () => {
      const lines = Object.keys(data[0])
        .filter((key) => key !== 'x')
        .map((item, index) => {
          return {
            id: item,
            label: (
              <Ellipsis>
                Itefbdsfbjksdbfjbdsjfbjhbfjhsbfjhsbdjhdmbfbsdjfbjdsbfjbsdjfbsdjfbsdbf
              </Ellipsis>
            ),
            checked: true,
            color: `chart-palette-order-${index + 1}`,
            columns: [
              <Text use={'secondary'}>{(42 * (index + 3)) / 10}%</Text>,
              <Text use={'primary'}>{42 * (index + 3)}</Text>,
              <Text use={'primary'}>{22 * (index + 3)}</Text>,
            ],
          };
        });

      return (
        <div style={{ outline: '1px solid magenta', width: '500px' }}>
          <ChartLegendTable items={lines} shape={'Circle'} />
        </div>
      );
    };

    await expect(await snapshot(<Component />)).toMatchImageSnapshot(task);
  });

  test.concurrent('should correct render one column in tables', async ({ expect, task }) => {
    const data = [...Array(5).keys()].map((d, i) => ({
      x: i,
      Line1: Math.random() * 10,
      Line2: Math.random() * 10,
      Line3: Math.random() * 10,
      Line4: Math.random() * 10,
      Line5: Math.random() * 10,
    }));

    const Component = () => {
      const lines = Object.keys(data[0])
        .filter((key) => key !== 'x')
        .map((item, index) => {
          return {
            id: item,
            label: (
              <Ellipsis>
                Itefbdsfbjksdbfjbdsjfbjhbfjhsbfjhsbdjhdmbfbsdjfbjdsbfjbsdjfbsdjfbsdbf
              </Ellipsis>
            ),
            checked: true,
            color: `chart-palette-order-${index + 1}`,
            columns: [<Text use={'secondary'}>{(42 * (index + 3)) / 10}%</Text>],
          };
        });

      return (
        <div style={{ outline: '1px solid magenta', width: '500px' }}>
          <ChartLegendTable items={lines} shape={'Circle'} />
        </div>
      );
    };

    await expect(await snapshot(<Component />)).toMatchImageSnapshot(task);
  });
});

describe('d3 charts visual regression', () => {
  beforeEach(cleanup);

  test.concurrent('should render axis-grid', async ({ task }) => {
    const data = Array(20)
      .fill({})
      .map((d, i) => ({
        x: i,
        y: Math.abs(Math.sin(Math.exp(i))) * 10,
      }));

    const Component: React.FC = () => {
      const MARGIN = 40;
      const width = 500;
      const height = 300;

      const xScale = scaleLinear()
        .range([MARGIN, width - MARGIN])
        .domain(minMax(data, 'x'));

      const yScale = scaleLinear()
        .range([height - MARGIN, MARGIN])
        .domain([0, 10]);

      return (
        <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
          <YAxis>
            <YAxis.Ticks ticks={yScale.ticks()} />
            <YAxis.Grid ticks={yScale.ticks()} />
          </YAxis>
          <XAxis ticks={xScale.ticks()}>
            <XAxis.Ticks />
            <XAxis.Grid />
          </XAxis>
          <Line x='x' y='y' duration={0} />
        </Plot>
      );
    };

    await expect(await snapshot(<Component />)).toMatchImageSnapshot(task);
  });

  test.concurrent('should render axis-ticks', async ({ task }) => {
    const data = Array(20)
      .fill({})
      .map((d, i) => ({
        x: i,
        y: (Math.abs(Math.sin(Math.exp(i))) > 0.5 ? 1 : -1) * Math.abs(Math.sin(Math.exp(i))),
      }));

    const Component: React.FC = () => {
      const MARGIN = 60;
      const width = 500;
      const height = 300;

      const xScale = scaleLinear()
        .range([MARGIN, width - MARGIN])
        .domain(minMax(data, 'x'));

      const yScale = scaleLinear()
        .range([height - MARGIN, MARGIN])
        .domain([-1, 1]);

      return (
        <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
          <XAxis>
            <XAxis.Ticks ticks={xScale.ticks()} />
          </XAxis>
          <YAxis>
            <YAxis.Ticks ticks={yScale.ticks(5)}>
              {({ value }: any) => ({
                children: yScale.tickFormat(5, '+%')(value),
              })}
            </YAxis.Ticks>
          </YAxis>
          <Line x='x' y='y' duration={0} />
        </Plot>
      );
    };

    await expect(await snapshot(<Component />)).toMatchImageSnapshot(task);
  });

  test.concurrent('should render axis-titles', async ({ task }) => {
    const data = Array(5)
      .fill({})
      .map((d, i) => ({
        category: `Category ${i}`,
        bar: Math.abs(Math.sin(Math.exp(i))) * 1000000,
      }));

    const Component: React.FC = () => {
      const width = 500;
      const height = 300;
      const xScale = scaleBand()
        .range([90, width - 60])
        .domain(data.map((d) => d.category))
        .paddingInner(0.4)
        .paddingOuter(0.2);
      const yScale = scaleLinear()
        .range([height - 40, 40])
        .domain([0, 1000000]);
      return (
        <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
          <YAxis>
            <YAxis.Ticks />
            <YAxis.Ticks position='right'>
              {({ value }: any) => ({
                children: Math.floor(value / 100000),
              })}
            </YAxis.Ticks>
            <YAxis.Grid />
            <YAxis.Title position='left'>YAxis title</YAxis.Title>
            <YAxis.Title>YAxis title</YAxis.Title>
          </YAxis>
          <XAxis>
            <XAxis.Ticks />
            <XAxis.Ticks position='top' />
            <XAxis.Title>XAxis title</XAxis.Title>
            <XAxis.Title position='bottom'>XAxis title</XAxis.Title>
          </XAxis>
        </Plot>
      );
    };

    await expect(await snapshot(<Component />)).toMatchImageSnapshot(task);
  });

  test.concurrent('should render axis-titles with vertical mode', async ({ task }) => {
    const data = Array(5)
      .fill({})
      .map((d, i) => ({
        category: `Category ${i}`,
        bar: Math.abs(Math.sin(Math.exp(i))) * 1000000,
      }));

    const Component: React.FC = () => {
      const width = 500;
      const height = 300;
      const xScale = scaleBand()
        .range([90, width - 60])
        .domain(data.map((d) => d.category))
        .paddingInner(0.4)
        .paddingOuter(0.2);
      const yScale = scaleLinear()
        .range([height - 40, 40])
        .domain([0, 1000000]);
      return (
        <I18nProvider value='ja'>
          <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
            <YAxis>
              <YAxis.Ticks />
              <YAxis.Ticks position='right'>
                {({ value }: any) => ({
                  children: Math.floor(value / 100000),
                })}
              </YAxis.Ticks>
              <YAxis.Grid />
              <YAxis.Title position='left'>YAxis title</YAxis.Title>
              <YAxis.Title>YAxis title</YAxis.Title>
            </YAxis>
            <XAxis>
              <XAxis.Ticks />
              <XAxis.Ticks position='top' />
              <XAxis.Title>XAxis title</XAxis.Title>
              <XAxis.Title position='bottom'>XAxis title</XAxis.Title>
            </XAxis>
          </Plot>
        </I18nProvider>
      );
    };

    await expect(await snapshot(<Component />)).toMatchImageSnapshot(task);
  });

  test.concurrent('should render reference line with fixed width', async ({ task }) => {
    const data = Array(5)
      .fill({})
      .map((d, i) => ({
        category: `Category ${i}`,
        bar: Math.abs(Math.sin(Math.exp(i))) * 1000000,
      }));

    const Component: React.FC = () => {
      const width = 500;
      const height = 300;
      const xScale = scaleBand()
        .range([90, width - 60])
        .domain(data.map((d) => d.category))
        .paddingInner(0.4)
        .paddingOuter(0.2);
      const yScale = scaleLinear()
        .range([height - 40, 40])
        .domain([0, 1000000]);
      return (
        <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
          <YAxis>
            <YAxis.Ticks />
          </YAxis>
          <XAxis>
            <XAxis.Ticks />
          </XAxis>
          <ReferenceLine title='Left data' value={data[0].category} />
          <ReferenceStripes value={data[0].category} endValue={data[1].category} />
          <ReferenceLine title='Right data' position='right' value={data[1].category} />
          <ReferenceLine title='Top data' position='top' value={900000} />
          <ReferenceLine title='Bottom data' position='bottom' value={300000} />
          <ReferenceLine
            value={data[3].category}
            strokeDasharray='3 3'
            strokeWidth='0.5'
            title='Mobile data'
            width='100'
          />
          <ReferenceBackground value={data[3].category} width='100' />
        </Plot>
      );
    };

    await expect(await snapshot(<Component />)).toMatchImageSnapshot(task);
  });
  test.concurrent('should render reference line with value based width', async ({ task }) => {
    const data = Array(5)
      .fill({})
      .map((d, i) => ({
        category: `Category ${i}`,
        bar: Math.abs(Math.sin(Math.exp(i))) * 1000000,
      }));

    const Component: React.FC = () => {
      const width = 500;
      const height = 300;
      const xScale = scaleBand()
        .range([90, width - 60])
        .domain(data.map((d) => d.category))
        .paddingInner(0.4)
        .paddingOuter(0.2);
      const yScale = scaleLinear()
        .range([height - 40, 40])
        .domain([0, 1000000]);
      return (
        <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
          <YAxis>
            <YAxis.Ticks />
          </YAxis>
          <XAxis>
            <XAxis.Ticks />
          </XAxis>
          <ReferenceLine title='Left data' value={data[0].category} />
          <ReferenceLine title='Right data' position='right' value={data[1].category} />
          <ReferenceLine title='Top data' position='top' value={900000} />
          <ReferenceLine title='Bottom data' position='bottom' value={300000} />
          <ReferenceLine
            value={data[3].category}
            strokeDasharray='3 3'
            strokeWidth='0.5'
            title='Mobile data'
            width='100'
          >
            <ReferenceLine.Background endValue={data[4].category} />
          </ReferenceLine>
        </Plot>
      );
    };

    await expect(await snapshot(<Component />)).toMatchImageSnapshot(task);
  });

  test.concurrent('should render axis', async ({ task }) => {
    const data = Array(21)
      .fill({})
      .map((d, i) => ({
        x: i,
        y: Math.abs(Math.sin(Math.exp(i))) * 10,
      }));

    const Component: React.FC = () => {
      const MARGIN = 40;
      const width = 500;
      const height = 300;

      const xScale = scaleLinear()
        .range([MARGIN, width - MARGIN])
        .domain(minMax(data, 'x'));

      const yScale = scaleLinear()
        .range([height - MARGIN, MARGIN])
        .domain([0, 10]);

      return (
        <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
          <YAxis>
            <YAxis.Ticks ticks={[0, 5, 10]} />
          </YAxis>
          <XAxis>
            <XAxis.Ticks ticks={xScale.ticks(width / 50)} />
          </XAxis>
          <Line x='x' y='y' duration={0} />
        </Plot>
      );
    };

    await expect(await snapshot(<Component />)).toMatchImageSnapshot(task);
  });

  test.concurrent('should render legend', async ({ task }) => {
    const data = [...Array(10).keys()].map((d, i) => ({
      x: i,
      y: Math.abs(Math.sin(Math.exp(i))) * i,
      y2: Math.abs(Math.sin(Math.exp(i))) * (i + 2),
    }));

    const axe2theme: any = {
      y: 'orange',
      y2: 'green',
    };

    const Component: React.FC = () => {
      const [dataLegend, setDataLegend] = React.useState(
        Object.keys(data[0])
          .filter((name) => name !== 'x')
          .map((item) => ({
            id: item,
            label: item,
            checked: true,
            color: axe2theme[item],
          })),
      );

      const width = 500;
      const height = 300;
      const MARGIN = 40;
      const xScale = scaleLinear()
        .range([MARGIN, width - MARGIN])
        .domain(minMax(data, 'x'));

      const yScale = scaleLinear()
        .range([height - MARGIN, MARGIN])
        .domain(dataLegend.find((item) => item.checked) ? [0, 10] : []);

      return (
        <>
          <Box>
            <ChartLegend items={dataLegend} />
          </Box>
          <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
            <YAxis>
              <YAxis.Ticks />
              <YAxis.Grid />
            </YAxis>
            <XAxis>
              <XAxis.Ticks />
            </XAxis>
            {dataLegend.map((item) => {
              return (
                <Line key={item.id} x='x' y={item.id} color={axe2theme[item.id]} duration={0} />
              );
            })}
          </Plot>
        </>
      );
    };

    await expect(await snapshot(<Component />)).toMatchImageSnapshot(task);
  });

  test.concurrent('should render margin', async ({ task }) => {
    const data = Array(20)
      .fill({})
      .map((d, i) => ({
        x: i,
        y: Math.abs(Math.sin(Math.exp(i))) * 10,
      }));

    const Component: React.FC = () => {
      const MARGIN = 100;
      const width = 500;
      const height = 300;

      const xScale = scaleLinear()
        .range([MARGIN, width - MARGIN])
        .domain(minMax(data, 'x'));

      const yScale = scaleLinear()
        .range([height - MARGIN, MARGIN])
        .domain(minMax(data, 'y'));

      return (
        <Plot
          data={data}
          scale={[xScale, yScale]}
          width={width}
          height={height}
          style={{ border: '1px solid' }}
        >
          <Line x='x' y='y' duration={0} />
        </Plot>
      );
    };

    await expect(await snapshot(<Component />)).toMatchImageSnapshot(task);
  });

  test.concurrent('should render Compact horizontal bar chart', async ({ task }) => {
    const data = [
      {
        category: 'Schema.org (Microdata)',
        value: 0,
      },
      {
        category: 'Open graph',
        value: 9650,
      },
      {
        category: 'Twitter cards',
        value: 7650,
      },
      {
        category: 'Microformats',
        value: 14650,
      },
      {
        category: 'Schema.org (JSON-LD)',
        value: 135650,
      },
    ];

    const Component: React.FC = () => {
      const MARGIN = 30;
      const width = 500;
      const height = 500;

      const sum = data.reduce((acc, d) => acc + d.value, 0);

      const xScale = scaleLinear().range([0, width]).domain([0, sum]);

      const yScale = scaleBand()
        .range([height - MARGIN, MARGIN])
        .domain([...data].reverse().map((d) => d.category))
        .paddingInner(0.6)
        .paddingOuter(0.2);

      return (
        <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
          <CompactHorizontalBar x='value' y='category'>
            <CompactHorizontalBar.Hover />
            <CompactHorizontalBar.Tooltip>
              {({ index }: any) => {
                return {
                  children: (
                    <>
                      <CompactHorizontalBar.Tooltip.Title>
                        {data[index].category}
                      </CompactHorizontalBar.Tooltip.Title>
                      <Flex justifyContent='space-between'>
                        <CompactHorizontalBar.Tooltip.Dot mr={4}>
                          Bar
                        </CompactHorizontalBar.Tooltip.Dot>
                        <Text bold>{data[index].value}</Text>
                      </Flex>
                    </>
                  ),
                };
              }}
            </CompactHorizontalBar.Tooltip>
            <CompactHorizontalBar.Annotation>
              <CompactHorizontalBar.Label />
              <CompactHorizontalBar.Percent />
              <CompactHorizontalBar.Value />
            </CompactHorizontalBar.Annotation>
            <CompactHorizontalBar.Bar>
              <CompactHorizontalBar.Bar.Background />
              <CompactHorizontalBar.Bar.Fill />
            </CompactHorizontalBar.Bar>
          </CompactHorizontalBar>
        </Plot>
      );
    };

    await expect(await snapshot(<Component />)).toMatchImageSnapshot(task);
  });
});

describe('Focus skip to content after plot', () => {
  test.sequential('nested case', async ({ expect }) => {
    const data = Array(20)
      .fill({})
      .map((d, i) => ({
        x: i,
        y: Math.abs(Math.sin(Math.exp(i))) * 10,
      }));
    const hints = makeDataHintsContainer();

    const PlotComponent: React.FC = () => {
      const plotRef = React.useRef<HTMLDivElement>(null);

      return (
        <>
          <div ref={plotRef}>
            <PlotA11yView
              id={'plotView'}
              data={data}
              plotRef={plotRef}
              plotLabel={'plot label'}
              locale={'en'}
              config={{}}
              hints={hints}
            />
          </div>
          <div className={'one'}>
            <div className={'two'}>
              <div className={'tree'}>some text</div>
            </div>
          </div>
          <div>some data</div>
          <div className={'one'}>
            <div className={'two'} tabIndex={0} data-testid={'focusableElement-1'}>
              <div className={'tree'}>some text 2</div>
            </div>
          </div>
        </>
      );
    };

    const { getByTestId } = render(<PlotComponent />);

    await userEvent.keyboard('[Tab]');
    await userEvent.keyboard('[Tab]');
    await userEvent.keyboard('[Tab]');
    await userEvent.keyboard('[Enter]');

    expect(getByTestId('focusableElement-1')).toHaveFocus();
  });

  test.sequential('nested and shifted case', async ({ expect }) => {
    const data = Array(20)
      .fill({})
      .map((d, i) => ({
        x: i,
        y: Math.abs(Math.sin(Math.exp(i))) * 10,
      }));
    const hints = makeDataHintsContainer();

    const PlotComponent: React.FC = () => {
      const plotRef = React.useRef<HTMLDivElement>(null);

      return (
        <>
          <div ref={plotRef}>
            <PlotA11yView
              id={'plotView'}
              data={data}
              plotRef={plotRef}
              plotLabel={'plot label'}
              locale={'en'}
              config={{}}
              hints={hints}
            />
          </div>
          <div className={'one'}>
            <div className={'two'}>
              <div />
              <div />
              <div className={'tree'}>some text 3</div>
            </div>
          </div>
          <div>some data</div>
          <div className={'one'}>
            <div />
            <div />
            <div className={'two'} tabIndex={0} data-testid={'focusableElement-2'}>
              <div className={'tree'}>some text 4</div>
            </div>
          </div>
        </>
      );
    };

    const { getByTestId } = render(<PlotComponent />);

    await userEvent.keyboard('[Tab]');
    await userEvent.keyboard('[Tab]');
    await userEvent.keyboard('[Tab]');
    await userEvent.keyboard('[Enter]');

    expect(getByTestId('focusableElement-2')).toHaveFocus();
  });
});

describe('patterns rendering', () => {
  const linearData = [
    { x: 0, y: 5 },
    { x: 1, y: 1 },
    { x: 2, y: 6 },
    { x: 3, y: 1 },
    { x: 4, y: 6 },
    { x: 5, y: 8 },
    { x: 6, y: 6 },
    { x: 7, y: 9 },
    { x: 8, y: 3 },
    { x: 9, y: 9 },
  ];

  const compareData = {
    a: 1,
    b: 2,
    c: 3,
  };

  const cloudData = [
    { x: 7, y: 5, value: 5 },
    { x: 3, y: 7, value: 1 },
    { x: 8, y: 9, value: 6 },
    { x: 1, y: 3, value: 1 },
    { x: 4, y: 5, value: 6 },
    { x: 10, y: 3, value: 8 },
    { x: 7, y: 8, value: 6 },
    { x: 7, y: 5, value: 9 },
    { x: 10, y: 9, value: 3 },
    { x: 2, y: 2, value: 9 },
  ];

  const radarData = {
    categories: ['a', 'b', 'c', 'd', 'e'],
    a: [7, 3, 8, 1, 4],
    b: [5, 7, 9, 3, 5],
  };

  test.concurrent('Chart.Line', async ({ task }) => {
    const Component = () => (
      <Chart.Line
        data={linearData}
        groupKey='x'
        plotHeight={200}
        plotWidth={300}
        showDots={true}
        showXAxis={false}
        patterns
      />
    );

    await expect(await snapshot(<Component />)).toMatchImageSnapshot(task);
  });
  test.concurrent('Chart.Area', async ({ task }) => {
    const Component = () => (
      <Chart.Area
        data={linearData}
        groupKey='x'
        plotHeight={200}
        plotWidth={300}
        showDots={true}
        stacked={false}
        showXAxis={false}
        patterns
      />
    );

    await expect(await snapshot(<Component />)).toMatchImageSnapshot(task);
  });
  test.concurrent('Chart.Bar', async ({ task }) => {
    const Component = () => (
      <Chart.Bar
        data={linearData}
        groupKey='x'
        plotHeight={200}
        plotWidth={300}
        showXAxis={false}
        patterns
      />
    );

    await expect(await snapshot(<Component />)).toMatchImageSnapshot(task);
  });
  test.concurrent('Chart.Bubble', async ({ task }) => {
    const Component = () => (
      <Chart.Bubble data={cloudData} plotHeight={200} plotWidth={300} showXAxis={false} patterns />
    );

    await expect(await snapshot(<Component />)).toMatchImageSnapshot(task);
  });
  test.concurrent('Chart.Donut', async ({ task }) => {
    const Component = () => (
      <Chart.Donut data={compareData} plotHeight={200} plotWidth={300} showXAxis={false} patterns />
    );

    await expect(await snapshot(<Component />)).toMatchImageSnapshot(task);
  });
  test.concurrent('Chart.Radar', async ({ task }) => {
    const Component = () => (
      <Chart.Radar
        data={radarData}
        groupKey='categories'
        plotHeight={200}
        plotWidth={300}
        showDots={true}
        showXAxis={false}
        patterns
      />
    );

    await expect(await snapshot(<Component />)).toMatchImageSnapshot(task);
  });
  test.concurrent('Chart.ScatterPlot', async ({ task }) => {
    const Component = () => (
      <Chart.ScatterPlot
        data={cloudData}
        groupKey='x'
        plotHeight={200}
        plotWidth={300}
        showXAxis={false}
        patterns
      />
    );

    await expect(await snapshot(<Component />)).toMatchImageSnapshot(task);
  });
});

describe('Cigarette chart', () => {
  beforeEach(cleanup);

  test.concurrent('Should render Cigarette', async ({ task }) => {
    const data = {
      a: 3524,
      b: 1344,
      c: 6135,
      d: 1456,
      e: 1823,
    };

    const Component = () => {
      return (
        <Flex gap={8}>
          <Chart.Cigarette
            data={data}
            plotWidth={280}
            header={
              <Text size={700} bold>
                Total
              </Text>
            }
            showLegend={true}
            tooltipTitle='Some title for tooltip'
            showTotalInTooltip={true}
          />

          <Chart.Cigarette
            data={data}
            plotHeight={200}
            invertAxis={false}
            header={
              <Text size={700} bold>
                Total
              </Text>
            }
            showLegend={true}
            tooltipViewType='single'
          />
        </Flex>
      );
    };

    await expect(await snapshot(<Component />)).toMatchImageSnapshot(task);
  });
});
