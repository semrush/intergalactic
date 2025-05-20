import React from 'react';
import Card from '@semcore/card';
import {
  RadialTreeChartSkeleton,
} from '@semcore/skeleton';

const Demo = () => {
  return (
    <>
      <Card>
        <Card.Header>
          <Card.Title>RadialTreeChart skeleton</Card.Title>
        </Card.Header>
        <Card.Body>
          <RadialTreeChartSkeleton />
        </Card.Body>
      </Card>
    </>
  );
};

export default Demo;
