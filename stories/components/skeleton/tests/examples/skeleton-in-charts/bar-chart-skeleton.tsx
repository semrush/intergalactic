import React from 'react';
import Card from '@semcore/card';
import {
  BarChartSkeleton,
  CompactHorizontalBarChartSkeleton,
} from '@semcore/skeleton';

const Demo = () => {
  return (
    <>
     <Card mb={5}>
        <Card.Header>
          <Card.Title>BarChart skeleton</Card.Title>
        </Card.Header>
        <Card.Body>
          <BarChartSkeleton />
        </Card.Body>
      </Card>

      <Card mb={5}>
        <Card.Header>
          <Card.Title>BarChart skeleton (layout=vertical)</Card.Title>
        </Card.Header>
        <Card.Body>
          <BarChartSkeleton layout='vertical' />
        </Card.Body>
      </Card>

      <Card mb={5}>
        <Card.Header>
          <Card.Title>CompactHorizontalBarChart skeleton</Card.Title>
        </Card.Header>
        <Card.Body>
          <CompactHorizontalBarChartSkeleton />
        </Card.Body>
      </Card>
    </>
  );
};

export default Demo;
