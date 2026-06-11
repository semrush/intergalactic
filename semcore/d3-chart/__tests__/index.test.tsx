import Icon from '@semcore/icon/Video/m';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { render, fireEvent, cleanup, queryAllByAttribute, queryByAttribute, userEvent } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach, vi, afterEach } from '@semcore/testing-utils/vitest';
import { scaleLinear, scaleBand } from 'd3-scale';
import React from 'react';

import {
  Plot,
  YAxis,
  XAxis,
  makeDataHintsContainer,
  Chart,
  ChartLegend,
  // @ts-ignore
} from '../src';
import { PlotA11yView } from '../src/a11y/PlotA11yView';
import { getIndexFromData } from '../src/utils';

const width = 500;
const height = 500;
const date = new Date();

const xScale = scaleLinear().range([10, 100]).domain([0, 10]);
const yScale = scaleLinear().range([100, 10]).domain([0, 10]);

const ChartOptions = {
  area: {
    data: Array(10)
      .fill({})
      .map(() => {
        return {
          time: new Date(date.setDate(date.getDate() + 5)),
          line: Math.random() * 10,
        };
      }),
  },
  bubble: {
    data: [
      { x: 2, y: 3, value: 5040, label: 'label 1' },
      { x: 1, y: 9, value: 40, label: 'label 2' },
      { x: 6, y: 2, value: 45634, label: 'label 3' },
      { x: 4, y: 7, value: 245, label: 'label 4' },
      { x: 9, y: 5, value: 7462, label: 'label 5' },
    ],
  },
  donut: {
    data: {
      a: 3,
      b: 1,
      c: 2,
    },
  },
  line: {
    data: Array(20)
      .fill({})
      .map((_, i) => ({
        x: i,
        y: Math.random() * 10,
      })),
  },
  radar: {
    data: {
      categories: ['Variable 1', 'Variable 2', 'Variable 3', 'Variable 4', 'Variable 5', 'Variable 6'],
      data_1: [1, 3, 5, 5, 9, 2],
      data_2: [5, 2, 1, 2, 7, 6],
    },
  },
  scatterPlot: {
    data: Array(20)
      .fill({})
      .map((_, i) => ({
        x: i,
        y: Math.random() * 10,
      })),
  },
  venn: {
    data: {
      'G': 200,
      'F': 200,
      'C': 500,
      'U': 1,
      'G/F': 100,
      'G/C': 100,
      'F/C': 100,
      'G/F/C': 100,
    },
    legendMap: {
      G: { label: 'Good' },
      F: { label: 'Fast' },
      C: { label: 'Clean' },
      U: { label: 'Uniq' },
    },
  },
};

const PlotTest = React.forwardRef((props, ref) => (
  <Plot ref={ref} data={ChartOptions.line.data} scale={[xScale, yScale]} width={100} height={100} {...props} />
));

describe('d3-chart Dependency imports', () => {
  runDependencyCheckTests('d3-chart');
});

describe('Plot', () => {
  beforeEach(cleanup);

  test.concurrent('Should support render null', () => {
    const { queryByText } = render(<Plot>Test</Plot>);
    expect(queryByText(/Test/)).toBeNull();
  });
});

describe('YAxis', () => {
  beforeEach(cleanup);

  test(
    'Should support call children function for Grid how many ticks are passed',
    () => {
      expect.assertions(2);

      render(
        <Plot data={ChartOptions.line.data} scale={[xScale, yScale]} width={100} height={100}>
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

  test(
    'Should support call children function for Ticks how many ticks are passed',
    () => {
      /* It's called 4 times since after the initial render, re-render is triggered to have an access to rootRef to calculate multiline lines */
      expect.assertions(4);

      render(
        <Plot data={ChartOptions.line.data} scale={[xScale, yScale]} width={100} height={100}>
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

  test('should support set data-ui-name for Line.Ticks', () => {
    const { queryByTestId } = render(
      <Plot data={ChartOptions.line.data} scale={[xScale, yScale]} width={100} height={100}>
        <YAxis ticks={[0]}>
          <YAxis.Ticks data-testid='test' />
        </YAxis>
      </Plot>,
    );
    expect((queryByTestId('test')!.attributes as any)['data-ui-name']).toBeTruthy();
    expect((queryByTestId('test')!.attributes as any)['data-ui-name'].value).toBe('Axis.Ticks');
  });

  test('should support change tag YAxis.Ticks', () => {
    const { queryByTestId } = render(
      <Plot data={ChartOptions.line.data} scale={[xScale, yScale]} width={100} height={100}>
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

  test.concurrent('should support hover for custom XAxis.Ticks', () => {
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => (cb as any)());
    // const bisect = bisector((d) => d.x).center;
    class EventEmitter {
      emit() { }
      subscribe() { }
    }

    const eventEmitter = new EventEmitter();
    eventEmitter.emit = vi.fn();
    const { getAllByTestId } = render(
      <Plot
        data={ChartOptions.line.data}
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

    // Keep fireEvent: this test asserts one exact mouseMove emission.
    fireEvent.mouseMove(getAllByTestId('tick')[9]);
    expect(eventEmitter.emit).toHaveBeenCalledTimes(2); // onMouseMoveRoot, onMouseLeaveChart
    (window.requestAnimationFrame as any).mockRestore();
  });
});

describe('utils', () => {
  beforeEach(cleanup);

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

describe('Focus skip to content after plot', () => {
  beforeEach(cleanup);

  test('nested case', async () => {
    const data = Array(20)
      .fill({})
      .map((d, i) => ({
        x: i,
        y: Math.abs(Math.sin(Math.exp(i))) * 10,
      }));
    const hints = makeDataHintsContainer();

    const PlotComponent: React.FC = () => {
      const triggerRef = React.useRef(null);
      const plotRef = React.useRef<HTMLDivElement>(null);

      return (
        <>
          <div ref={plotRef}>
            <PlotA11yView
              id='plotView'
              payload={data}
              plotRef={plotRef}
              plotLabel='plot label'
              locale='en'
              config={{}}
              hints={hints}
              triggerRef={triggerRef}
              onCloseHandler={() => {}}
            />
          </div>
          <div className='one'>
            <div className='two'>
              <div className='tree'>some text</div>
            </div>
          </div>
          <div>some data</div>
          <div className='one'>
            <div className='two' tabIndex={0} data-testid='focusableElement-1'>
              <div className='tree'>some text 2</div>
            </div>
          </div>
        </>
      );
    };

    const { getByTestId } = render(<PlotComponent />);

    await userEvent.keyboard('[Tab]');
    await userEvent.keyboard('[Tab]');
    await userEvent.keyboard('[Enter]');

    expect(getByTestId('focusableElement-1')).toHaveFocus();
  });

  test('nested and shifted case', async () => {
    const data = Array(20)
      .fill({})
      .map((d, i) => ({
        x: i,
        y: Math.abs(Math.sin(Math.exp(i))) * 10,
      }));
    const hints = makeDataHintsContainer();

    const PlotComponent: React.FC = () => {
      const triggerRef = React.useRef(null);
      const plotRef = React.useRef<HTMLDivElement>(null);

      return (
        <>
          <div ref={plotRef}>
            <PlotA11yView
              id='plotView'
              payload={data}
              plotRef={plotRef}
              plotLabel='plot label'
              locale='en'
              config={{}}
              hints={hints}
              triggerRef={triggerRef}
              onCloseHandler={() => {}}
            />
          </div>
          <div className='one'>
            <div className='two'>
              <div />
              <div />
              <div className='tree'>some text 3</div>
            </div>
          </div>
          <div>some data</div>
          <div className='one'>
            <div />
            <div />
            <div className='two' tabIndex={0} data-testid='focusableElement-2'>
              <div className='tree'>some text 4</div>
            </div>
          </div>
        </>
      );
    };

    const { getByTestId } = render(<PlotComponent />);

    await userEvent.keyboard('[Tab]');
    await userEvent.keyboard('[Tab]');
    await userEvent.keyboard('[Enter]');

    expect(getByTestId('focusableElement-2')).toHaveFocus();
  });
});

describe('Chart.Area', () => {
  beforeEach(cleanup);

  test.concurrent('should call onClickArea and return correct data index', async () => {
    const onClickHandler = vi.fn();

    const { container } = render(
      <Chart.Area
        groupKey='time'
        data={ChartOptions.area.data}
        plotWidth={width}
        plotHeight={height}
        aria-label='Area chart'
        onClickArea={onClickHandler}
        showDots
      />,
    );

    const dots = queryAllByAttribute('data-ui-name', container, 'Area.Dots');
    const dotsCoords = dots.map((dot) => ({
      x: parseFloat(dot.getAttribute('cx') || '0'),
      y: parseFloat(dot.getAttribute('cy') || '0'),
    }));

    const firstCallIndex = 0;
    const secondCallIndex = dots.length - 1;

    // Keep fireEvent: chart index resolution depends on explicit SVG coordinates.
    [firstCallIndex, secondCallIndex].forEach((index) => {
      fireEvent.click(dots[index], {
        clientX: dotsCoords[index].x,
        clientY: dotsCoords[index].y,
      });
    });

    expect(onClickHandler).toHaveBeenCalledTimes(2);
    expect(onClickHandler.mock.calls[0][0]).toBe(firstCallIndex);
    expect(onClickHandler.mock.calls[1][0]).toBe(secondCallIndex);
  });

  test.concurrent('should not throw if onClickArea is not provided', async () => {
    const { container } = render(
      <Chart.Area
        groupKey='time'
        data={ChartOptions.area.data}
        plotWidth={width}
        plotHeight={height}
        aria-label='Area chart'
        showDots
      />,
    );
    const dots = queryAllByAttribute('data-ui-name', container, 'Area.Dots');
    expect(dots.length).toBeGreaterThan(0);

    await userEvent.click(dots[0]);
  });
});

describe('Chart.Bubble', () => {
  beforeEach(cleanup);

  test.concurrent('should call onClickBubble and return correct data index', () => {
    const onClickHandler = vi.fn();

    const { container } = render(
      <Chart.Bubble onClickBubble={onClickHandler} data={ChartOptions.bubble.data} plotWidth={width} plotHeight={height} aria-label='Bubble chart' />,
    );

    const bubbles = queryAllByAttribute('data-ui-name', container, 'Bubble.Circle');
    expect(bubbles.length).toBeGreaterThan(0);

    const bubblesCords = bubbles.map((bubble) => ({
      x: parseFloat(bubble.getAttribute('cx') || '0'),
      y: parseFloat(bubble.getAttribute('cy') || '0'),
    }));

    const firstCallIndex = 0;
    const secondCallIndex = bubbles.length - 1;

    // Keep fireEvent: chart index resolution depends on explicit SVG coordinates.
    [firstCallIndex, secondCallIndex].forEach((index) => {
      fireEvent.click(bubbles[index], {
        clientX: bubblesCords[index].x,
        clientY: bubblesCords[index].y,
      });
    });

    expect(onClickHandler).toHaveBeenCalledTimes(2);
    expect(onClickHandler.mock.calls[0][0]).toBe(firstCallIndex);
    expect(onClickHandler.mock.calls[1][0]).toBe(secondCallIndex);
  });

  test.concurrent('should not throw if onClickBubble is not provided', () => {
    const { container } = render(
      <Chart.Bubble data={ChartOptions.bubble.data} plotWidth={width} plotHeight={height} aria-label='Bubble chart' />,
    );

    const bubbles = queryAllByAttribute('data-ui-name', container, 'Bubble.Circle');
    expect(bubbles.length).toBeGreaterThan(0);

    // Keep fireEvent: userEvent triggers OutsideClick internals for this SVG target in jsdom.
    expect(() => fireEvent.click(bubbles[0])).not.toThrow();
  });
});

describe('Chart.Donut', () => {
  beforeEach(cleanup);

  test.concurrent('should call onClickPie and return correct data key', async () => {
    const onClickHandler = vi.fn();

    const { container } = render(
      <Chart.Donut onClickPie={onClickHandler} plotWidth={width} plotHeight={height} data={ChartOptions.donut.data} aria-label='Donut chart' />,
    );

    const pies = queryAllByAttribute('data-ui-name', container, 'Donut.Pie');

    expect(pies.length).toBe(Object.keys(ChartOptions.donut.data).length);

    await userEvent.click(pies[0]);
    await userEvent.click(pies[pies.length - 1]);

    expect(onClickHandler).toBeCalledTimes(2);
    expect(onClickHandler.mock.calls[0][0]).toBe('a');
    expect(onClickHandler.mock.calls[1][0]).toBe('c');
  });

  test.concurrent('should not throw if onClickPie is not provided', async () => {
    const { container } = render(
      <Chart.Donut plotWidth={width} plotHeight={height} data={ChartOptions.donut.data} aria-label='Donut chart' />,
    );

    const pies = queryAllByAttribute('data-ui-name', container, 'Donut.Pie');
    expect(pies.length).toBeGreaterThan(0);

    await userEvent.click(pies[0]);
  });
});

describe('Chart.Line', () => {
  beforeEach(cleanup);

  test.concurrent('should call onClickLine and return correct data index', () => {
    const onClickHandler = vi.fn();

    const { container } = render(
      <Chart.Line
        data={ChartOptions.line.data}
        plotWidth={width}
        plotHeight={height}
        groupKey='x'
        xTicksCount={ChartOptions.line.data.length / 2}
        aria-label='Line chart'
        onClickLine={onClickHandler}
        showDots
      />,
    );

    const dots = queryAllByAttribute('data-ui-name', container, 'Line.Dots');
    expect(dots.length).toBe(ChartOptions.line.data.length);

    const dotsCoords = dots.map((dot) => ({
      x: parseFloat(dot.getAttribute('cx') || '0'),
      y: parseFloat(dot.getAttribute('cy') || '0'),
    }));

    const firstCallIndex = 0;
    const secondCallIndex = dots.length - 1;

    // Keep fireEvent: chart index resolution depends on explicit SVG coordinates.
    [firstCallIndex, secondCallIndex].forEach((index) => {
      fireEvent.click(dots[index], {
        clientX: dotsCoords[index].x,
        clientY: dotsCoords[index].y,
      });
    });

    expect(onClickHandler).toHaveBeenCalledTimes(2);
    expect(onClickHandler.mock.calls[0][0]).toBe(firstCallIndex);
    expect(onClickHandler.mock.calls[1][0]).toBe(secondCallIndex);
  });

  test.concurrent('should not throw if onClickLine is not provided', async () => {
    const { container } = render(
      <Chart.Line
        data={ChartOptions.line.data}
        plotWidth={width}
        plotHeight={height}
        groupKey='x'
        xTicksCount={ChartOptions.line.data.length / 2}
        aria-label='Line chart'
        showDots
      />,
    );

    const dots = queryAllByAttribute('data-ui-name', container, 'Line.Dots');
    expect(dots.length).toBeGreaterThan(0);

    await userEvent.click(dots[0]);
  });
});

describe('Chart.Radar', () => {
  beforeEach(cleanup);

  test.concurrent('should call onClickRadar and return correct data index', () => {
    const onClickHandler = vi.fn();

    const { container } = render(
      <Chart.Radar
        data={ChartOptions.radar.data}
        groupKey='categories'
        plotWidth={width}
        plotHeight={height}
        aria-label='Radar chart'
        onClickRadar={onClickHandler}
      />,
    );

    const radar = queryByAttribute('data-ui-name', container, 'Radar');
    expect(radar).toBeTruthy();

    // Keep fireEvent: radar segment selection depends on explicit SVG coordinates.
    fireEvent.click(radar!, { clientX: 250, clientY: 125 });
    fireEvent.click(radar!, { clientX: 375, clientY: 200 });

    expect(onClickHandler).toBeCalledTimes(2);
    expect(onClickHandler.mock.calls[0][0]).toBe(0);
    expect(onClickHandler.mock.calls[1][0]).toBe(1);
  });

  test.concurrent('should not throw if onClickRadar is not provided', () => {
    const { container } = render(
      <Chart.Radar
        data={ChartOptions.radar.data}
        groupKey='categories'
        plotWidth={width}
        plotHeight={height}
        aria-label='Radar chart'
      />,
    );

    const radar = queryByAttribute('data-ui-name', container, 'Radar');
    expect(radar).toBeTruthy();

    // Keep fireEvent: radar segment selection depends on explicit SVG coordinates.
    expect(() => fireEvent.click(radar!, { clientX: 250, clientY: 125 })).not.toThrow();
  });
});

describe('Chart.ScatterPlot', () => {
  beforeEach(cleanup);

  test.concurrent('should call onClickScatterItem and return correct data index', () => {
    const onClickHandler = vi.fn();

    const { container } = render(
      <Chart.ScatterPlot
        data={ChartOptions.scatterPlot.data}
        plotWidth={width}
        plotHeight={height}
        groupKey='x'
        aria-label='ScatterPlot chart'
        onClickScatterItem={onClickHandler}
      />,
    );

    const scatterItems = queryAllByAttribute('data-ui-name', container, 'ScatterPlot');
    expect(scatterItems.length).toBe(ChartOptions.scatterPlot.data.length);

    const scatterItemsCoords = scatterItems.map((si) => ({
      x: parseFloat(si.getAttribute('cx') || '0'),
      y: parseFloat(si.getAttribute('cy') || '0'),
    }));

    const firstCallIndex = 0;
    const secondCallIndex = scatterItems.length - 1;

    // Keep fireEvent: chart index resolution depends on explicit SVG coordinates.
    [firstCallIndex, secondCallIndex].forEach((index) => {
      fireEvent.click(scatterItems[index], {
        clientX: scatterItemsCoords[index].x,
        clientY: scatterItemsCoords[index].y,
      });
    });

    expect(onClickHandler).toHaveBeenCalledTimes(2);
    expect(onClickHandler.mock.calls[0][0]).toBe(firstCallIndex);
    expect(onClickHandler.mock.calls[1][0]).toBe(secondCallIndex);
  });

  test.concurrent('should not throw if onClickScatterItem is not provided', () => {
    const { container } = render(
      <Chart.ScatterPlot
        data={ChartOptions.scatterPlot.data}
        plotWidth={width}
        plotHeight={height}
        groupKey='x'
        aria-label='ScatterPlot chart'
      />,
    );

    const scatterItems = queryAllByAttribute('data-ui-name', container, 'ScatterPlot');
    expect(scatterItems.length).toBe(ChartOptions.scatterPlot.data.length);

    // Keep fireEvent: userEvent triggers OutsideClick internals for this SVG target in jsdom.
    expect(() => fireEvent.click(scatterItems[0])).not.toThrow();
  });
});

describe('Chart.Venn', () => {
  beforeEach(cleanup);

  test.concurrent('should call onClickVennItem and return correct data key', () => {
    const onClickHandler = vi.fn();

    const { container } = render(
      <Chart.Venn
        data={ChartOptions.venn.data}
        plotWidth={width}
        plotHeight={height}
        legendProps={{
          legendMap: ChartOptions.venn.legendMap,
        }}
        aria-label='Venn chart'
        onClickVennItem={onClickHandler}
      />,
    );

    const circles = queryAllByAttribute('data-ui-name', container, 'Venn.Circle');
    expect(circles.length).toBe(Object.keys(ChartOptions.venn.legendMap).length);

    const circlesCoords = circles.map((circle) => ({
      x: parseFloat(circle.getAttribute('cx') || '0'),
      y: parseFloat(circle.getAttribute('cy') || '0'),
    }));

    const firstCallIndex = 0;
    const secondCallIndex = circles.length - 1;

    // Keep fireEvent: chart key resolution depends on explicit SVG coordinates.
    [firstCallIndex, secondCallIndex].forEach((index) => {
      fireEvent.click(circles[index], {
        clientX: circlesCoords[index].x,
        clientY: circlesCoords[index].y,
      });
    });

    expect(onClickHandler).toHaveBeenCalledTimes(2);
    expect(onClickHandler.mock.calls[0][0]).toBe('G');
    expect(onClickHandler.mock.calls[1][0]).toBe('U');
  });

  test.concurrent('should not throw if onClickVennItem is not provided', async () => {
    const { container } = render(
      <Chart.Venn
        data={ChartOptions.venn.data}
        plotWidth={width}
        plotHeight={height}
        legendProps={{
          legendMap: ChartOptions.venn.legendMap,
        }}
        aria-label='Venn chart'
      />,
    );

    const circles = queryAllByAttribute('data-ui-name', container, 'Venn.Circle');
    expect(circles.length).toBe(Object.keys(ChartOptions.venn.legendMap).length);

    await userEvent.click(circles[0]);
  });
});

describe('Chart.Cigarette', () => {
  beforeEach(cleanup);

  test.concurrent('should call percentFormatter and return correct formatted percent', async () => {
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => (cb as any)());

    const percentFormatter = vi.fn((value: number) => value.toFixed(2));

    const { getByLabelText } = render(
      <Chart.Cigarette
        data={{
          Cats: 5,
          Capybaras: 11,
          Birds: 5,
        }}
        plotWidth={400}
        plotHeight={28}
        showPercentValueInTooltip={true}
        percentFormatter={percentFormatter}
        duration={200}
        aria-label='Cigarette chart'
      />,
    );

    const svg = getByLabelText('Chart');
    // Keep fireEvent: tooltip percent calculation depends on a precise SVG mouse position.
    fireEvent.mouseMove(svg, {
      clientX: 200,
      clientY: 14,
    });

    expect(percentFormatter).toHaveBeenNthCalledWith(1, (5 * 100) / 21);
    expect(percentFormatter).toHaveBeenNthCalledWith(2, (11 * 100) / 21);
    expect(percentFormatter).toHaveBeenNthCalledWith(3, (5 * 100) / 21);

    expect(percentFormatter).toHaveNthReturnedWith(1, '23.81');
    expect(percentFormatter).toHaveNthReturnedWith(2, '52.38');
    expect(percentFormatter).toHaveNthReturnedWith(3, '23.81');

    (window.requestAnimationFrame as any).mockRestore();
  });
});

describe('ChartLegend', () => {
  beforeEach(cleanup);
  afterEach(cleanup);

  test.concurrent('should support pattern, icon and info interactivity for shape=\'checkbox\'', async () => {
    const onChangeHandler = vi.fn();

    const legendItems = [{
      id: 'id1',
      label: `Line 1`,
      checked: true,
      color: `chart-palette-order`,
      additionalInfo: { label: 'Additional info' },
      icon: <Icon />,

    }];

    const { container } = render(
      <ChartLegend
        items={legendItems}
        onChangeVisibleItem={onChangeHandler}
        patterns
        aria-label='Area chart legend'
      />,
    );

    const user = userEvent.setup();

    const svg = container.querySelector('svg');
    expect(svg).not.toBe(null);
    await user.click(svg!);
    expect(onChangeHandler).toHaveBeenCalledTimes(1);

    const additionalInfo = container.querySelector('[class*="AdditionalLabel"]');
    expect(additionalInfo).not.toBeNull();
    await user.click(additionalInfo!);
    expect(onChangeHandler).toHaveBeenCalledTimes(2);

    const counter = container.querySelector('[data-ui-name="Video"]');
    expect(counter).not.toBeNull();
    await user.click(counter!);
    expect(onChangeHandler).toHaveBeenCalledTimes(3);
  });
});
