import { createComponent, Root, sstyled } from '@semcore/core';
import React from 'react';

import type { NSSkeletonCompactHorizontalBar } from './CompactHorizontalBar.type';
import { Skeleton } from '../../Skeleton';
import styles from '../../style/chart.shadow.css';

// TODO: replace it with babel-plugin-inline-import/or vite plugin.
// @ts-ignore
const patternBase64 = preval`
module.exports = btoa(require('fs').readFileSync(__dirname + '/../../svg/compact-horizontal-bar-chart.svg'))
`;

function CompactHorizontalBarChartSkeleton() {
  const SChartSkeleton = Root;
  return sstyled(styles)(
    <SChartSkeleton
      render={Skeleton}
      bgRepeat='repeat-y'
      bgPosition='left top'
      bgSize='contain'
      bgPattern={`url(data:image/svg+xml;base64,${patternBase64})`}
    />,
  );
}

/**
 * CompactHorizontalBarChartSkeleton
 *
 * {@link https://developer.semrush.com/intergalactic/components/skeleton/skeleton-api/|API} | {@link https://developer.semrush.com/intergalactic/components/skeleton/skeleton-code/|Examples}
 */
export default createComponent<
  NSSkeletonCompactHorizontalBar.Component,
  typeof CompactHorizontalBarChartSkeleton
>(CompactHorizontalBarChartSkeleton);
