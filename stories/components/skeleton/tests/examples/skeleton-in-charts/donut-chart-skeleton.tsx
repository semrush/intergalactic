import Card from '@semcore/ui/card';
import {
  DonutChartSkeleton,
} from '@semcore/ui/skeleton';
import React from 'react';

const Demo = () => {
  return (
    <>
      <Card mb={5}>
        <Card.Header>
          <Card.Title>DonutChart skeleton</Card.Title>
        </Card.Header>
        <Card.Body>
          <DonutChartSkeleton />
        </Card.Body>
      </Card>

      <Card mb={5}>
        <Card.Header>
          <Card.Title>DonutChart skeleton (halfsize)</Card.Title>
        </Card.Header>
        <Card.Body>
          <DonutChartSkeleton halfsize />
        </Card.Body>
      </Card>
    </>
  );
};

export default Demo;
