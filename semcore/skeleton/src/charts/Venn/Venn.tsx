import { createComponent, Root, sstyled } from '@semcore/core';
import React from 'react';

import { Skeleton } from '../../Skeleton';
import styles from '../../style/chart.shadow.css';

// TODO: replace it with babel-plugin-inline-import/or vite plugin.
// @ts-ignore
const vennSvg = preval`
module.exports = btoa(require('fs').readFileSync(__dirname + '/../../svg/venn-chart.svg'))
`;

function VennChartSkeleton() {
  const SChartSkeleton = Root;
  return sstyled(styles)(
    <SChartSkeleton
      render={Skeleton}
      bgRepeat='no-repeat'
      bgPosition='center'
      bgSize='contain'
      bgPattern={`url(data:image/svg+xml;base64,${vennSvg})`}
    />,
  );
}

/**
 * VennChartSkeleton
 *
 * {@link https://developer.semrush.com/intergalactic/components/skeleton/skeleton-api#vennchartskeleton|API} | {@link https://developer.semrush.com/intergalactic/components/skeleton/skeleton-code/|Examples}
 */
export default createComponent(VennChartSkeleton);
