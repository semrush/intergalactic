import { Flex } from '@semcore/ui/base-components';
import { Chart } from '@semcore/ui/d3-chart';
import React from 'react';

import { chartIntentLines, chartPaletteLines, chartSemanticLines } from './chart-palette-data';

const semanticColorMap = {
  critical: 'chart-data-critical',
  success: 'chart-data-success',
  warning: 'chart-data-warning',
};

const intentColorMap = {
  commercial: 'chart-data-intent-commercial',
  informational: 'chart-data-intent-informational',
  navigational: 'chart-data-intent-navigational',
  task: 'chart-data-intent-task',
  transactional: 'chart-data-intent-transactional',
};

const Demo = () => {
  return (
    <Flex direction='column' gap={5}>
      <Chart.Line
        data={chartPaletteLines}
        plotWidth={500}
        plotHeight={200}
        groupKey='x'
        xTicksCount={chartPaletteLines.length / 2}
        showLegend
        aria-label='Line chart with twenty-four lines'
      />
      <Chart.Line
        data={chartSemanticLines}
        plotWidth={500}
        plotHeight={200}
        groupKey='x'
        xTicksCount={chartSemanticLines.length / 2}
        colorMap={semanticColorMap}
        showLegend
        aria-label='Line chart with critical, success, and warning semantic colors'
      />
      <Chart.Line
        data={chartIntentLines}
        plotWidth={500}
        plotHeight={200}
        groupKey='x'
        xTicksCount={chartIntentLines.length / 2}
        colorMap={intentColorMap}
        showLegend
        aria-label='Line chart with commercial, informational, navigational, task, and transactional intent colors'
      />
    </Flex>
  );
};

export default Demo;
