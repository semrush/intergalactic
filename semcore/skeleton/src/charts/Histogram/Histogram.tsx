import type { Intergalactic } from '@semcore/core';
import { createComponent, Root, sstyled } from '@semcore/core';
import React from 'react';

import type { NSSkeletonHistogramChart } from './Histogram.type';
import { Skeleton } from '../../Skeleton';
import styles from '../../style/chart.shadow.css';

// TODO: replace it with babel-plugin-inline-import/or vite plugin.
// @ts-ignore
const histogramVerticalSvg = preval`
module.exports = btoa(require('fs').readFileSync(__dirname + '/../../svg/histogram-chart-vertical.svg'))
`;
// TODO: replace it with babel-plugin-inline-import/or vite plugin.
// @ts-ignore
const histogramHorizontalSvg = preval`
module.exports = btoa(require('fs').readFileSync(__dirname + '/../../svg/histogram-chart-horizontal.svg'))
`;

const repeat = { vertical: 'repeat-y', horizontal: 'repeat-x' };
const position = { vertical: 'left top', horizontal: 'left bottom' };
const size = { vertical: 'contain', horizontal: 'auto 50%' };
const pattern = { vertical: histogramVerticalSvg, horizontal: histogramHorizontalSvg };

function HistogramChartSkeleton(
  props: Intergalactic.InternalTypings.InferComponentProps<NSSkeletonHistogramChart.Component>,
) {
  const SChartSkeleton = Root;
  const layout = props.layout ?? 'horizontal';
  return sstyled(styles)(
    <SChartSkeleton
      render={Skeleton}
      bgRepeat={repeat[layout]}
      bgPosition={position[layout]}
      bgSize={size[layout]}
      bgPattern={`url(data:image/svg+xml;base64,${pattern[layout]})`}
    />,
  );
}

export default createComponent(HistogramChartSkeleton) as NSSkeletonHistogramChart.Component;
