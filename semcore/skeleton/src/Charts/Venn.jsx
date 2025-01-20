import React from 'react';
import { createComponent, Root, sstyled } from '@semcore/core';
import { Skeleton } from '../Skeleton';
import styles from '../style/chart.shadow.css';

const vennSvg = preval`
module.exports = btoa(require('fs').readFileSync(__dirname + '/../svg/venn-chart.svg'))
`;

const VennChartSkeleton = () => {
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
};

export default createComponent(VennChartSkeleton);
