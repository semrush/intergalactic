---
title: Skeleton
fileSource: skeleton
tabs: Design('skeleton'), A11y('skeleton-a11y'), API('skeleton-api'), Example('skeleton-code'), Changelog('skeleton-changelog')
---

## Text initial loading

::: sandbox

<script lang="tsx">
import React from 'react';
import { Text } from '@semcore/ui/typography';
import Skeleton from '@semcore/ui/skeleton';

class Demo extends React.PureComponent {
  width = 600;
  height = 100;
  timerFetch: any = -1;
  timer: any = -1;

  state = { loading: true };

  componentDidMount() {
    this.timerFetch = setInterval(this.fetchData, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.timerFetch);
    clearInterval(this.timer);
  }

  fetchData = () => {
    this.setState({ loading: false });
    setTimeout(() => {
      this.timer = this.setState({ loading: true });
    }, 1000);
  };

  render() {
    const { loading } = this.state;

    return (
      <div style={{ width: `${this.width}px`, height: `${this.height}px` }}>
        {!loading && (
          <Text size={100}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aperiam atque beatae
            distinctio doloremque, et id quae reiciendis repellat saepe sapiente sequi veritatis.
            Adipisci, consequuntur excepturi nobis porro quas recusandae?
          </Text>
        )}
        <Skeleton hidden={!loading} height={this.height}>
          <Skeleton.Text amount={2} />
          <Skeleton.Text y='40' width='60%' />
        </Skeleton>
      </div>
    );
  }
}


</script>

:::

## Usage with other elements

::: sandbox

<script lang="tsx">
import React from 'react';
import Skeleton from '@semcore/ui/skeleton';

const Demo = () => {
  return (
    <Skeleton>
      <circle cx='30' cy='30' r='30' />
      <rect x='70' y='0' rx='4' ry='4' width='20%' height='38' />
      <rect x='70' y='50' rx='4' ry='4' width='60%' height='8' />
      <rect x='0' y='70' rx='4' ry='4' height='250' width='100%' />
    </Skeleton>
  );
};


</script>

:::

## Skeleton examples for charts

Use `h={100}` and `w={100}` to adjust the height and width of the skeleton.

::: sandbox

<script lang="tsx">
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


</script>

:::
