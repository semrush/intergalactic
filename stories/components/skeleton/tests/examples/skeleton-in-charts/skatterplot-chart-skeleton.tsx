import React from 'react';
import Card from '@semcore/card';
import {
  ScatterPlotChartSkeleton,
} from '@semcore/skeleton';

const Demo = () => {
  return (
    <>
       <Card mb={5}>
        <Card.Header>
          <Card.Title>ScatterPlotChart skeleton</Card.Title>
        </Card.Header>
        <Card.Body>
          <ScatterPlotChartSkeleton />
        </Card.Body>
      </Card>
    </>
  );
};

export default Demo;
