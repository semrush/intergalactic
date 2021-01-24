import React from 'react';
import { BarChartSkeleton } from '@semcore/skeleton';

export default () => (
  <React.Fragment>
    <BarChartSkeleton height={150} />
    <BarChartSkeleton height={150} layout="vertical" />
  </React.Fragment>
);
