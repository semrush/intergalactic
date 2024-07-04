import React from 'react';
import Card from 'intergalactic/card';
import {
  LineChartSkeleton,
  AreaChartSkeleton,
  BarChartSkeleton,
  CigarettesPackChartSkeleton,
  VennChartSkeleton,
  ScatterPlotChartSkeleton,
  BubbleChartSkeleton,
  RadialTreeChartSkeleton,
  HistogramChartSkeleton,
  DonutChartSkeleton,
} from 'intergalactic/skeleton';

const Demo = () => {
  return (
    <>
      <Card mb={5}>
        <Card.Header>
          <Card.Title>LineChart skeleton</Card.Title>
        </Card.Header>
        <Card.Body>
          <LineChartSkeleton />
        </Card.Body>
      </Card>

      <Card mb={5}>
        <Card.Header>
          <Card.Title>LineChart skeleton (type=monotone)</Card.Title>
        </Card.Header>
        <Card.Body>
          <LineChartSkeleton type='monotone' />
        </Card.Body>
      </Card>

      <Card mb={5}>
        <Card.Header>
          <Card.Title>AreaChart skeleton</Card.Title>
        </Card.Header>
        <Card.Body>
          <AreaChartSkeleton />
        </Card.Body>
      </Card>

      <Card mb={5}>
        <Card.Header>
          <Card.Title>AreaChart skeleton (type=monotone)</Card.Title>
        </Card.Header>
        <Card.Body>
          <AreaChartSkeleton type='monotone' />
        </Card.Body>
      </Card>

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
          <Card.Title>CigarettesPackChart skeleton</Card.Title>
        </Card.Header>
        <Card.Body>
          <CigarettesPackChartSkeleton />
        </Card.Body>
      </Card>

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

      <Card mb={5}>
        <Card.Header>
          <Card.Title>ScatterPlotChart skeleton</Card.Title>
        </Card.Header>
        <Card.Body>
          <ScatterPlotChartSkeleton />
        </Card.Body>
      </Card>

      <Card mb={5}>
        <Card.Header>
          <Card.Title>BubbleChart skeleton</Card.Title>
        </Card.Header>
        <Card.Body>
          <BubbleChartSkeleton />
        </Card.Body>
      </Card>

      <Card mb={5}>
        <Card.Header>
          <Card.Title>VennChart skeleton</Card.Title>
        </Card.Header>
        <Card.Body>
          <VennChartSkeleton />
        </Card.Body>
      </Card>

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
