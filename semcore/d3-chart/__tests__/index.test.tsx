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
  HoverLine,
  // @ts-ignore
} from '../src';
import { PlotA11yView } from '../src/a11y/PlotA11yView';
import { getIndexFromData } from '../src/utils';
import { TextMeasurer } from '../src/utils/TextMeasurer';

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
      /* Called once per tick. Measuring multiline ticks no longer needs a rootRef,
         so the extra re-render after the initial render is gone. */
      expect.assertions(2);

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

describe('TextMeasurer', () => {
  test('should measure text and reuse the cached result for the same text and font size', () => {
    const measurer = new TextMeasurer();
    const appendSpy = vi.spyOn(document.body, 'appendChild');

    const first = measurer.measure('Capybara');
    const second = measurer.measure('Capybara');

    expect(second).toBe(first);
    expect(appendSpy).toHaveBeenCalledTimes(1);

    measurer.measure('Capybara', 16);
    expect(appendSpy).toHaveBeenCalledTimes(2);

    measurer.measure('Another label');
    expect(appendSpy).toHaveBeenCalledTimes(3);

    appendSpy.mockRestore();
  });

  test('should not leave the temporary svg node in the document', () => {
    const measurer = new TextMeasurer();
    const before = document.body.childElementCount;

    measurer.measure('Some tick label');

    expect(document.body.childElementCount).toBe(before);
  });
});

/**
 * `showDeltaPercentInTooltip` renders a third tooltip column with the percentage
 * change relative to the previous data point.
 *
 * The data below is shaped so that every branch of `getPercentDelta` is reachable
 * by hovering a specific bar (the chart is 500px wide and has 5 categories, so
 * each band is ~100px):
 *
 *   x=60  -> Point 0: no previous point, both deltas are `null`
 *   x=150 -> Point 1: `first` grows (+50%), `second` declines (-50%)
 *   x=250 -> Point 2: both values unchanged -> delta `0`
 *   x=350 -> Point 3: `first` drops to 0 (-100%), `second` grows (+20%)
 *   x=440 -> Point 4: previous `first` is 0 -> `null`, `second` unchanged -> `0`
 */
describe('Chart tooltip percent delta', () => {
  const deltaData = [
    { category: 'Point 0', first: 100, second: 50 },
    { category: 'Point 1', first: 150, second: 25 },
    { category: 'Point 2', first: 150, second: 25 },
    { category: 'Point 3', first: 0, second: 30 },
    { category: 'Point 4', first: 75, second: 30 },
  ];

  let rafSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    cleanup();
    rafSpy = vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => (cb as any)());
  });

  afterEach(() => {
    rafSpy.mockRestore();
  });

  const hoverBarChart = (clientX: number, props: Record<string, unknown> = {}) => {
    const { container } = render(
      <Chart.Bar
        data={deltaData}
        groupKey='category'
        plotWidth={width}
        plotHeight={300}
        showDeltaPercentInTooltip
        showTooltip
        showTotalInTooltip={false}
        duration={0}
        aria-label='Bar chart'
        {...props}
      />,
    );

    const plot = container.querySelector('svg[data-ui-name="Plot"]');
    expect(plot).not.toBeNull();

    // Keep fireEvent: the hovered index is resolved from explicit SVG coordinates.
    fireEvent.mouseMove(plot!, { clientX, clientY: 150 });

    const tooltip = document.querySelector('[data-ui-name="HoverRect.Tooltip"]');
    expect(tooltip).not.toBeNull();

    return tooltip!;
  };

  const getTitle = (tooltip: Element) =>
    tooltip.querySelector('[data-ui-name="HoverRect.Tooltip.Title"]')?.textContent;

  const getChildrenWrapper = (tooltip: Element) =>
    tooltip.querySelector('[class*="STooltipChildrenWrapper"]')!;

  const getColumnsCount = (tooltip: Element) =>
    Array.from(getChildrenWrapper(tooltip).classList)
      .find((className) => className.includes('columnsCount'))
      ?.match(/columnsCount_(\d)/)?.[1];

  const getDeltas = (tooltip: Element) =>
    Array.from(tooltip.querySelectorAll('[class*="STooltipDeltaWrapper"]')).map((node) => ({
      trend: Array.from(node.classList)
        .find((className) => className.includes('_trend_'))
        ?.match(/_trend_(\w+?)_/)?.[1],
      text: node.textContent,
      icon: node.querySelector('svg')?.getAttribute('data-ui-name') ?? null,
    }));

  test('should not render delta cells for the first data point and fall back to two columns', () => {
    const tooltip = hoverBarChart(60);

    expect(getTitle(tooltip)).toBe('Point 0');
    expect(getColumnsCount(tooltip)).toBe('2');
    expect(getDeltas(tooltip)).toHaveLength(0);
  });

  test('should render upward and downward deltas with the matching icon and sign', () => {
    const tooltip = hoverBarChart(150);

    expect(getTitle(tooltip)).toBe('Point 1');
    expect(getColumnsCount(tooltip)).toBe('3');
    expect(getDeltas(tooltip)).toEqual([
      { trend: 'upward', text: '50%', icon: 'DiffUp' },
      { trend: 'downward', text: '-50%', icon: 'DiffDown' },
    ]);
  });

  test('should render a -100% delta when the value drops to zero', () => {
    const tooltip = hoverBarChart(350);

    expect(getTitle(tooltip)).toBe('Point 3');
    expect(getDeltas(tooltip)).toEqual([
      { trend: 'downward', text: '-100%', icon: 'DiffDown' },
      { trend: 'upward', text: '20%', icon: 'DiffUp' },
    ]);
  });

  test('should mark an unchanged value as stable and render it without an icon', () => {
    const tooltip = hoverBarChart(250);
    const deltas = getDeltas(tooltip);

    expect(getTitle(tooltip)).toBe('Point 2');
    expect(deltas).toHaveLength(2);
    deltas.forEach((delta) => {
      expect(delta.trend).toBe('stable');
      expect(delta.icon).toBeNull();
    });
  });

  test('should not render delta cells at all when showDeltaPercentInTooltip is off', () => {
    const tooltip = hoverBarChart(150, { showDeltaPercentInTooltip: false });

    expect(getColumnsCount(tooltip)).toBe('2');
    expect(getDeltas(tooltip)).toHaveLength(0);
  });

  /**
   * Known defect: a stable delta renders as `0` instead of `0%`.
   *
   * `renderTooltipPercentDelta` builds the label as `{delta && `${delta}%`}`, so a
   * delta of `0` short-circuits to the number `0`, which React renders verbatim.
   * Remove `.fails` once the label is built unconditionally.
   */
  test.fails('should render a stable delta as "0%"', () => {
    const tooltip = hoverBarChart(250);

    expect(getDeltas(tooltip).map((delta) => delta.text)).toEqual(['0%', '0%']);
  });

  /**
   * Known defect: the tooltip grid loses its alignment on mixed rows.
   *
   * `hasNoPercentDeltas` is only true when *every* delta is `null`, so a single
   * resolvable delta switches the grid to three columns. Series whose delta is
   * `null` still render only two cells, so every following cell shifts one column
   * to the left. At Point 4 the previous `first` value is 0 -> delta `null`, while
   * `second` is unchanged -> delta `0`, which yields 5 cells in a 3-column grid.
   * Remove `.fails` once null deltas render a placeholder cell.
   */
  test.fails('should keep every row aligned when only some series have a delta', () => {
    const tooltip = hoverBarChart(440);

    expect(getTitle(tooltip)).toBe('Point 4');
    expect(getColumnsCount(tooltip)).toBe('3');
    // 2 series x 3 columns
    expect(getChildrenWrapper(tooltip).children).toHaveLength(6);
  });
});

/**
 * Without a custom `tooltipValueFormatter` the chart falls back to
 * `AbstractChart.defaultTooltipFormatter`.
 */
describe('Chart tooltip default formatting', () => {
  const formatData = [
    { time: new Date('2024-01-01T00:00:00Z'), integer: 10, fractional: 1234.5678 },
    { time: new Date('2024-03-15T00:00:00Z'), integer: 20, fractional: 0.049 },
    { time: new Date('2024-07-04T00:00:00Z'), integer: 30, fractional: 99.95 },
  ];

  let rafSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    cleanup();
    rafSpy = vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => (cb as any)());
  });

  afterEach(() => {
    rafSpy.mockRestore();
  });

  const hoverLineChart = (props: Record<string, unknown> = {}) => {
    const { container } = render(
      <Chart.Line
        data={formatData}
        groupKey='time'
        plotWidth={width}
        plotHeight={300}
        showTooltip
        showTotalInTooltip={false}
        duration={0}
        aria-label='Line chart'
        {...props}
      />,
    );

    const plot = container.querySelector('svg[data-ui-name="Plot"]');
    // Keep fireEvent: the hovered index is resolved from explicit SVG coordinates.
    fireEvent.mouseMove(plot!, { clientX: 250, clientY: 150 });

    const tooltip = document.querySelector('[data-ui-name="HoverLine.Tooltip"]');
    expect(tooltip).not.toBeNull();

    return tooltip!;
  };

  const getTitle = (tooltip: Element) =>
    tooltip.querySelector('[data-ui-name="HoverLine.Tooltip.Title"]')?.textContent;

  const getValues = (tooltip: Element) =>
    Array.from(tooltip.querySelectorAll('[data-ui-name="Text"]')).map((node) => node.textContent);

  /**
   * These pin the format as it ships today, which has no weekday in it. Adding the
   * weekday changes all three, see the `.fails` test below.
   */
  test.each([
    ['en', 'March 15, 2024'],
    ['de', '15. März 2024'],
    ['ja', '2024年3月15日'],
  ])('should format a Date group key through Intl for locale %s', (locale, expected) => {
    expect(getTitle(hoverLineChart({ locale }))).toBe(expected);
  });

  test('should print the month name in full rather than a numeric date', () => {
    const title = getTitle(hoverLineChart());

    expect(title).toContain('March');
    // A numeric date such as 3/15/2024 would mean the long format was dropped.
    expect(title).not.toMatch(/\d+\/\d+\/\d+/);
  });

  test('should drop the time from the date', () => {
    expect(getTitle(hoverLineChart())).not.toMatch(/\d{1,2}:\d{2}/);
  });

  /**
   * Known gap: the default date format carries no weekday.
   *
   * `defaultTooltipFormatter` builds the date from `{ month: 'long', day: 'numeric',
   * year: 'numeric' }`, so it prints "March 15, 2024" where the requirement asks for the
   * full weekday name as well. Remove `.fails` once `weekday: 'long'` is added to those
   * options, and update the locale cases above, which currently pin the shorter format.
   */
  test.fails('should print the full weekday name in the date', () => {
    const expected = new Intl.DateTimeFormat('en', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date('2024-03-15T00:00:00Z'));

    expect(getTitle(hoverLineChart())).toBe(expected);
  });

  test('should render integers as is and round fractional values to one decimal', () => {
    expect(getValues(hoverLineChart())).toEqual(['20', '0.0']);
  });

  /**
   * The hovered point is the middle one, so only its values matter.
   */
  const hoverValues = (first: number, second: number) =>
    getValues(
      hoverLineChart({
        data: [
          { time: new Date('2024-01-01T00:00:00Z'), first: 0, second: 0 },
          { time: new Date('2024-03-15T00:00:00Z'), first, second },
          { time: new Date('2024-07-04T00:00:00Z'), first: 5, second: 5 },
        ],
      }),
    );

  test('should round to one decimal place rather than truncate', () => {
    // 7.899934 only reaches 7.9 by rounding; truncating would leave 7.8.
    expect(hoverValues(1.739139, 7.899934)).toEqual(['1.7', '7.9']);
  });

  test('should round negative values away from zero the same way', () => {
    expect(hoverValues(-1.739139, -7.899934)).toEqual(['-1.7', '-7.9']);
  });

  test('should round a value that carries more digits than the axis shows', () => {
    expect(hoverValues(1234.5678, 0.96)).toEqual(['1234.6', '1.0']);
  });

  test('should format a numeric group key in the title as well', () => {
    const tooltip = hoverLineChart({
      groupKey: 'step',
      data: [
        { step: 0, first: 1 },
        { step: 2.56, first: 2 },
        { step: 5, first: 3 },
      ],
    });

    expect(getTitle(tooltip)).toBe('2.6');
  });

  test('should let tooltipValueFormatter override the built-in formatting', () => {
    const tooltipValueFormatter = vi.fn(() => 'formatted');

    expect(getValues(hoverLineChart({ tooltipValueFormatter }))).toEqual([
      'formatted',
      'formatted',
    ]);
    expect(tooltipValueFormatter).toHaveBeenCalled();
  });

  test('should run the total line through the value formatter', () => {
    const tooltip = hoverLineChart({ showTotalInTooltip: true });

    // 20 + 0.049 = 20.049 -> rounded to one decimal place.
    expect(getValues(tooltip)).toContain('20.0');
  });
});

/**
 * The tooltip dot is drawn in the series colour on an inverted (dark) tooltip.
 * `chart-palette-order-1` is itself a dark neutral, so the only thing separating it
 * from the tooltip background is the 1px ring drawn by
 * `box-shadow: 0 0 0 1px oklch(from var(--color) calc(l + var(--lightness)) c h)`.
 * That is why `chart-palette-order-1` gets a stronger lightness offset than the rest.
 */
describe('Tooltip.Dot ring lightness', () => {
  const dotData = [
    { x: 0, y: 2 },
    { x: 1, y: 5 },
    { x: 2, y: 3 },
    { x: 3, y: 7 },
  ];

  let rafSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    cleanup();
    rafSpy = vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => (cb as any)());
  });

  afterEach(() => {
    rafSpy.mockRestore();
  });

  /**
   * The dot has to be read from inside a rendered Tooltip: `TooltipDotRenderContext`
   * only resets its colour index when a Tooltip provides it, so a standalone
   * `Tooltip.Dot` would inherit whatever index previous renders left behind.
   */
  const hoverAndReadDots = (ui: React.ReactElement) => {
    const { container } = render(ui);

    // Keep fireEvent: the hovered index is resolved from explicit SVG coordinates.
    fireEvent.mouseMove(container.querySelector('svg[data-ui-name="Plot"]')!, {
      clientX: 200,
      clientY: 100,
    });

    const circles = document.querySelectorAll('[class*="SDotCircle"]');
    expect(circles.length).toBeGreaterThan(0);

    // sstyled passes `color` and `lightness` down as generated custom properties.
    return Array.from(circles).map((circle) => {
      const style = circle.getAttribute('style') ?? '';

      return {
        color: style.match(/--color_\w+:\s*([^;]+)/)?.[1]?.trim(),
        lightness: style.match(/--lightness_\w+:\s*([^;]+)/)?.[1]?.trim(),
      };
    });
  };

  const hoverAndReadDot = (ui: React.ReactElement) => hoverAndReadDots(ui)[0];

  const readHighLevelDot = () =>
    hoverAndReadDot(
      <Chart.Line
        data={dotData}
        groupKey='x'
        plotWidth={400}
        plotHeight={200}
        showTooltip
        duration={0}
        aria-label='Line chart'
      />,
    );

  const readLowLevelDot = () => {
    const xScale = scaleLinear().range([40, 360]).domain([0, 3]);
    const yScale = scaleLinear().range([160, 40]).domain([0, 10]);

    return hoverAndReadDot(
      <Plot data={dotData} scale={[xScale, yScale]} width={400} height={200}>
        <HoverLine.Tooltip x='x' wMin={100}>
          {({ xIndex }: any) => ({
            children: xIndex !== null
              ? <HoverLine.Tooltip.Dot mr={4}>Line</HoverLine.Tooltip.Dot>
              : <></>,
          })}
        </HoverLine.Tooltip>
      </Plot>,
    );
  };

  test('should paint both the high and the low level dot in chart-palette-order-1', () => {
    expect(readHighLevelDot().color).toContain('chart-palette-order-1');
    cleanup();
    expect(readLowLevelDot().color).toContain('chart-palette-order-1');
  });

  test('should use the stronger ring when the chart passes the colour explicitly', () => {
    expect(readHighLevelDot().lightness).toBe('0.35');
  });

  /**
   * Only `chart-palette-order-1` needs the stronger offset. Every other palette colour
   * is light enough against the inverted tooltip to read with the default one.
   */
  test('should use the default ring for every colour but chart-palette-order-1', () => {
    const dots = hoverAndReadDots(
      <Chart.Line
        data={dotData.map((d) => ({ ...d, second: d.y * 2 }))}
        groupKey='x'
        plotWidth={400}
        plotHeight={200}
        showTooltip
        duration={0}
        aria-label='Line chart'
      />,
    );

    expect(dots).toHaveLength(2);
    expect(dots[0]).toMatchObject({ lightness: '0.35' });
    expect(dots[1].color).toContain('chart-palette-order-2');
    expect(dots[1].lightness).toBe('0.15');
  });

  /**
   * The ring offset has to follow the colour the dot is painted with, not the `color`
   * prop: `chart-palette-order-1` is a dark neutral that matches the inverted tooltip
   * background, so the 1px ring is the only thing separating the two. Looking the offset
   * up by the prop alone would drop a low-level `<Tooltip.Dot>` (which falls back to that
   * very colour) to the weaker 0.15 and make it disappear.
   */
  test('should ring the implicit colour exactly like the explicit one', () => {
    const lowLevel = readLowLevelDot();
    cleanup();
    const highLevel = readHighLevelDot();

    expect(lowLevel.lightness).toBe('0.35');
    expect(lowLevel.lightness).toBe(highLevel.lightness);
  });
});
