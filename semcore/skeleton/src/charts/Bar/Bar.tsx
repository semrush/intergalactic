import type { Intergalactic } from '@semcore/core';
import { createComponent, Root, sstyled } from '@semcore/core';
import React from 'react';

import type { NSSkeletonBarChart } from './Bar.type';
import { Skeleton } from '../../Skeleton';
import styles from '../../style/chart.shadow.css';

// TODO: replace it with babel-plugin-inline-import/or vite plugin.
// @ts-ignore

const barVerticalSvg = preval`
module.exports = btoa(require('fs').readFileSync(__dirname + '/../../svg/bar-chart-vertical.svg'))
`;
// TODO: replace it with babel-plugin-inline-import/or vite plugin.
// @ts-ignore
const barHorizontalSvg = preval`
module.exports = btoa(require('fs').readFileSync(__dirname + '/../../svg/bar-chart-horizontal.svg'))
`;

const pattern = { vertical: barVerticalSvg, horizontal: barHorizontalSvg };
const repeat = { vertical: 'repeat-y', horizontal: 'repeat-x' };
const position = { vertical: 'left top', horizontal: 'left bottom' };
const size = { vertical: 'contain', horizontal: 'auto 50%' };

function BarChartSkeleton(
  props: Intergalactic.InternalTypings.InferComponentProps<NSSkeletonBarChart.Component>,
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

export default createComponent(BarChartSkeleton) as NSSkeletonBarChart.Component;
