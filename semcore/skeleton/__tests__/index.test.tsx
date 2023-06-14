import * as React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import { expect, test, describe, beforeEach } from '@semcore/testing-utils/vitest';
import Skeleton, {
  LineChartSkeleton,
  AreaChartSkeleton,
  BarChartSkeleton,
  PieChartSkeleton,
  HistogramChartSkeleton,
  BubbleChartSkeleton,
  ScatterPlotChartSkeleton,
  VennChartSkeleton,
} from '../src';

import { render, cleanup } from '@semcore/testing-utils/testing-library';

describe('Skeleton', () => {
  beforeEach(cleanup);

  test.concurrent('Renders correctly', async ({ task }) => {
    const component = (
      <Skeleton h={48}>
        <Skeleton.Text />
      </Skeleton>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support amount', async ({ task }) => {
    const component = (
      <Skeleton h={48}>
        <Skeleton.Text amount={3} />
      </Skeleton>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support hidden', () => {
    const { queryByText } = render(
      <Skeleton h={48} hidden>
        <text>Test</text>
      </Skeleton>,
    );
    expect(queryByText(/Test/)).toBeNull();
  });

  test.concurrent('Should support theme', async ({ task }) => {
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

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });
});

describe('LineChartSkeleton', () => {
  test.concurrent('Renders correctly', async ({ task }) => {
    const component = (
      <>
        <LineChartSkeleton type="monotone" height={100} />
        <LineChartSkeleton height={100} />
      </>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });
});

describe('AreaChartSkeleton', () => {
  test.concurrent('Renders correctly', async ({ task }) => {
    const component = (
      <>
        <AreaChartSkeleton type="monotone" height={100} />
        <AreaChartSkeleton height={100} />
      </>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });
});

describe('BarChartSkeleton', () => {
  test.concurrent('Renders correctly', async ({ task }) => {
    const component = (
      <>
        <BarChartSkeleton layout="vertical" height={100} />
        <BarChartSkeleton height={100} />
      </>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });
});

describe('PieChartSkeleton', () => {
  test.concurrent('Renders correctly', async ({ task }) => {
    const component = <PieChartSkeleton />;
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });
});

describe('HistogramChartSkeleton', () => {
  test.concurrent('Renders correctly', async ({ task }) => {
    const component = (
      <>
        <HistogramChartSkeleton layout="vertical" height={100} />
        <HistogramChartSkeleton height={100} />
      </>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });
});

describe('BubbleChartSkeleton', () => {
  test.concurrent('Renders correctly', async ({ task }) => {
    const component = <BubbleChartSkeleton height={100} />;
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });
});

describe('ScatterPlotChartSkeleton', () => {
  test.concurrent('Renders correctly', async ({ task }) => {
    const component = <ScatterPlotChartSkeleton height={100} />;
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });
});

describe('VennChartSkeleton', () => {
  test.concurrent('Renders correctly', async ({ task }) => {
    const component = <VennChartSkeleton />;
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });
});
