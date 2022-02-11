import * as React from 'react';
import { render, cleanup } from '@semcore/jest-preset-ui/testing';
import snapshot from '@semcore/jest-preset-ui/snapshot';
import Skeleton, {
  LineChartSkeleton,
  AreaChartSkeleton,
  BarChartSkeleton,
  PieChartSkeleton,
  HistogramChartSkeleton,
} from '../src';

describe('Skeleton', () => {
  afterEach(cleanup);

  test('Renders correctly', async () => {
    const component = (
      <Skeleton h={48}>
        <Skeleton.Text />
      </Skeleton>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support amount', async () => {
    const component = (
      <Skeleton h={48}>
        <Skeleton.Text amount={3} />
      </Skeleton>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('Should support hidden', () => {
    const { queryByText } = render(
      <Skeleton h={48} hidden>
        <text>Test</text>
      </Skeleton>,
    );
    expect(queryByText(/Test/)).toBeNull();
  });

  test('Should support theme', async () => {
    const component = (
      <>
        <Skeleton height={48}>
          <Skeleton.Text amount={2} />
          <Skeleton.Text y="40" width="60%" />
        </Skeleton>
        <div style={{ background: 'blue' }}>
          <Skeleton height={48} theme="dark">
            <Skeleton.Text amount={2} />
            <Skeleton.Text y="40" width="60%" />
          </Skeleton>
        </div>
      </>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });
});

describe('LineChartSkeleton', () => {
  test('Renders correctly', async () => {
    const component = (
      <>
        <LineChartSkeleton type="monotone" height={100} />
        <LineChartSkeleton height={100} />
      </>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });
});

describe('AreaChartSkeleton', () => {
  test('Renders correctly', async () => {
    const component = (
      <>
        <AreaChartSkeleton type="monotone" height={100} />
        <AreaChartSkeleton height={100} />
      </>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });
});

describe('BarChartSkeleton', () => {
  test('Renders correctly', async () => {
    const component = (
      <>
        <BarChartSkeleton layout="vertical" height={100} />
        <BarChartSkeleton height={100} />
      </>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });
});

describe('PieChartSkeleton', () => {
  test('Renders correctly', async () => {
    const component = <PieChartSkeleton />;
    expect(await snapshot(component)).toMatchImageSnapshot();
  });
});

describe('HistogramChartSkeleton', () => {
  test('Renders correctly', async () => {
    const component = (
      <>
        <HistogramChartSkeleton layout="vertical" height={100} />
        <HistogramChartSkeleton height={100} />
      </>
    );
    expect(await snapshot(component)).toMatchImageSnapshot();
  });
});
