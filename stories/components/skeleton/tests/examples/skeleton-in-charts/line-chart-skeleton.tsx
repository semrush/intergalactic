import React from 'react';
import Card from '@semcore/card';
import {
  LineChartSkeleton,
} from '@semcore/skeleton';

const Demo = () => {
  return (
    <>
      <Card mb={5}>
        <Card.Header>
          <Card.Title>LineChart skeleton</Card.Title>
        </Card.Header>
        <Card.Body>
          <LineChartSkeleton />
        </Card.Body>
      </Card>

      <Card mb={5}>
        <Card.Header>
          <Card.Title>LineChart skeleton (type=monotone)</Card.Title>
        </Card.Header>
        <Card.Body>
          <LineChartSkeleton type='monotone' />
        </Card.Body>
      </Card>
    </>
  );
};

export default Demo;
