import React from 'react';
import { bisector } from 'd3-array';
import { scaleLinear, scaleBand } from 'd3-scale';
import { render, fireEvent, cleanup } from 'jest-preset-ui/testing';
import { shouldSupportClassName, shouldSupportRef } from 'jest-preset-ui/shared';
import { Plot, YAxis, XAxis, Venn } from '../src';
import { getIndexFromData } from '../src/utils';
import snapshot from 'jest-preset-ui/snapshot';
import { minMax, Area, StackedArea } from '@semcore/d3-chart';
import { curveCardinal } from 'd3-shape';

const xScale = scaleLinear()
  .range([10, 100])
  .domain([0, 10]);

const yScale = scaleLinear()
  .range([100, 10])
  .domain([0, 10]);

const data = [...Array(10).keys()].map((d, i) => ({
  x: i,
  y: Math.random().toFixed(1) * i,
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
    const bisect = bisector((d) => d.x).center;
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
    expect(eventEmitter.emit).toHaveBeenCalledTimes(1);
    // expect(bisect(data, eventEmitter.emit.mock.calls[0][1][0])).toBe(9);
    window.requestAnimationFrame.mockRestore();
  });
});

describe('utils', () => {
  test('should support getIndexFromData for Line, Bar chart', () => {
    const data = [{ x: 1, y: 'test' }, { x: 2, y: 'describe' }];
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
        <Area x="time" y="stack1" curve={curveCardinal}>
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
          <StackedArea.Area y="stack1">
            <StackedArea.Area.Null />
            <StackedArea.Area.Dots />
          </StackedArea.Area>
          <StackedArea.Area y="stack2" color="#3AB011">
            <StackedArea.Area.Null />
            <StackedArea.Area.Dots />
          </StackedArea.Area>
          <StackedArea.Area y="stack3" color="#FF8E29">
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
          <StackedArea.Area y="stack1" curve={curveCardinal}>
            <StackedArea.Area.Dots display />
          </StackedArea.Area>
          <StackedArea.Area y="stack2" color="#3AB011" curve={curveCardinal}>
            <StackedArea.Area.Dots display />
          </StackedArea.Area>
          <StackedArea.Area y="stack3" color="#FFA318" curve={curveCardinal}>
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
