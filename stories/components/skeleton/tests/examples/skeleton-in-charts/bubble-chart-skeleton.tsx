import Card from '@semcore/card';
import {
  BubbleChartSkeleton,
} from '@semcore/skeleton';
import React from 'react';

const Demo = () => {
  return (
    <>
      <Card mb={5}>
        <Card.Header>
          <Card.Title>BubbleChart skeleton</Card.Title>
        </Card.Header>
        <Card.Body>
          <BubbleChartSkeleton />
        </Card.Body>
      </Card>
    </>
  );
};

export default Demo;
