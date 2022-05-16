import React from 'react';
import { scaleLinear, scaleBand } from 'd3-scale';
import { testing, shared as testsShared, snapshot } from '@semcore/jest-preset-ui';
const { render, fireEvent, cleanup } = testing;
const { shouldSupportClassName, shouldSupportRef } = testsShared;
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
  Tooltip,
  RadialTree,
  Line,
  Donut,
  HorizontalBar,
  GroupBar,
  minMax,
  Area,
  StackedArea,
} from '../src';
import { getIndexFromData } from '../src/utils';
// eslint-disable-next-line import/no-extraneous-dependencies
import { curveCardinal } from 'd3-shape';
import { Flex, Box } from '@semcore/flex-box';
import resolveColor from '@semcore/utils/lib/color';
import { Text } from '@semcore/typography';
import DropdownMenu from '@semcore/dropdown-menu';
import Button from '@semcore/button';
import FileExportXS from '@semcore/icon/FileExport/m';
import Checkbox from '@semcore/checkbox';
import LikeM from '@semcore/icon/Like/m';

const xScale = scaleLinear().range([10, 100]).domain([0, 10]);

const yScale = scaleLinear().range([100, 10]).domain([0, 10]);

const data = [...Array(10).keys()].map((d, i) => ({
  x: i,
  y: Math.abs(Math.sin(Math.exp(i))) * i,
}));

const PlotTest = React.forwardRef((props, ref) => (
  <Plot ref={ref} data={data} scale={[xScale, yScale]} width={100} height={100} {...props} />
));

describe('Plot', () => {
  shouldSupportClassName(PlotTest);
  shouldSupportRef(PlotTest);

  test('Should support render null', () => {
    const { queryByText } = render(<Plot>Test</Plot>);
    expect(queryByText(/Test/)).toBeNull();
  });
});

describe('YAxis', () => {
  afterEach(cleanup);

  shouldSupportClassName(YAxis, PlotTest);
  shouldSupportRef(YAxis, PlotTest);

  test('Should support call children function for Grid how many ticks are passed', () => {
    expect.assertions(2);

    render(
      <Plot data={data} scale={[xScale, yScale]} width={100} height={100}>
        <YAxis ticks={[0, 1]}>
          <YAxis.Grid>
            {(props) => {
              expect(props).toBeTruthy();
              return props;
            }}
          </YAxis.Grid>
        </YAxis>
      </Plot>,
    );
  });

  test('Should support call children function for Ticks how many ticks are passed', () => {
    expect.assertions(2);

    render(
      <Plot data={data} scale={[xScale, yScale]} width={100} height={100}>
        <YAxis ticks={[0, 1]}>
          <YAxis.Ticks>
            {(props) => {
              expect(props).toBeTruthy();
              return props;
            }}
          </YAxis.Ticks>
        </YAxis>
      </Plot>,
    );
  });

  test('should support set data-ui-name for Line.Ticks', () => {
    const { queryByTestId } = render(
      <Plot data={data} scale={[xScale, yScale]} width={100} height={100}>
        <YAxis ticks={[0]}>
          <YAxis.Ticks data-testid="test" />
        </YAxis>
      </Plot>,
    );
    expect(queryByTestId('test').attributes['data-ui-name']).toBeTruthy();
    expect(queryByTestId('test').attributes['data-ui-name'].value).toBe('Axis.Ticks');
  });

  test('should support change tag YAxis.Ticks', () => {
    const { queryByTestId } = render(
      <Plot data={data} scale={[xScale, yScale]} width={100} height={100}>
        <YAxis ticks={[0]}>
          <YAxis.Ticks data-testid="test" tag="foreignObject" />
        </YAxis>
      </Plot>,
    );
    expect(queryByTestId('test').tagName).toBe('foreignObject');
  });
});

describe('XAxis', () => {
  afterEach(cleanup);

  shouldSupportClassName(XAxis, PlotTest);
  shouldSupportRef(XAxis, PlotTest);

  test('should support hover for custom XAxis.Ticks', () => {
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => cb());
    // const bisect = bisector((d) => d.x).center;
    class EventEmitter {
      emit() {}
      subscribe() {}
    }
    const eventEmitter = new EventEmitter();
    eventEmitter.emit = jest.fn();
    const { getAllByTestId } = render(
      <Plot
        data={data}
        scale={[xScale, yScale]}
        width={100}
        height={130}
        eventEmitter={eventEmitter}
      >
        <XAxis>
          <XAxis.Ticks tag="foreignObject" width="12" height="12">
            {() => ({
              children: (
                <svg viewBox="0 0 12 12" width="12" height="12" data-testid="tick">
                  <path
                    xmlns="http://www.w3.org/2000/svg"
                    d="M9,0 L3,0 C1.344,0 0,1.343 0,3 L0,6 C0,7.657 1.344,9 3,9 L3,11.323 C3,11.925 3.729,12.227 4.154,11.801 L6.955,9 L9,9 C10.656,9 12,7.657 12,6 L12,3 C12,1.343 10.656,0 9,0"
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
    window.requestAnimationFrame.mockRestore();
  });
});

describe('utils', () => {
  test('should support getIndexFromData for Line, Bar chart', () => {
    const data = [
      { x: 1, y: 'test' },
      { x: 2, y: 'describe' },
    ];
    const yScale = scaleBand()
      .range([100, 10])
      .domain(data.map((d) => d.name));

    expect(getIndexFromData(data, xScale, 'x', 2)).toBe(1);
    expect(getIndexFromData(data, yScale, 'y', 'test')).toBe(0);
  });
});

describe('Area chart', () => {
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

  test('should render curve Area chart correctly', async () => {
    const component = (
      <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
        <YAxis ticks={yScale.ticks()}>
          <YAxis.Ticks />
          <YAxis.Grid />
        </YAxis>
        <XAxis>
          <XAxis.Ticks />
        </XAxis>
        <Area x="time" y="stack1" curve={curveCardinal} duration={0}>
          <Area.Dots display />
        </Area>
      </Plot>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('should render Stacked Area chart without data correctly', async () => {
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
        <StackedArea x="time">
          <StackedArea.Area y="stack1" duration={0}>
            <StackedArea.Area.Null />
            <StackedArea.Area.Dots />
          </StackedArea.Area>
          <StackedArea.Area y="stack2" color="#3AB011" duration={0}>
            <StackedArea.Area.Null />
            <StackedArea.Area.Dots />
          </StackedArea.Area>
          <StackedArea.Area y="stack3" color="#FF8E29" duration={0}>
            <StackedArea.Area.Null />
            <StackedArea.Area.Dots />
          </StackedArea.Area>
        </StackedArea>
      </Plot>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('should render curve Stacked Area chart with dots correctly', async () => {
    const component = (
      <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
        <YAxis>
          <YAxis.Ticks />
          <YAxis.Grid />
        </YAxis>
        <XAxis>
          <XAxis.Ticks />
        </XAxis>
        <StackedArea x="time">
          <StackedArea.Area y="stack1" curve={curveCardinal} duration={0}>
            <StackedArea.Area.Dots display />
          </StackedArea.Area>
          <StackedArea.Area y="stack2" color="#3AB011" curve={curveCardinal} duration={0}>
            <StackedArea.Area.Dots display />
          </StackedArea.Area>
          <StackedArea.Area y="stack3" color="#FFA318" curve={curveCardinal} duration={0}>
            <StackedArea.Area.Dots display />
          </StackedArea.Area>
        </StackedArea>
      </Plot>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });
});

describe('Venn', () => {
  shouldSupportRef(Venn, PlotTest);
});

describe('Bar chart', () => {
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

  const xScale = scaleBand()
    .range([MARGIN, width - MARGIN])
    .domain(data.map((d) => d.time))
    .paddingInner(0.4)
    .paddingOuter(0.2);

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 15]);

  test('should render Bar chart correctly', async () => {
    const component = (
      <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
        <YAxis>
          <YAxis.Ticks />
          <YAxis.Grid />
        </YAxis>
        <XAxis>
          <XAxis.Ticks />
        </XAxis>
        <Bar x="time" y="stack1" duration={0} />
      </Plot>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('should render Bar chart correctly', async () => {
    const component = (
      <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
        <YAxis>
          <YAxis.Ticks />
          <YAxis.Grid />
        </YAxis>
        <XAxis>
          <XAxis.Ticks />
        </XAxis>
        <StackBar x="time">
          <StackBar.Bar y="stack1" duration={0} />
          <StackBar.Bar y="stack2" color={colors['blue-02']} duration={0} />
        </StackBar>
      </Plot>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('should not cut content on right with left margin', async () => {
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
          <Bubble x="x" y="y" value="value" />
        </Plot>
        <br />
        <br />
        <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
          <YAxis>
            <YAxis.Grid />
          </YAxis>
          <ScatterPlot x="x" y="y" value="value" r={30} />
        </Plot>
      </>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });
});
describe('d3 charts visual regression', () => {
  test('should render area-without-data', async () => {
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
          <Tooltip tag={HoverLine} x="x" wMin={100}>
            {({ xIndex }) => {
              return {
                children: (
                  <>
                    <Tooltip.Title>{data[xIndex].x}</Tooltip.Title>
                    <Flex justifyContent="space-between">
                      <Tooltip.Dot mr={4}>Line</Tooltip.Dot>
                      <Text bold>{data[xIndex].y ?? 'n/a'}</Text>
                    </Flex>
                  </>
                ),
              };
            }}
          </Tooltip>
          <Area x="x" y="y">
            <Area.Null />
            <Area.Dots />
          </Area>
        </Plot>
      );
    };

    expect(await snapshot(<Component />)).toMatchImageSnapshot();
  });

  test('should render area', async () => {
    function formatDate(value, options) {
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
              {({ value }) => ({
                children: formatDate(value, {
                  month: 'short',
                  day: 'numeric',
                }),
              })}
            </XAxis.Ticks>
          </XAxis>
          <Area x="time" y="line" curve={curveCardinal}>
            <Area.Dots display />
          </Area>
        </Plot>
      );
    };

    expect(await snapshot(<Component />)).toMatchImageSnapshot();
  });

  test('should render bar-group', async () => {
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
          <Tooltip tag={HoverRect} x="category" wMin={100}>
            {({ xIndex }) => ({
              children: (
                <>
                  <Tooltip.Title>{data[xIndex].category}</Tooltip.Title>
                  <Flex justifyContent="space-between">
                    <Tooltip.Dot mr={4}>Bar 1</Tooltip.Dot>
                    <Text bold>{data[xIndex].bar1}</Text>
                  </Flex>
                  <Flex mt={2} justifyContent="space-between">
                    <Tooltip.Dot mr={4} color={colors['green-02']}>
                      Bar 2
                    </Tooltip.Dot>
                    <Text bold>{data[xIndex].bar2}</Text>
                  </Flex>
                </>
              ),
            })}
          </Tooltip>
          <GroupBar x="category">
            <GroupBar.Bar y="bar1" />
            <GroupBar.Bar y="bar2" color={colors['green-02']} />
          </GroupBar>
        </Plot>
      );
    };

    expect(await snapshot(<Component />)).toMatchImageSnapshot();
  });

  test('should render bar-negative', async () => {
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
          <Tooltip tag={HoverRect} x="category" wMin={100}>
            {({ xIndex }) => {
              return {
                children: (
                  <>
                    <Tooltip.Title>{data[xIndex].category}</Tooltip.Title>
                    <Flex justifyContent="space-between">
                      <Tooltip.Dot mr={4} color={colors['green-02']}>
                        Positive
                      </Tooltip.Dot>
                      <Text bold>{data[xIndex].bar1}</Text>
                    </Flex>
                    <Flex justifyContent="space-between" mt={2}>
                      <Tooltip.Dot mr={4} color={colors['orange-04']}>
                        Negative
                      </Tooltip.Dot>
                      <Text bold>{data[xIndex].bar2}</Text>
                    </Flex>
                  </>
                ),
              };
            }}
          </Tooltip>
          <Bar x="category" y="bar1" color={colors['green-02']} />
          <Bar x="category" y="bar2" color={colors['orange-04']} />
          <XAxis position={0} />
        </Plot>
      );
    };

    expect(await snapshot(<Component />)).toMatchImageSnapshot();
  });

  test('should render bar-trend', async () => {
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

      const xScale = scaleBand()
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
          <HoverLine x="category" />
          <HoverRect x="category" />
          <Bar x="category" y="bar" />
          <Line
            x="category"
            y="bar"
            color={resolveColor('wall')}
            style={{ strokeWidth: 3, strokeDasharray: 5 }}
          >
            <Line.Dots display />
          </Line>
        </Plot>
      );
    };

    expect(await snapshot(<Component />)).toMatchImageSnapshot();
  });

  test('should render bar', async () => {
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
          <Bar x="category" y="bar" />
        </Plot>
      );
    };

    expect(await snapshot(<Component />)).toMatchImageSnapshot();
  });

  test('should render bar-background', async () => {
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
          <Tooltip tag={HoverRect} y="category" wMin={100}>
            {({ yIndex }) => {
              return {
                children: (
                  <>
                    <Tooltip.Title>{data[yIndex].category}</Tooltip.Title>
                    <Flex justifyContent="space-between">
                      <Tooltip.Dot mr={4}>Bar</Tooltip.Dot>
                      <Text bold>{data[yIndex].bar}</Text>
                    </Flex>
                  </>
                ),
              };
            }}
          </Tooltip>
          <HorizontalBar x="bar" y="category">
            <HorizontalBar.Background />
          </HorizontalBar>
        </Plot>
      );
    };

    expect(await snapshot(<Component />)).toMatchImageSnapshot();
  });

  test('should render bar-horizontal-group', async () => {
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
          <Tooltip tag={HoverRect} y="category" wMin={100}>
            {({ yIndex }) => {
              return {
                children: (
                  <>
                    <Tooltip.Title>{data[yIndex].category}</Tooltip.Title>
                    <Flex justifyContent="space-between">
                      <Tooltip.Dot mr={4}>Bar 1</Tooltip.Dot>
                      <Text bold>{data[yIndex].bar1}</Text>
                    </Flex>
                    <Flex mt={2} justifyContent="space-between">
                      <Tooltip.Dot mr={4} color={colors['green-02']}>
                        Bar 2
                      </Tooltip.Dot>
                      <Text bold>{data[yIndex].bar2}</Text>
                    </Flex>
                  </>
                ),
              };
            }}
          </Tooltip>
          <GroupBar y="category">
            <GroupBar.HorizontalBar x="bar1" />
            <GroupBar.HorizontalBar x="bar2" color={colors['green-02']} />
          </GroupBar>
        </Plot>
      );
    };

    expect(await snapshot(<Component />)).toMatchImageSnapshot();
  });

  test('should render bar-horizontal', async () => {
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
          <Tooltip tag={HoverRect} y="category" wMin={100}>
            {({ yIndex }) => {
              return {
                children: (
                  <>
                    <Tooltip.Title>{data[yIndex].category}</Tooltip.Title>
                    <Flex justifyContent="space-between">
                      <Tooltip.Dot mr={4}>Bar</Tooltip.Dot>
                      <Text bold>{data[yIndex].bar}</Text>
                    </Flex>
                  </>
                ),
              };
            }}
          </Tooltip>
          <HorizontalBar x="bar" y="category" />
        </Plot>
      );
    };

    expect(await snapshot(<Component />)).toMatchImageSnapshot();
  });

  test('should render bar-label', async () => {
    const data = [...Array(5).keys()].map((d, i) => ({
      category: `Category ${i}`,
      bar: i + 10 * Math.abs(Math.sin(Math.exp(i))),
    }));

    const Component: React.FC = () => {
      const MARGIN = 40;
      const width = 500;
      const height = 300;

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
          <HorizontalBar x="bar" y="category">
            {({ value, x, y, width, height }) => {
              return {
                children: (
                  <text
                    x={x + width + 16}
                    y={y + height / 2}
                    textAnchor="start"
                    alignmentBaseline="middle"
                    fill={resolveColor('gray60')}
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

    expect(await snapshot(<Component />)).toMatchImageSnapshot();
  });

  test('should render bubble', async () => {
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
          <Bubble x="x" y="y" value="value" />
          <Tooltip>
            {({ xIndex }) => {
              return {
                children: (
                  <>
                    <Tooltip.Title>Data</Tooltip.Title>
                    <Text tag="div">X axis {data[xIndex].x}</Text>
                    <Text tag="div">Y axis {data[xIndex].y}</Text>
                    <Text tag="div">Value {data[xIndex].value}</Text>
                  </>
                ),
              };
            }}
          </Tooltip>
        </Plot>
      );
    };

    expect(await snapshot(<Component />)).toMatchImageSnapshot();
  });

  test('should render custom-color', async () => {
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
          <Bubble data={data} x="x" y="y" value="value" label="label" color="color" />
          <Tooltip>
            {({ xIndex }) => {
              return {
                children: (
                  <>
                    <Tooltip.Title>Data</Tooltip.Title>
                    <Text tag="div">X axis {data[xIndex].x}</Text>
                    <Text tag="div">Y axis {data[xIndex].y}</Text>
                    <Text tag="div">Value {data[xIndex].value}</Text>
                  </>
                ),
              };
            }}
          </Tooltip>
        </Plot>
      );
    };

    expect(await snapshot(<Component />)).toMatchImageSnapshot();
  });

  test('should render axis-grid', async () => {
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
          <Line x="x" y="y" />
        </Plot>
      );
    };

    expect(await snapshot(<Component />)).toMatchImageSnapshot();
  });

  test('should render axis-ticks', async () => {
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
              {({ value }) => ({
                children: yScale.tickFormat(5, '+%')(value),
              })}
            </YAxis.Ticks>
          </YAxis>
          <Line x="x" y="y" />
        </Plot>
      );
    };

    expect(await snapshot(<Component />)).toMatchImageSnapshot();
  });

  test('should render axis-titles', async () => {
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
            <YAxis.Title>YAxis title</YAxis.Title>
          </YAxis>
          <XAxis>
            <XAxis.Ticks />
            <XAxis.Title>XAxis title</XAxis.Title>
          </XAxis>
          <Bar x="category" y="bar" />
        </Plot>
      );
    };

    expect(await snapshot(<Component />)).toMatchImageSnapshot();
  });

  test('should render axis', async () => {
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
          <Line x="x" y="y" />
        </Plot>
      );
    };

    expect(await snapshot(<Component />)).toMatchImageSnapshot();
  });

  test('should render export-in-image', async () => {
    const EXPORTS = ['PNG', 'JPEG', 'WEBP'];

    const data = Array(20)
      .fill({})
      .map((d, i) => ({
        x: i,
        y: Math.abs(Math.sin(Math.exp(i))) * 10,
      }));

    function getSVGString(svgNode) {
      svgNode.setAttribute('xlink', 'http://www.w3.org/1999/xlink');
      const cssStyleText = getCSSStyles(svgNode);
      appendCSS(cssStyleText, svgNode);

      const serializer = new XMLSerializer();
      let svgString = serializer.serializeToString(svgNode);
      svgString = svgString.replace(/(\w+)?:?xlink=/g, 'xmlns:xlink='); // Fix root xlink without namespace
      svgString = svgString.replace(/NS\d+:href/g, 'xlink:href'); // Safari NS namespace fix

      return svgString;

      function getCSSStyles(parentElement) {
        const selectorTextArr = [];

        for (let c = 0; c < parentElement.classList.length; c++) {
          if (!contains('.' + parentElement.classList[c], selectorTextArr))
            selectorTextArr.push('.' + parentElement.classList[c]);
        }

        // Add Children element Ids and Classes to the list
        const nodes = parentElement.getElementsByTagName('*');
        for (let i = 0; i < nodes.length; i++) {
          const id = nodes[i].id;
          if (!contains('#' + id, selectorTextArr)) selectorTextArr.push('#' + id);

          const classes = nodes[i].classList;
          for (let c = 0; c < classes.length; c++)
            if (!contains('.' + classes[c], selectorTextArr))
              selectorTextArr.push('.' + classes[c]);
        }

        // Extract CSS Rules
        let extractedCSSText = '';
        for (let i = 0; i < document.styleSheets.length; i++) {
          const s = document.styleSheets[i];

          try {
            if (!s.cssRules) continue;
          } catch (e) {
            if (e.name !== 'SecurityError') throw e; // for Firefox
            continue;
          }

          const cssRules = s.cssRules;
          for (let r = 0; r < cssRules.length; r++) {
            if (
              cssRules[r].selectorText &&
              selectorTextArr.some((s) => cssRules[r].selectorText.includes(s))
            )
              extractedCSSText += cssRules[r].cssText;
          }
        }

        return extractedCSSText;

        function contains(str, arr) {
          return arr.indexOf(str) !== -1;
        }
      }

      function appendCSS(cssText, element) {
        const styleElement = document.createElement('style');
        styleElement.setAttribute('type', 'text/css');
        styleElement.innerHTML = cssText;
        const refNode = element.hasChildNodes() ? element.children[0] : null;
        element.insertBefore(styleElement, refNode);
      }
    }

    function svgString2Image(svgString, width, height, format, callback) {
      format = format ? format : 'png';
      const imgsrc = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString)));

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      canvas.width = width;
      canvas.height = height;

      const image = new Image();
      image.onload = function () {
        context.clearRect(0, 0, width, height);
        context.drawImage(image, 0, 0, width, height);

        const img = canvas.toDataURL(`image/${format}`);
        callback(img);
      };

      image.src = imgsrc;
    }

    const Component: React.FC = () => {
      const [, updateVisible] = React.useState(false);
      const [linkElements, updateLinkElements] = React.useState(
        EXPORTS.map((name) => ({ key: name, children: name })),
      );

      const svg = React.createRef();
      const download = React.createRef();
      const MARGIN = 40;
      const width = 500;
      const height = 300;

      const xScale = scaleLinear()
        .range([MARGIN, width - MARGIN])
        .domain(minMax(data, 'x'));

      const yScale = scaleLinear()
        .range([height - MARGIN, MARGIN])
        .domain([0, 10]);

      React.useEffect(() => {
        const svgElement = svg.current;
        const svgString = getSVGString(svgElement);
        EXPORTS.forEach((name, ind) => {
          const format = name.toLowerCase();
          svgString2Image(svgString, 2 * width, 2 * height, format, save);
          function save(image) {
            linkElements[ind] = {
              ...linkElements[ind],
              download: `image.${format}`,
              href: image,
            };

            updateLinkElements([...linkElements]);
          }
        });
      }, []);
      return (
        <Flex>
          <Plot ref={svg} data={data} scale={[xScale, yScale]} width={width} height={height}>
            <YAxis ticks={yScale.ticks()}>
              <YAxis.Ticks />
              <YAxis.Grid />
            </YAxis>
            <XAxis ticks={xScale.ticks()}>
              <XAxis.Ticks />
            </XAxis>
            <Line x="x" y="y">
              <Line.Dots display />
            </Line>
          </Plot>
          <DropdownMenu onVisibleChange={updateVisible}>
            <DropdownMenu.Trigger tag={Button}>
              <Button.Addon tag={FileExportXS} />
              <Button.Text>Export</Button.Text>
            </DropdownMenu.Trigger>
            <DropdownMenu.Popper wMax="257px">
              <DropdownMenu.List ref={download}>
                {EXPORTS.map((name, ind) => (
                  <DropdownMenu.Item tag="a" {...linkElements[ind]} />
                ))}
              </DropdownMenu.List>
            </DropdownMenu.Popper>
          </DropdownMenu>
        </Flex>
      );
    };

    expect(await snapshot(<Component />)).toMatchImageSnapshot();
  });

  test('should render legend', async () => {
    const data = [...Array(10).keys()].map((d, i) => ({
      x: i,
      y: Math.abs(Math.sin(Math.exp(i))) * i,
      y2: Math.abs(Math.sin(Math.exp(i))) * (i + 2),
    }));

    const Component: React.FC = () => {
      const [dataLegend, updateDataLegend] = React.useState(
        Object.keys(data[0])
          .filter((name) => name !== 'x')
          .map((name) => ({ name, checked: true, opacity: false })),
      );

      const MAP_THEME = {
        y: 'orange',
        y2: 'green',
      };
      const width = 500;
      const height = 300;
      const MARGIN = 40;
      const xScale = scaleLinear()
        .range([MARGIN, width - MARGIN])
        .domain(minMax(data, 'x'));

      const yScale = scaleLinear()
        .range([height - MARGIN, MARGIN])
        .domain(dataLegend.find((item) => item.checked) ? [0, 10] : []);

      const handleChange = (name) => (checked) => {
        const newDataLegend = dataLegend.map((item) => {
          if (item.name === name) {
            return { ...item, checked };
          }
          return { ...item, opacity: checked };
        });

        updateDataLegend(newDataLegend);
      };

      const handleMouseEnter = (name) => () => {
        const activeItem = dataLegend.find((item) => item.name === name);
        if (!activeItem.checked) return;
        updateDataLegend((data) =>
          data.map((item) => {
            if (item.name !== name) return { ...item, opacity: true };
            return item;
          }),
        );
      };
      const handleMouseLeave = () => {
        updateDataLegend(dataLegend.map((item) => ({ ...item, opacity: false })));
      };

      return (
        <>
          <Box>
            {dataLegend.map((item) => {
              return (
                <Checkbox
                  key={item.name}
                  onMouseEnter={handleMouseEnter(item.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Checkbox.Value
                    theme={MAP_THEME[item.name]}
                    checked={item.checked}
                    onChange={handleChange(item.name)}
                  />
                  <Checkbox.Text pr={3}>{item.name}</Checkbox.Text>
                </Checkbox>
              );
            })}
          </Box>
          <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
            <YAxis>
              <YAxis.Ticks />
              <YAxis.Grid />
            </YAxis>
            <XAxis>
              <XAxis.Ticks />
            </XAxis>
            {dataLegend.map(
              (item) =>
                item.checked && (
                  <Line
                    key={item.name}
                    x="x"
                    y={item.name}
                    color={MAP_THEME[item.name]}
                    opacity={item.opacity ? 0.3 : 1}
                  />
                ),
            )}
          </Plot>
        </>
      );
    };

    expect(await snapshot(<Component />)).toMatchImageSnapshot();
  });

  test('should render margin', async () => {
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
          <Line x="x" y="y" />
        </Plot>
      );
    };

    expect(await snapshot(<Component />)).toMatchImageSnapshot();
  });

  test('should render donut-without-data', async () => {
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
            <Donut.Pie dataKey="a" />
            <Donut.Pie dataKey="b" color={colors['green-02']} />
            <Donut.Pie dataKey="c" color={colors['pink-03']} />
          </Donut>
        </Plot>
      );
    };

    expect(await snapshot(<Component />)).toMatchImageSnapshot();
  });

  test('should render donut', async () => {
    const data = {
      a: 3,
      b: 1,
      c: 2,
    };

    const Component: React.FC = () => {
      return (
        <Plot width={300} height={300} data={data}>
          <Donut innerRadius={100}>
            <Donut.Pie dataKey="a" name="Pie 1" />
            <Donut.Pie dataKey="b" color={colors['green-02']} name="Pie 2" />
            <Donut.Pie dataKey="c" color={colors['violet-04']} name="Pie 3" />
            <Donut.Label>Example</Donut.Label>
          </Donut>
          <Tooltip>
            {({ dataKey, name }) => {
              return {
                children: (
                  <>
                    <Tooltip.Title>{name}</Tooltip.Title>
                    <Flex justifyContent="space-between">
                      <Text bold>{data[dataKey]}</Text>
                    </Flex>
                  </>
                ),
              };
            }}
          </Tooltip>
        </Plot>
      );
    };

    expect(await snapshot(<Component />)).toMatchImageSnapshot();
  });

  test('should render semi-donut-with-one-data', async () => {
    const data = {
      speed: 3,
      other: 200,
    };

    const Component: React.FC = () => {
      return (
        <Plot width={300} height={150} data={data}>
          <Donut halfsize innerRadius={100}>
            <Donut.Pie dataKey="speed" />
            <Donut.Pie dataKey="other" color="#C4C7CF" />
            <Donut.Label>
              <Text tag="tspan" x="0" dy="-1.2em" fill="#6C6E79" size={400}>
                Keyword volume
              </Text>
            </Donut.Label>
          </Donut>
        </Plot>
      );
    };

    expect(await snapshot(<Component />)).toMatchImageSnapshot();
  });

  test('should render semi-donut', async () => {
    const data = {
      a: 3,
      b: 1,
      c: 2,
    };

    const Component: React.FC = () => {
      return (
        <Plot width={300} height={150} data={data}>
          <Donut halfsize innerRadius={100}>
            <Donut.Pie dataKey="a" name="Pie 1" />
            <Donut.Pie dataKey="b" color={colors['green-02']} name="Pie 2" />
            <Donut.Pie dataKey="c" color={colors['violet-04']} name="Pie 3" />
            <Donut.Label>
              <Text tag="tspan" x="0" dy="-1.2em" fill="#191b23" size={600}>
                71,240
              </Text>
              <Text tag="tspan" x="0" dy="1.2em" fill="#6c6e79" size={200}>
                Engagements
              </Text>
            </Donut.Label>
          </Donut>
          <Tooltip>
            {({ dataKey, name }) => {
              return {
                children: (
                  <>
                    <Tooltip.Title>{name}</Tooltip.Title>
                    <Flex justifyContent="space-between">
                      <Text bold>{data[dataKey]}</Text>
                    </Flex>
                  </>
                ),
              };
            }}
          </Tooltip>
        </Plot>
      );
    };

    expect(await snapshot(<Component />)).toMatchImageSnapshot();
  });

  test('should render line', async () => {
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
            <YAxis.Ticks />
            <YAxis.Grid />
          </YAxis>
          <XAxis>
            <XAxis.Ticks />
          </XAxis>
          <Line x="x" y="y">
            <Line.Dots display />
          </Line>
        </Plot>
      );
    };

    expect(await snapshot(<Component />)).toMatchImageSnapshot();
  });

  test('should render radial-tree-custom-center', async () => {
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
          <RadialTree centralMargin={85} color="#AB6CFE">
            <RadialTree.Radian>
              <RadialTree.Radian.Label />
              <RadialTree.Radian.Line />
              <RadialTree.Radian.Cap />
              <RadialTree.Radian.Icon />
            </RadialTree.Radian>
            <circle r={60} cx={width / 2} cy={height / 2} fill="#AB6CFE" />
            <RadialTree.Title fill="#FFFFFF">Sleeping</RadialTree.Title>
          </RadialTree>
        </Plot>
      );
    };

    expect(await snapshot(<Component />)).toMatchImageSnapshot();
  });

  test('should render radial-tree-multicolor', async () => {
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

    expect(await snapshot(<Component />)).toMatchImageSnapshot();
  });

  test('should render radial-tree-multiline-text', async () => {
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
          <RadialTree color="#AB6CFE">
            <RadialTree.Radian>
              <RadialTree.Radian.Label />
              <RadialTree.Radian.Line />
              <RadialTree.Radian.Cap />
              <RadialTree.Radian.Icon />
            </RadialTree.Radian>
            <RadialTree.Title fontSize={lineHeight} fill="#AB6CFE">
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

    expect(await snapshot(<Component />)).toMatchImageSnapshot();
  });

  test('should render radial-tree', async () => {
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
          <RadialTree color="#AB6CFE">
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

    expect(await snapshot(<Component />)).toMatchImageSnapshot();
  });

  test('should render custom-color-values', async () => {
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
          <ScatterPlot x="x" y="y1" value="value" color="#2BB3FF" valueColor="#008ff8" />
          <ScatterPlot x="x" y="y2" value="value" color="#59DDAA" valueColor="#00C192" />
          <Tooltip>
            {({ xIndex, x, y, value }) => {
              return {
                children: (
                  <>
                    <Tooltip.Title>Data</Tooltip.Title>
                    <Text tag="div">X axis {data[xIndex][x]}</Text>
                    <Text tag="div">Y axis {data[xIndex][y]}</Text>
                    <Text tag="div">Value {data[xIndex][value]}</Text>
                  </>
                ),
              };
            }}
          </Tooltip>
        </Plot>
      );
    };

    expect(await snapshot(<Component />)).toMatchImageSnapshot();
  });

  test('should render custom-color', async () => {
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
          <ScatterPlot x="x" y="y1" color="#2BB3FF" />
          <ScatterPlot x="x" y="y2" color="#59DDAA" />
          <Tooltip>
            {({ xIndex, x, y, color }) => {
              return {
                children: (
                  <>
                    <Tooltip.Dot color={color}>Data</Tooltip.Dot>
                    <Text tag="div">X axis {data[xIndex][x]}</Text>
                    <Text tag="div">Y axis {data[xIndex][y]}</Text>
                  </>
                ),
              };
            }}
          </Tooltip>
        </Plot>
      );
    };

    expect(await snapshot(<Component />)).toMatchImageSnapshot();
  });

  test('should render scatterplot-values', async () => {
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
          <ScatterPlot x="x" y="y" value="value" />
          <Tooltip>
            {({ xIndex, x, y, value }) => {
              return {
                children: (
                  <>
                    <Tooltip.Title>Data</Tooltip.Title>
                    <Text tag="div">X axis {data[xIndex][x]}</Text>
                    <Text tag="div">Y axis {data[xIndex][y]}</Text>
                    <Text tag="div">Value {data[xIndex][value]}</Text>
                  </>
                ),
              };
            }}
          </Tooltip>
        </Plot>
      );
    };

    expect(await snapshot(<Component />)).toMatchImageSnapshot();
  });

  test('should render stacked-area-without-data', async () => {
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
          <Tooltip tag={HoverLine} x="time" wMin={100}>
            {({ xIndex }) => {
              return {
                children: (
                  <>
                    <Tooltip.Title>{data[xIndex].time}</Tooltip.Title>
                    <Flex justifyContent="space-between">
                      <Tooltip.Dot mr={4}>Stack 1</Tooltip.Dot>
                      <Text bold>{data[xIndex].stack1 ?? 'n/a'}</Text>
                    </Flex>
                    <Flex mt={2} justifyContent="space-between">
                      <Tooltip.Dot mr={4} color={colors['green-02']}>
                        Stack 2
                      </Tooltip.Dot>
                      <Text bold>{data[xIndex].stack2 ?? 'n/a'}</Text>
                    </Flex>
                    <Flex mt={2} justifyContent="space-between">
                      <Tooltip.Dot mr={4} color={colors['orange-04']}>
                        Stack 3
                      </Tooltip.Dot>
                      <Text bold>{data[xIndex].stack3 ?? 'n/a'}</Text>
                    </Flex>
                  </>
                ),
              };
            }}
          </Tooltip>
          <StackedArea x="time">
            <StackedArea.Area y="stack1">
              <StackedArea.Area.Null />
              <StackedArea.Area.Dots />
            </StackedArea.Area>
            <StackedArea.Area y="stack2" fill="#59DDAA50" color="#59DDAA">
              <StackedArea.Area.Null />
              <StackedArea.Area.Dots />
            </StackedArea.Area>
            <StackedArea.Area y="stack3" fill="#FF622D50" color="#FF622D">
              <StackedArea.Area.Null />
              <StackedArea.Area.Dots />
            </StackedArea.Area>
          </StackedArea>
        </Plot>
      );
    };

    expect(await snapshot(<Component />)).toMatchImageSnapshot();
  });

  test('should render bar-stack', async () => {
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
          <Tooltip tag={HoverRect} x="category" wMin={100}>
            {({ xIndex }) => {
              return {
                children: (
                  <>
                    <Tooltip.Title>{data[xIndex].category}</Tooltip.Title>
                    <Flex justifyContent="space-between">
                      <Tooltip.Dot mr={4}>Stack 1</Tooltip.Dot>
                      <Text bold>{data[xIndex].stack1}</Text>
                    </Flex>
                    <Flex mt={2} justifyContent="space-between">
                      <Tooltip.Dot mr={4} color={colors['blue-02']}>
                        Stack 2
                      </Tooltip.Dot>
                      <Text bold>{data[xIndex].stack2}</Text>
                    </Flex>
                    <Flex mt={2} justifyContent="space-between">
                      <Box mr={4}>Total</Box>
                      <Text bold>{data[xIndex].stack1 + data[xIndex].stack2}</Text>
                    </Flex>
                  </>
                ),
              };
            }}
          </Tooltip>
          <StackBar x="category">
            <StackBar.Bar y="stack1" />
            <StackBar.Bar y="stack2" color={colors['blue-02']} />
          </StackBar>
        </Plot>
      );
    };

    expect(await snapshot(<Component />)).toMatchImageSnapshot();
  });

  test('should render bar-horizontal-stack', async () => {
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
        .domain([0, 20]);

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
          <Tooltip tag={HoverRect} y="category" wMin={100}>
            {({ yIndex }) => {
              return {
                children: (
                  <>
                    <Tooltip.Title>{data[yIndex].category}</Tooltip.Title>
                    <Flex justifyContent="space-between">
                      <Tooltip.Dot mr={4}>Stack 1</Tooltip.Dot>
                      <Text bold>{data[yIndex].bar1}</Text>
                    </Flex>
                    <Flex mt={2} justifyContent="space-between">
                      <Tooltip.Dot mr={4} color={colors['blue-02']}>
                        Stack 2
                      </Tooltip.Dot>
                      <Text bold>{data[yIndex].bar2}</Text>
                    </Flex>
                    <Flex mt={2} justifyContent="space-between">
                      <Box mr={4}>Total</Box>
                      <Text bold>{data[yIndex].bar1 + data[yIndex].bar2}</Text>
                    </Flex>
                  </>
                ),
              };
            }}
          </Tooltip>
          <StackBar y="category">
            <StackBar.HorizontalBar x="bar1" />
            <StackBar.HorizontalBar x="bar2" color={colors['blue-02']} />
          </StackBar>
        </Plot>
      );
    };

    expect(await snapshot(<Component />)).toMatchImageSnapshot();
  });

  test('should render venn-custom-intersection', async () => {
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
            <Venn.Circle dataKey="G" />
            <Venn.Circle dataKey="F" color={colors['blue-03']} />
            <Venn.Circle dataKey="C" color={colors['orange-04']} />
            <Venn.Intersection dataKey="G/F" />
            <Venn.Intersection dataKey="G/C" />
            <Venn.Intersection dataKey="F/C" />
            <Venn.Intersection
              dataKey="G/F/C"
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

    expect(await snapshot(<Component />)).toMatchImageSnapshot();
  });

  test('should render venn-orientation', async () => {
    const orders = [
      (val1, val2) => val2.radius - val1.radius,
      (val1, val2) => val1.radius - val2.radius,
    ];

    const orientations = [Math.PI / 2, Math.PI];

    const data = {
      F: 5,
      S: 7,
      'F/S': 3,
    };

    const Component: React.FC = () => {
      const [orientation, changeOrientation] = React.useState(0);
      const [order, changeOrder] = React.useState(0);

      return (
        <Flex alignItems="center" direction="column">
          <Plot height={300} width={400} data={data}>
            <Venn orientation={orientations[orientation]} orientationOrder={orders[order]}>
              <Venn.Circle dataKey="F" />
              <Venn.Circle dataKey="S" color={colors['blue-03']} />
              <Venn.Intersection dataKey="F/S" />
            </Venn>
          </Plot>
          <Flex direction="row">
            <Button onClick={() => changeOrientation(Number(!orientation))} mr={2}>
              Change orientation
            </Button>
            <Button onClick={() => changeOrder(Number(!order))}>Change order</Button>
          </Flex>
        </Flex>
      );
    };

    expect(await snapshot(<Component />)).toMatchImageSnapshot();
  });

  test('should render venn', async () => {
    const data = {
      G: 200,
      F: 200,
      C: 500,
      U: 1,
      'G/F': 100,
      'G/C': 100,
      'F/C': 100,
      'G/F/C': 100,
    };

    const Component: React.FC = () => {
      return (
        <Plot height={300} width={400} data={data}>
          <Venn>
            <Venn.Circle dataKey="G" name="Good" />
            <Venn.Circle dataKey="F" name="Fast" color={colors['blue-03']} />
            <Venn.Circle dataKey="C" name="Cheap" color={colors['orange-04']} />
            <Venn.Circle dataKey="U" name="Unknown" color={colors['pink-03']} />
            <Venn.Intersection dataKey="G/F" name="Good & Fast" />
            <Venn.Intersection dataKey="G/C" name="Good & Cheap" />
            <Venn.Intersection dataKey="F/C" name="Fast & Cheap" />
            <Venn.Intersection dataKey="G/F/C" name="Good & Fast & Cheap" />
          </Venn>
          <Tooltip>
            {({ name, dataKey }) => {
              return {
                children: (
                  <>
                    <Tooltip.Title>{name}</Tooltip.Title>
                    <Text bold>{data[dataKey]}</Text>
                  </>
                ),
              };
            }}
          </Tooltip>
        </Plot>
      );
    };

    expect(await snapshot(<Component />)).toMatchImageSnapshot();
  });
});
