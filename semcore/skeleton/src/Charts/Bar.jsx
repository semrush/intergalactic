import React from 'react';
import { createComponent, Root, sstyled } from '@semcore/core';
import { Skeleton } from '../Skeleton';
import styles from '../style/chart.shadow.css';

const barVerticalSvg = preval`
module.exports = btoa(require('fs').readFileSync(__dirname + '/../svg/bar-chart-vertical.svg'))
`;
const barHorizontalSvg = preval`
module.exports = btoa(require('fs').readFileSync(__dirname + '/../svg/bar-chart-horizontal.svg'))
`;

const BarChartSkeleton = (props) => {
  const SChartSkeleton = Root;
  const layout = props.layout ?? 'horizontal';
  const patternBase64 = { vertical: barVerticalSvg, horizontal: barHorizontalSvg }[layout];
  return sstyled(styles)(
    <SChartSkeleton
      render={Skeleton}
      bgRepeat={{ vertical: 'repeat-y', horizontal: 'repeat-x' }[layout]}
      bgPosition={{ vertical: 'left top', horizontal: 'left bottom' }[layout]}
      bgSize={{ vertical: 'contain', horizontal: 'auto 50%' }[layout]}
      bgPattern={`url(data:image/svg+xml;base64,${patternBase64})`}
    />,
  );
};

export default createComponent(BarChartSkeleton);
