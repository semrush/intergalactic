import figma from '@figma/code-connect/react';
import { Plot, RadialTree } from '@semcore/ui/d3-chart';
import { RadialTreeChartSkeleton } from '@semcore/ui/skeleton';

figma.connect(
  RadialTree,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=1553-68607&t=rJcL0Nl5bcNFNb66-11',
  {
    variant: { skeleton: 'false' },
    props: {
      title: figma.textContent('↳ RadialTree.Title'),
    },
    example: ({ title }) => (
      <Plot data={/* Add chart data here */} scale={[scaleLinear(), scaleLinear()]} width={/* Add chart width here */} height={/* Add chart height here */}>
        <RadialTree>
          <RadialTree.Radian>
            <RadialTree.Radian.Label />
            <RadialTree.Radian.Line />
            <RadialTree.Radian.Cap />
            <RadialTree.Radian.Icon />
          </RadialTree.Radian>
          <RadialTree.Title>{title}</RadialTree.Title>
        </RadialTree>
      </Plot>
    ),
  },
);

figma.connect(
  RadialTreeChartSkeleton,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=1553-68607&t=rJcL0Nl5bcNFNb66-11',
  {
    variant: { skeleton: 'true' },
    example: () => (
      <RadialTreeChartSkeleton />
    ),
  },
);
