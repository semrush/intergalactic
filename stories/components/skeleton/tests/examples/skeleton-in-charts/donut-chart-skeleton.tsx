import React from 'react';
import Card from '@semcore/card';
import {
  DonutChartSkeleton,
} from '@semcore/skeleton';

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
