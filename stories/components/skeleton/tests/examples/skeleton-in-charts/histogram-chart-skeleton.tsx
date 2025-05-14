import React from 'react';
import Card from '@semcore/card';
import {
  HistogramChartSkeleton,
} from '@semcore/skeleton';

const Demo = () => {
  return (
    <>
     <Card mb={5}>
        <Card.Header>
          <Card.Title>HistogramChart skeleton</Card.Title>
        </Card.Header>
        <Card.Body>
          <HistogramChartSkeleton />
        </Card.Body>
      </Card>

      <Card mb={5}>
        <Card.Header>
          <Card.Title>HistogramChart skeleton (layout=vertical)</Card.Title>
        </Card.Header>
        <Card.Body>
          <HistogramChartSkeleton layout='vertical' />
        </Card.Body>
      </Card>
    </>
  );
};

export default Demo;
