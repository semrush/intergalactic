import figma from '@figma/code-connect/react';
import { Flex } from '@semcore/ui/base-components';
import { Plot, Venn } from '@semcore/ui/d3-chart';
import { VennChartSkeleton } from '@semcore/ui/skeleton';

figma.connect(
  Venn,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=34-46327&t=Qp0tBVtbbr9U39bH-11',
  {
    variant: { skeleton: 'false' },
    example: () => (
      <Venn>
        <Venn.Circle />
        {/* Add other Venn.Circle components */}
      </Venn>
    ),
  },
);

figma.connect(
  Venn,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=34-46327&t=Qp0tBVtbbr9U39bH-11',
  {
    variant: { skeleton: 'true' },
    example: () => (
      <VennChartSkeleton />
    ),
  },
);

// Layout with ChartLegend

figma.connect(
  Venn,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=34-47213&t=Qp0tBVtbbr9U39bH-11',
  {
    variant: { 'legend placement': 'right' },
    props: {
      venn: figma.children('Venn'),
      legend: figma.children('ChartLegendTable'),
    },
    example: ({ venn, legend }) => (
      <Flex alignItems='flex-start' direction='row-reverse' gap={5}>
        <Plot data={/* Add chart data here */} width={/* Add chart width here */} height={/* Add chart height here */}>{venn}</Plot>
        {legend}
      </Flex>
    ),
  },
);

figma.connect(
  Venn,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=34-47213&t=Qp0tBVtbbr9U39bH-11',
  {
    variant: { 'legend placement': 'bottom' },
    props: {
      venn: figma.children('Venn'),
      legend: figma.children('ChartLegendTable'),
    },
    example: ({ venn, legend }) => (
      <Flex alignItems='flex-start' direction='column' gap={5}>
        <Plot data={/* Add chart data here */} width={/* Add chart width here */} height={/* Add chart height here */}>{venn}</Plot>
        {legend}
      </Flex>
    ),
  },
);
