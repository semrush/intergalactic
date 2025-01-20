import React from 'react';
import { createComponent, Root, sstyled } from '@semcore/core';
import { Skeleton } from '../Skeleton';
import styles from '../style/chart.shadow.css';

const lineLinearSvg = preval`
module.exports = btoa(require('fs').readFileSync(__dirname + '/../svg/line-chart-linear.svg'))
`;
const lineMonotoneSvg = preval`
module.exports = btoa(require('fs').readFileSync(__dirname + '/../svg/line-chart-monotone.svg'))
`;

const LineChartSkeleton = (props) => {
  const SChartSkeleton = Root;
  const patternBase64 = { linear: lineLinearSvg, monotone: lineMonotoneSvg }[
    props.type ?? 'linear'
  ];
  return sstyled(styles)(
    <SChartSkeleton
      render={Skeleton}
      bgRepeat='repeat-x'
      bgPosition='left center'
      bgSize='auto 50%'
      bgPattern={`url(data:image/svg+xml;base64,${patternBase64})`}
    />,
  );
};

export default createComponent(LineChartSkeleton);
