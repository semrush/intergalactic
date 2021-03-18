import React from 'react';
import { bisector } from 'd3-array';
import { scaleLinear, scaleBand } from 'd3-scale';
import { render, fireEvent, cleanup } from 'jest-preset-ui/testing';
import { shouldSupportClassName, shouldSupportRef } from 'jest-preset-ui/shared';
import { XYPlot, YAxis, XAxis } from '../src';
import { getIndexFromData } from '../src/utils';

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

const XYPlotTest = React.forwardRef((props, ref) => (
  <XYPlot ref={ref} data={data} scale={[xScale, yScale]} width={100} height={100} {...props} />
));

describe('XYPlot', () => {
  shouldSupportClassName(XYPlotTest);
  shouldSupportRef(XYPlotTest);

  test('Should support render null', () => {
    const { queryByText } = render(<XYPlot>Test</XYPlot>);
    expect(queryByText(/Test/)).toBeNull();
  });
});

describe('YAxis', () => {
  afterEach(cleanup);

  shouldSupportClassName(YAxis, XYPlotTest);
  shouldSupportRef(YAxis, XYPlotTest);

  test('Should support call children function for Grid how many ticks are passed', () => {
    expect.assertions(2);

    render(
      <XYPlot data={data} scale={[xScale, yScale]} width={100} height={100}>
        <YAxis ticks={[0, 1]}>
          <YAxis.Grid>
            {(props) => {
              expect(props).toBeTruthy();
              return props;
            }}
          </YAxis.Grid>
        </YAxis>
      </XYPlot>,
    );
  });

  test('Should support call children function for Ticks how many ticks are passed', () => {
    expect.assertions(2);

    render(
      <XYPlot data={data} scale={[xScale, yScale]} width={100} height={100}>
        <YAxis ticks={[0, 1]}>
          <YAxis.Ticks>
            {(props) => {
              expect(props).toBeTruthy();
              return props;
            }}
          </YAxis.Ticks>
        </YAxis>
      </XYPlot>,
    );
  });

  test('should support set data-ui-name for Line.Ticks', () => {
    const { queryByTestId } = render(
      <XYPlot data={data} scale={[xScale, yScale]} width={100} height={100}>
        <YAxis ticks={[0]}>
          <YAxis.Ticks data-testid="test" />
        </YAxis>
      </XYPlot>,
    );
    expect(queryByTestId('test').attributes['data-ui-name']).toBeTruthy();
    expect(queryByTestId('test').attributes['data-ui-name'].value).toBe('Axis.Ticks');
  });

  test('should support change tag YAxis.Ticks', () => {
    const { queryByTestId } = render(
      <XYPlot data={data} scale={[xScale, yScale]} width={100} height={100}>
        <YAxis ticks={[0]}>
          <YAxis.Ticks data-testid="test" tag="foreignObject" />
        </YAxis>
      </XYPlot>,
    );
    expect(queryByTestId('test').tagName).toBe('foreignObject');
  });
});

describe('XAxis', () => {
  afterEach(cleanup);

  shouldSupportClassName(XAxis, XYPlotTest);
  shouldSupportRef(XAxis, XYPlotTest);

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
      <XYPlot
        data={data}
        scale={[xScale, yScale]}
        width={100}
        height={130}
        eventEmitter={eventEmitter}
      >
        <XAxis>
          <XAxis.Ticks ticks={xScale.ticks()} tag="foreignObject" width="12" height="12">
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
      </XYPlot>,
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
