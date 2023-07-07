import React from 'react';
import createComponent, { Root, sstyled } from '@semcore/core';
import { Skeleton } from '../Skeleton';
import styles from '../style/chart.shadow.css';

const linearPattern = preval`
module.exports = btoa(require('fs').readFileSync(__dirname + '/../svg/area-chart-linear.svg'))
`;
const monotonePattern = preval`
module.exports = btoa(require('fs').readFileSync(__dirname + '/../svg/area-chart-monotone.svg'))
`;

const AreaChartSkeleton = (props) => {
  const SChartSkeleton = Root;
  const patternBase64 = { linear: linearPattern, monotone: monotonePattern }[
    props.type ?? 'linear'
  ];
  return sstyled(styles)(
    <SChartSkeleton
      render={Skeleton}
      bgRepeat='repeat-x'
      bgPosition='left bottom'
      bgSize='auto 50%'
      bgPattern={`url(data:image/svg+xml;base64,${patternBase64})`}
    />,
  );
};

export default createComponent(AreaChartSkeleton);
