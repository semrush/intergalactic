import type { Intergalactic } from '@semcore/core';
import { createComponent, Root, sstyled } from '@semcore/core';
import React from 'react';

import type { NSSkeletonDonutChart } from './Donut.type';
import { Skeleton } from '../../Skeleton';
import styles from '../../style/chart.shadow.css';

// TODO: replace it with babel-plugin-inline-import or vite plugin.
// @ts-ignore
const donutFullSvg = preval`
module.exports = btoa(require('fs').readFileSync(__dirname + '/../../svg/donut-chart.svg'))
`;
// TODO: replace it with babel-plugin-inline-import/or vite plugin.
// @ts-ignore
const donutHalfSvg = preval`
module.exports = btoa(require('fs').readFileSync(__dirname + '/../../svg/donut-chart-halfsize.svg'))
`;

const pattern: Record<string, string> = {
  true: donutHalfSvg,
  false: donutFullSvg,
};
const position: Record<string, string> = {
  true: 'center bottom',
  false: 'center',
};

function DonutChartSkeleton(
  props: Intergalactic.InternalTypings.InferComponentProps<NSSkeletonDonutChart.Component>,
) {
  const SChartSkeleton = Root;
  const halfsize = (props.halfsize ?? false).toString();
  return sstyled(styles)(
    <SChartSkeleton
      render={Skeleton}
      bgRepeat='no-repeat'
      bgPosition={position[halfsize]}
      bgSize='contain'
      bgPattern={`url(data:image/svg+xml;base64,${pattern[halfsize]})`}
    />,
  );
}

export default createComponent<
  NSSkeletonDonutChart.Component,
  typeof DonutChartSkeleton
>(DonutChartSkeleton);
