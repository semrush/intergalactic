import React from 'react';
import Card from '@semcore/ui/card';
import {
  LineChartSkeleton,
  AreaChartSkeleton,
  BarChartSkeleton,
  VennChartSkeleton,
  ScatterPlotChartSkeleton,
  BubbleChartSkeleton,
  RadialTreeChartSkeleton,
  HistogramChartSkeleton,
  DonutChartSkeleton,
} from '@semcore/ui/skeleton';

const Demo = () => {
  return (
    <>
      <Card mb={5}>
        <Card.Header>
          <Card.Title>LineChartSkeleton</Card.Title>
        </Card.Header>
        <Card.Body>
          <LineChartSkeleton />
        </Card.Body>
      </Card>

      <Card mb={5}>
        <Card.Header>
          <Card.Title>LineChartSkeleton + type=monotone</Card.Title>
        </Card.Header>
        <Card.Body>
          <LineChartSkeleton type='monotone' />
        </Card.Body>
      </Card>

      <Card mb={5}>
        <Card.Header>
          <Card.Title>AreaChartSkeleton</Card.Title>
        </Card.Header>
        <Card.Body>
          <AreaChartSkeleton />
        </Card.Body>
      </Card>

      <Card mb={5}>
        <Card.Header>
          <Card.Title>AreaChartSkeleton + type=monotone</Card.Title>
        </Card.Header>
        <Card.Body>
          <AreaChartSkeleton type='monotone' />
        </Card.Body>
      </Card>

      <Card mb={5}>
        <Card.Header>
          <Card.Title>BarChartSkeleton</Card.Title>
        </Card.Header>
        <Card.Body>
          <BarChartSkeleton />
        </Card.Body>
      </Card>

      <Card mb={5}>
        <Card.Header>
          <Card.Title>BarChartSkeleton + layout=vertical</Card.Title>
        </Card.Header>
        <Card.Body>
          <BarChartSkeleton layout='vertical' />
        </Card.Body>
      </Card>

      <Card mb={5}>
        <Card.Header>
          <Card.Title>HistogramChartSkeleton</Card.Title>
        </Card.Header>
        <Card.Body>
          <HistogramChartSkeleton />
        </Card.Body>
      </Card>

      <Card mb={5}>
        <Card.Header>
          <Card.Title>HistogramChartSkeleton + layout=vertical</Card.Title>
        </Card.Header>
        <Card.Body>
          <HistogramChartSkeleton layout='vertical' />
        </Card.Body>
      </Card>

      <Card mb={5}>
        <Card.Header>
          <Card.Title>DonutChartSkeleton</Card.Title>
        </Card.Header>
        <Card.Body>
          <DonutChartSkeleton />
        </Card.Body>
      </Card>

      <Card mb={5}>
        <Card.Header>
          <Card.Title>DonutChartSkeleton + halfsize</Card.Title>
        </Card.Header>
        <Card.Body>
          <DonutChartSkeleton halfsize />
        </Card.Body>
      </Card>

      <Card mb={5}>
        <Card.Header>
          <Card.Title>ScatterPlotChartSkeleton</Card.Title>
        </Card.Header>
        <Card.Body>
          <ScatterPlotChartSkeleton />
        </Card.Body>
      </Card>

      <Card mb={5}>
        <Card.Header>
          <Card.Title>BubbleChartSkeleton</Card.Title>
        </Card.Header>
        <Card.Body>
          <BubbleChartSkeleton />
        </Card.Body>
      </Card>

      <Card mb={5}>
        <Card.Header>
          <Card.Title>BubbleChartSkeleton</Card.Title>
        </Card.Header>
        <Card.Body>
          <VennChartSkeleton />
        </Card.Body>
      </Card>

      <Card>
        <Card.Header>
          <Card.Title>RadialTreeChartSkeleton</Card.Title>
        </Card.Header>
        <Card.Body>
          <RadialTreeChartSkeleton />
        </Card.Body>
      </Card>
    </>
  );
};

export default Demo;
