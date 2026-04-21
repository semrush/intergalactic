import { Box, Flex } from '@semcore/ui/base-components';
import Card from '@semcore/ui/card';
import Divider from '@semcore/ui/divider';
import React from 'react';

import BarChart from '../../../../../../components/d3-chart/advanced/examples/sync_tooltips';
import DonutChart from '../../../../../../components/d3-chart/docs/examples/donut-chart/basic-usage';
import RadarChart from '../../../../../../components/d3-chart/docs/examples/radar-chart/basic-usage';
import VennChart from '../../../../../../components/d3-chart/docs/examples/venn-chart/basic-usage';
import MiniChart from '../../../../../../components/mini-chart/docs/examples/basic_usage';
import Notice from '../../../../../../components/notice/docs/examples/custom_notice';
import DefaultSummary from '../../../../../../patterns/ux-patterns/summary/docs/examples/default-summary-example';

export function Dashboard() {
  return (
    <Flex direction='column' gap={8} mt={8}>
      <Flex gap={8}>
        <Box>
          <Notice mb={8} />
          <Card>
            <Card.Header>Bar stacked</Card.Header>
            <Card.Body>
              <DefaultSummary />
              <Divider my={8} />
              <BarChart />
            </Card.Body>
          </Card>
        </Box>

        <Flex direction='column' gap={8}>
          <Card>
            <Card.Header>Venn</Card.Header>
            <Card.Body>
              <VennChart />
            </Card.Body>
          </Card>
          <Card>
            <Card.Header>Donut</Card.Header>
            <Card.Body>
              <DonutChart />
            </Card.Body>
          </Card>
          <Card>
            <Card.Header>Radar</Card.Header>
            <Card.Body>
              <RadarChart />
            </Card.Body>
          </Card>
        </Flex>
      </Flex>

      <Card>
        <Card.Body>
          <MiniChart />
        </Card.Body>
      </Card>
    </Flex>
  );
}
