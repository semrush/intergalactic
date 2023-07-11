import * as React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import { expect, test, describe, beforeEach } from '@semcore/testing-utils/vitest';
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
// import {LineChartSkeleton} from '../lib/es6'

import { render, cleanup } from '@semcore/testing-utils/testing-library';
import { assignProps as _assignProps } from '@semcore/core';

// xdescribe('Skeleton', () => {
//   beforeEach(cleanup);
//
//   test.concurrent('Renders correctly', async ({ task }) => {
//     const component = (
//       <Skeleton h={48}>
//         <Skeleton.Text />
//       </Skeleton>
//     );
//     await expect(await snapshot(component)).toMatchImageSnapshot(task);
//   });
//
//   test.concurrent('Should support amount', async ({ task }) => {
//     const component = (
//       <Skeleton h={48}>
//         <Skeleton.Text amount={3} />
//       </Skeleton>
//     );
//     await expect(await snapshot(component)).toMatchImageSnapshot(task);
//   });
//
//   test.concurrent('Should support hidden', () => {
//     const { queryByText } = render(
//       <Skeleton h={48} hidden>
//         <text>Test</text>
//       </Skeleton>,
//     );
//     expect(queryByText(/Test/)).toBeNull();
//   });
//
//   test.concurrent('Should support theme', async ({ task }) => {
//     const component = (
//       <>
//         <Skeleton height={48}>
//           <Skeleton.Text amount={2} />
//           <Skeleton.Text y='40' width='60%' />
//         </Skeleton>
//         <div style={{ background: 'blue' }}>
//           <Skeleton height={48} theme='dark'>
//             <Skeleton.Text amount={2} />
//             <Skeleton.Text y='40' width='60%' />
//           </Skeleton>
//         </div>
//       </>
//     );
//
//     await expect(await snapshot(component)).toMatchImageSnapshot(task);
//   });
// });

describe('Skeleton Chart', () => {
  test.concurrent('LineChartSkeleton', async ({ task }) => {
    const component = (
      <>
        {/*<LineChartSkeleton type='monotone' height={100} />*/}
        <LineChartSkeleton height={100} />
        {/*<div style={{*/}
        {/*  '--test': 'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjU4IiB2aWV3Qm94PSIwIDAgMTI4IDU4IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDBfMzYwODJfMjIwODUyKSI+CjxwYXRoIGQ9Ik0wIDEyTDYzLjk5OTggNDZMMTI4IDEyIiBzdHJva2U9IiNFMEUxRTkiIHN0cm9rZS1vcGFjaXR5PSIwLjgiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDBfMzYwODJfMjIwODUyIj4KPHJlY3Qgd2lkdGg9IjEyOCIgaGVpZ2h0PSI1OCIgZmlsbD0id2hpdGUiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K)'*/}
        {/*}}></div>*/}
      </>
    );
    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  // xtest.concurrent('AreaChartSkeleton', async ({ task }) => {
  //   const component = (
  //     <>
  //       <AreaChartSkeleton h={150} w={300} />
  //       <AreaChartSkeleton type='monotone' h={150} w={300} />
  //     </>
  //   );
  //   await expect(await snapshot(component)).toMatchImageSnapshot(task);
  // });
  //
  // xtest.concurrent('BarChartSkeleton', async ({ task }) => {
  //   const component = (
  //     <>
  //       <BarChartSkeleton h={150} w={300} />
  //       <BarChartSkeleton layout='vertical' h={150} w={300} />
  //     </>
  //   );
  //   await expect(await snapshot(component)).toMatchImageSnapshot(task);
  // });
  //
  // xtest.concurrent('DonutChartSkeleton', async ({ task }) => {
  //   const component = (
  //     <>
  //       <DonutChartSkeleton h={150} w={300} />
  //       <DonutChartSkeleton halfsize h={150} w={300} />
  //     </>
  //   );
  //   await expect(await snapshot(component)).toMatchImageSnapshot(task);
  // });
  //
  // xtest.concurrent('HistogramChartSkeleton', async ({ task }) => {
  //   const component = (
  //     <>
  //       <HistogramChartSkeleton h={150} w={300} />
  //       <HistogramChartSkeleton layout='vertical' h={150} w={300} />
  //     </>
  //   );
  //   await expect(await snapshot(component)).toMatchImageSnapshot(task);
  // });
  //
  // xtest.concurrent('BubbleChartSkeleton', async ({ task }) => {
  //   const component = <BubbleChartSkeleton h={150} w={300} />;
  //   await expect(await snapshot(component)).toMatchImageSnapshot(task);
  // });
  //
  // xtest.concurrent('ScatterPlotChartSkeleton', async ({ task }) => {
  //   const component = <ScatterPlotChartSkeleton h={150} w={300} />;
  //   await expect(await snapshot(component)).toMatchImageSnapshot(task);
  // });
  //
  // xtest.concurrent('VennChartSkeleton', async ({ task }) => {
  //   const component = <VennChartSkeleton h={150} w={300} />;
  //   await expect(await snapshot(component)).toMatchImageSnapshot(task);
  // });
});
