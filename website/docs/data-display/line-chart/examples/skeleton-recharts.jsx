import React from 'react';
import { LineChartSkeleton } from '@semcore/skeleton';

export default () => (
  <React.Fragment>
    <LineChartSkeleton h="180px" type="monotone" />
    <LineChartSkeleton h="180px" />
  </React.Fragment>
);
