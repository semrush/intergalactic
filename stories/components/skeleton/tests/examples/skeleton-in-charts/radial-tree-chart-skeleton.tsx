import Card from '@semcore/ui/card';
import {
  RadialTreeChartSkeleton,
} from '@semcore/ui/skeleton';
import React from 'react';

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
