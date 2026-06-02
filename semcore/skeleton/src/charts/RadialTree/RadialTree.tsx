import { createComponent, Root, sstyled } from '@semcore/core';
import React from 'react';

import type { NSSkeletonRadialTreeChart } from './RadialTree.type';
import { Skeleton } from '../../Skeleton';
import styles from '../../style/chart.shadow.css';

// TODO: replace it with babel-plugin-inline-import/or vite plugin.
// @ts-ignore
const radialSvg = preval`
module.exports = btoa(require('fs').readFileSync(__dirname + '/../../svg/radial-chart.svg'))
`;

function RadialTreeChartSkeleton() {
  const SChartSkeleton = Root;
  return sstyled(styles)(
    <SChartSkeleton
      render={Skeleton}
      bgRepeat='no-repeat'
      bgPosition='center'
      bgSize='contain'
      bgPattern={`url(data:image/svg+xml;base64,${radialSvg})`}
    />,
  );
}

export default createComponent<NSSkeletonRadialTreeChart.Component, typeof RadialTreeChartSkeleton>(RadialTreeChartSkeleton);
