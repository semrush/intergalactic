import type { Intergalactic } from '@semcore/core';
import { createComponent, Root, sstyled } from '@semcore/core';
import React from 'react';

import type { NSSkeletonAreaChart } from './Area.type';
import { Skeleton } from '../../Skeleton';
import styles from '../../style/chart.shadow.css';

// TODO: replace it with babel-plugin-inline-import/or vite plugin.
// @ts-ignore
const areaLinearSvg = preval`
module.exports = btoa(require('fs').readFileSync(__dirname + '/../../svg/area-chart-linear.svg'))
`;
// TODO: replace it with babel-plugin-inline-import/or vite plugin.
// @ts-ignore
const areaMonotoneSvg = preval`
module.exports = btoa(require('fs').readFileSync(__dirname + '/../../svg/area-chart-monotone.svg'))
`;

const pattern = {
  linear: areaLinearSvg,
  monotone: areaMonotoneSvg,
};

function AreaChartSkeleton(props: Intergalactic.InternalTypings.InferComponentProps<NSSkeletonAreaChart.Component>) {
  const SChartSkeleton = Root;
  return sstyled(styles)(
    <SChartSkeleton
      render={Skeleton}
      bgRepeat='repeat-x'
      bgPosition='left bottom'
      bgSize='auto 50%'
      bgPattern={`url(data:image/svg+xml;base64,${pattern[props.type ?? 'linear']})`}
    />,
  );
}

/**
 * AreaChartSkeleton
 *
 * {@link https://developer.semrush.com/intergalactic/components/skeleton/skeleton-api#areachartskeleton|API} | {@link https://developer.semrush.com/intergalactic/components/skeleton/skeleton-code#chart-skeleton|Examples}
 */
export default createComponent(AreaChartSkeleton) as NSSkeletonAreaChart.Component;
