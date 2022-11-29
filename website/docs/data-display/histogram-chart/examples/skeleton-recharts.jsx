import React from 'react';
import { HistogramChartSkeleton } from '@semcore/ui/skeleton';

export default () => (
  <React.Fragment>
    <HistogramChartSkeleton h="150px" />
    <HistogramChartSkeleton h="150px" layout="vertical" />
  </React.Fragment>
);
