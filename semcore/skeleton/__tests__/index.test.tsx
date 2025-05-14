import * as React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import { expect, test, describe } from '@semcore/testing-utils/vitest';
import Skeleton, {
  LineChartSkeleton,
  AreaChartSkeleton,
  BarChartSkeleton,
  DonutChartSkeleton,
  HistogramChartSkeleton,
  BubbleChartSkeleton,
  ScatterPlotChartSkeleton,
  VennChartSkeleton,
  CompactHorizontalBarChartSkeleton,
  RadialTreeChartSkeleton,
} from '../src';

import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';

describe('skeleton Dependency imports', () => {
  runDependencyCheckTests('skeleton');
});

describe('Skeleton in Chart', () => {
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
        <CompactHorizontalBarChartSkeleton h={150} w={300} />
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

  test.concurrent('RadialTreeChartSkeleton', async ({ task }) => {
    const component = <RadialTreeChartSkeleton h={150} w={300} />;
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });
});
