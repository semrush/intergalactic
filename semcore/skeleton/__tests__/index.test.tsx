import * as React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import { expect, test, describe, beforeEach } from '@semcore/testing-utils/vitest';
import { render, cleanup } from '@semcore/testing-utils/testing-library';
import Skeleton, {
  LineChartSkeleton,
  AreaChartSkeleton,
  BarChartSkeleton,
  DonutChartSkeleton,
  HistogramChartSkeleton,
  BubbleChartSkeleton,
  ScatterPlotChartSkeleton,
  VennChartSkeleton,
} from '../src';

import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';

describe('skeleton Dependency imports', () => {
  runDependencyCheckTests('skeleton');
});

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
          <Skeleton.Text y='40' width='60%' />
        </Skeleton>
        <div style={{ background: 'blue' }}>
          <Skeleton height={48} theme='dark'>
            <Skeleton.Text amount={2} />
            <Skeleton.Text y='40' width='60%' />
          </Skeleton>
        </div>
      </>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });
});

describe('Skeleton Chart', () => {
  test.concurrent('LineChartSkeleton', async ({ task }) => {
    const component = (
      <>
        <LineChartSkeleton h={150} w={300} />
        <LineChartSkeleton type='monotone' h={150} w={300} />
      </>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('AreaChartSkeleton', async ({ task }) => {
    const component = (
      <>
        <AreaChartSkeleton h={150} w={300} />
        <AreaChartSkeleton type='monotone' h={150} w={300} />
      </>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('BarChartSkeleton', async ({ task }) => {
    const component = (
      <>
        <BarChartSkeleton h={150} w={300} />
        <BarChartSkeleton layout='vertical' h={150} w={300} />
      </>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('DonutChartSkeleton', async ({ task }) => {
    const component = (
      <>
        <DonutChartSkeleton h={150} w={300} />
        <DonutChartSkeleton halfsize h={150} w={300} />
      </>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('HistogramChartSkeleton', async ({ task }) => {
    const component = (
      <>
        <HistogramChartSkeleton h={150} w={300} />
        <HistogramChartSkeleton layout='vertical' h={150} w={300} />
      </>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('BubbleChartSkeleton', async ({ task }) => {
    const component = <BubbleChartSkeleton h={150} w={300} />;
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('ScatterPlotChartSkeleton', async ({ task }) => {
    const component = <ScatterPlotChartSkeleton h={150} w={300} />;
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('VennChartSkeleton', async ({ task }) => {
    const component = <VennChartSkeleton h={150} w={300} />;
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });
});
