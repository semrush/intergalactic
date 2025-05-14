import React from 'react';
import Card from '@semcore/card';
import {
  AreaChartSkeleton,
} from '@semcore/skeleton';

const Demo = () => {
  return (
    <>
      <Card mb={5}>
        <Card.Header>
          <Card.Title>AreaChart skeleton</Card.Title>
        </Card.Header>
        <Card.Body>
          <AreaChartSkeleton />
        </Card.Body>
      </Card>

      <Card mb={5}>
        <Card.Header>
          <Card.Title>AreaChart skeleton (type=monotone)</Card.Title>
        </Card.Header>
        <Card.Body>
          <AreaChartSkeleton type='monotone' />
        </Card.Body>
      </Card>
    </>
  );
};

export default Demo;
