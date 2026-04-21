import figma from '@figma/code-connect/react';
import { Flex } from '@semcore/ui/base-components';
import { Donut, Plot } from '@semcore/ui/d3-chart';
import { DonutChartSkeleton } from '@semcore/ui/skeleton';
import { Text } from '@semcore/ui/typography';

figma.connect(
  Donut,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=13433-11875&t=kghn8VFPezOPMocI-11',
  {
    variant: { 'skeleton': 'false', 'inner label': 'false' },
    example: () => (
      <Donut innerRadius={/* value */}>
        <Donut.Pie />
        {/* Add other Donut.Pie components */}
      </Donut>
    ),
  },
);

figma.connect(
  Donut,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=13433-11875&t=kghn8VFPezOPMocI-11',
  {
    variant: { 'skeleton': 'false', 'inner label': 'true' },
    props: {
      innerLabel: figma.textContent('↳ inner label'),
      description: figma.textContent('↳ description'),
    },
    example: ({ innerLabel, description }) => (
      <Donut innerRadius={/* value */}>
        <Donut.Pie />
        {/* Add other Donut.Pie components */}
        <Donut.Label>
          <Text tag='tspan' size={400}>
            {innerLabel}
          </Text>
          <Text tag='tspan' size={200}>
            {description}
          </Text>
        </Donut.Label>
      </Donut>
    ),
  },
);

figma.connect(
  DonutChartSkeleton,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=13433-11875&t=kghn8VFPezOPMocI-11',
  {
    variant: { skeleton: 'true' },
    example: () => (
      <DonutChartSkeleton />
    ),
  },
);

// DonutChart with halfsize prop

figma.connect(
  Donut,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=13433-11958&t=Qp0tBVtbbr9U39bH-11',
  {
    variant: { 'skeleton': 'false', 'inner label': 'false' },
    example: () => (
      <Donut halfsize innerRadius={/* value */}>
        <Donut.Pie />
        {/* Add other Donut.Pie components */}
      </Donut>
    ),
  },
);

figma.connect(
  Donut,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=13433-11958&t=Qp0tBVtbbr9U39bH-11',
  {
    variant: { 'skeleton': 'false', 'inner label': 'true' },
    props: {
      innerLabel: figma.textContent('↳ inner label'),
      description: figma.textContent('↳ description'),
    },
    example: ({ innerLabel, description }) => (
      <Donut halfsize innerRadius={/* value */}>
        <Donut.Pie />
        {/* Add other Donut.Pie components */}
        <Donut.Label>
          <Text tag='tspan' size={400}>
            {innerLabel}
          </Text>
          <Text tag='tspan' size={200}>
            {description}
          </Text>
        </Donut.Label>
      </Donut>
    ),
  },
);

figma.connect(
  DonutChartSkeleton,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=13433-11958&t=Qp0tBVtbbr9U39bH-11',
  {
    variant: { skeleton: 'true' },
    example: () => (
      <DonutChartSkeleton halfsize />
    ),
  },
);

// Layout with ChartLegend

figma.connect(
  Donut,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=34-42648&t=Qp0tBVtbbr9U39bH-11',
  {
    variant: { 'legend placement': 'right' },
    props: {
      donut: figma.children('Donut'),
      legend: figma.children('ChartLegendTable'),
    },
    example: ({ donut, legend }) => (
      <Flex alignItems='flex-start' direction='row-reverse' gap={5}>
        <Plot data={/* Add chart data here */} width={/* Add chart width here */} height={/* Add chart height here */}>
          {donut}
        </Plot>
        {legend}
      </Flex>
    ),
  },
);

figma.connect(
  Donut,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=34-42648&t=Qp0tBVtbbr9U39bH-11',
  {
    variant: { 'legend placement': 'bottom' },
    props: {
      donut: figma.children('Donut'),
      legend: figma.children('ChartLegendTable'),
    },
    example: ({ donut, legend }) => (
      <Flex alignItems='flex-start' direction='column' gap={5}>
        <Plot data={/* Add chart data here */} width={/* Add chart width here */} height={/* Add chart height here */}>
          {donut}
        </Plot>
        {legend}
      </Flex>
    ),
  },
);

// Layout with ChartLegend and Donut with halfsize prop

figma.connect(
  Donut,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=1820-60968&t=Qp0tBVtbbr9U39bH-11',
  {
    variant: { 'legend placement': 'right' },
    props: {
      donutHalfsize: figma.children('DonutHalfsize'),
      legend: figma.children('ChartLegendTable'),
    },
    example: ({ donutHalfsize, legend }) => (
      <Flex alignItems='flex-start' direction='row-reverse' gap={5}>
        <Plot data={/* Add chart data here */} width={/* Add chart width here */} height={/* Add chart height here */}>
          {donutHalfsize}
        </Plot>
        {legend}
      </Flex>
    ),
  },
);

figma.connect(
  Donut,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=1820-60968&t=Qp0tBVtbbr9U39bH-11',
  {
    variant: { 'legend placement': 'bottom' },
    props: {
      donutHalfsize: figma.children('DonutHalfsize'),
      legend: figma.children('ChartLegendTable'),
    },
    example: ({ donutHalfsize, legend }) => (
      <Flex alignItems='flex-start' direction='column' gap={5}>
        <Plot data={/* Add chart data here */} width={/* Add chart width here */} height={/* Add chart height here */}>
          {donutHalfsize}
        </Plot>
        {legend}
      </Flex>
    ),
  },
);
