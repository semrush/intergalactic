import { extractUIName } from '@semcore/testing-utils/shared/extractUINameTree.ts';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { render } from '@semcore/testing-utils/testing-library';
import { describe, expect, test } from '@semcore/testing-utils/vitest';
import React from 'react';

import SkeletonSVG, {
  AreaChartSkeleton,
  BarChartSkeleton,
  BubbleChartSkeleton,
  CompactHorizontalBarChartSkeleton,
  DonutChartSkeleton,
  HistogramChartSkeleton,
  LineChartSkeleton,
  RadialTreeChartSkeleton,
  ScatterPlotChartSkeleton,
  VennChartSkeleton,
} from '../src';

describe('skeleton Dependency imports', () => {
  runDependencyCheckTests('skeleton');
});

describe('Skeleton', () => {
  test('Verify data-ui-name', () => {
    const skeletons = (
      <>
        <SkeletonSVG>
          <SkeletonSVG.Text amount={2} />
        </SkeletonSVG>
        <AreaChartSkeleton />
        <BarChartSkeleton />
        <BubbleChartSkeleton />
        <CompactHorizontalBarChartSkeleton />
        <DonutChartSkeleton />
        <HistogramChartSkeleton />
        <LineChartSkeleton />
        <RadialTreeChartSkeleton />
        <ScatterPlotChartSkeleton />
        <VennChartSkeleton />
      </>
    );

    const { container } = render(skeletons);
    expect(extractUIName(container)).toMatchSnapshot();
  });
});
