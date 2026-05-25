import type { Intergalactic } from '@semcore/core';
import { createComponent, Root, sstyled } from '@semcore/core';
import React from 'react';

import type { NSSkeletonLineChart } from './Line.type';
import { Skeleton } from '../../Skeleton';
import styles from '../../style/chart.shadow.css';

// TODO: replace it to babel-plugin-inline-import/or vite plugin.
// @ts-ignore
const lineLinearSvg = preval`
module.exports = btoa(require('fs').readFileSync(__dirname + '/../../svg/line-chart-linear.svg'))
`;
// TODO: replace it with babel-plugin-inline-import/or vite plugin.
// @ts-ignore
const lineMonotoneSvg = preval`
module.exports = btoa(require('fs').readFileSync(__dirname + '/../../svg/line-chart-monotone.svg'))
`;

const pattern = {
  linear: lineLinearSvg,
  monotone: lineMonotoneSvg,
};

function LineChartSkeleton(
  props: Intergalactic.InternalTypings.InferComponentProps<NSSkeletonLineChart.Component>,
) {
  const SChartSkeleton = Root;
  const type = props.type ?? 'linear';
  return sstyled(styles)(
    <SChartSkeleton
      render={Skeleton}
      bgRepeat='repeat-x'
      bgPosition='left center'
      bgSize='auto 50%'
      bgPattern={`url(data:image/svg+xml;base64,${pattern[type]})`}
    />,
  );
}

/**
 * LineChartSkeleton
 *
 * {@link https://developer.semrush.com/intergalactic/components/skeleton/skeleton-api#linechartskeleton|API} | {@link https://developer.semrush.com/intergalactic/components/skeleton/skeleton-code/|Examples}
 */
export default createComponent(LineChartSkeleton) as NSSkeletonLineChart.Component;
