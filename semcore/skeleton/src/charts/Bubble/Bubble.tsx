import { createComponent, Root, sstyled } from '@semcore/core';
import React from 'react';

import type { NSSkeletonBubbleChart } from './Bubble.type';
import { Skeleton } from '../../Skeleton';
import styles from '../../style/chart.shadow.css';

// TODO: replace it with babel-plugin-inline-import/or vite plugin.
// @ts-ignore
const bubbleSvg = preval`
module.exports = btoa(require('fs').readFileSync(__dirname + '/../../svg/bubble-chart.svg'))
`;

function BubbleChartSkeleton() {
  const SChartSkeleton = Root;
  return sstyled(styles)(
    <SChartSkeleton
      render={Skeleton}
      bgRepeat='repeat-x'
      bgPosition='left center'
      bgSize='auto 50%'
      bgPattern={`url(data:image/svg+xml;base64,${bubbleSvg})`}
    />,
  );
}

/**
 * BubbleChartSkeleton
 *
 * {@link https://developer.semrush.com/intergalactic/components/skeleton/skeleton-api/|API} | {@link https://developer.semrush.com/intergalactic/components/skeleton/skeleton-code/|Examples}
 */
export default createComponent<
  NSSkeletonBubbleChart.Component,
  typeof BubbleChartSkeleton
>(BubbleChartSkeleton);
