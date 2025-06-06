import Card from '@semcore/card';
import {
  VennChartSkeleton,
} from '@semcore/skeleton';
import React from 'react';

const Demo = () => {
  return (
    <>
      <Card mb={5}>
        <Card.Header>
          <Card.Title>VennChart skeleton</Card.Title>
        </Card.Header>
        <Card.Body>
          <VennChartSkeleton />
        </Card.Body>
      </Card>
    </>
  );
};

export default Demo;
