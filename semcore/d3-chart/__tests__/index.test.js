import React from 'react';
import { scaleLinear } from 'd3-scale';
import { render, fireEvent, cleanup } from 'jest-preset-ui/testing';
import { shouldSupportClassName, shouldSupportRef } from 'jest-preset-ui/shared';
import { XYPlot, YAxis } from '../src';

const xScale = scaleLinear()
  .range([0, 100])
  .domain([0, 100]);

const yScale = scaleLinear()
  .range([100, 0])
  .domain([0, 100]);

const data = Array(10)
  .fill({})
  .map((d, i) => ({
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
});
