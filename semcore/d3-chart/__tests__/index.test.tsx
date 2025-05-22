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

describe('Focus skip to content after plot', () => {
  beforeEach(cleanup); 

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
