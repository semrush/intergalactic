import React from 'react';
import { createComponent, Root, sstyled } from '@semcore/core';
import { Skeleton } from '../Skeleton';
import styles from '../style/chart.shadow.css';

const patternBase64 = preval`
module.exports = btoa(require('fs').readFileSync(__dirname + '/../svg/compact-horizontal-bar-chart.svg'))
`;

const CompactHorizontalBarChartSkeleton = (props) => {
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
};

export default createComponent(CompactHorizontalBarChartSkeleton);
