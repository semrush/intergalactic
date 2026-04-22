import { createComponent, Root, sstyled } from '@semcore/core';
import React from 'react';

import type { NSSkeletonScatterPlotChart } from './ScatterPlot.type';
import { Skeleton } from '../../Skeleton';
import styles from '../../style/chart.shadow.css';

// TODO: replace it with babel-plugin-inline-import/or vite plugin.
// @ts-ignore
const scatterSvg = preval`
module.exports = btoa(require('fs').readFileSync(__dirname + '/../../svg/scatter-plot-chart.svg'))
`;

function ScatterPlotChartSkeleton() {
  const SChartSkeleton = Root;
  return sstyled(styles)(
    <SChartSkeleton
      render={Skeleton}
      bgRepeat='repeat-x'
      bgPosition='left center'
      bgSize='auto 50%'
      bgPattern={`url(data:image/svg+xml;base64,${scatterSvg})`}
    />,
  );
}

export default createComponent(ScatterPlotChartSkeleton) as NSSkeletonScatterPlotChart.Component;
