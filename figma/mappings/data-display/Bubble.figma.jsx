import figma from '@figma/code-connect/react';
import { Plot, XAxis, YAxis, Bubble } from '@semcore/ui/d3-chart';
import { BubbleChartSkeleton } from '@semcore/ui/skeleton';

figma.connect(
  Bubble,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=14003-324587&t=kghn8VFPezOPMocI-11',
  {
    example: () => (
      <Bubble x='x' y='y' value='value' />
    ),
  },
);

figma.connect(
  Bubble,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=13991-278213&t=kghn8VFPezOPMocI-11',
  {
    variant: { skeleton: 'false' },
    props: {
      bubble: figma.children('Bubble'),
    },
    example: ({ bubble }) => (
      <Plot data={/* Add chart data here */} scale={/* [xScale, yScale] */} width={/* Add chart width here */} height={/* Add chart height here */}>
        <YAxis>
          <YAxis.Ticks />
          <YAxis.Grid />
        </YAxis>
        <XAxis>
          <XAxis.Ticks>
          </XAxis.Ticks>
        </XAxis>
        {bubble}
      </Plot>
    ),
  },
);

figma.connect(
  BubbleChartSkeleton,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=13991-278213&t=kghn8VFPezOPMocI-11',
  {
    variant: { skeleton: 'true' },
    example: () => (
      <BubbleChartSkeleton />
    ),
  },
);
