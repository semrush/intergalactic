import React from 'react';
import { AreaChartSkeleton } from '@semcore/ui/skeleton';

export default () => (
  <React.Fragment>
    <AreaChartSkeleton height={180} />
    <AreaChartSkeleton height={180} type="monotone" />
  </React.Fragment>
);
