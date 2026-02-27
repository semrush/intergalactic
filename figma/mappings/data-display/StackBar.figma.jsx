import figma from '@figma/code-connect/react';
import { Plot, StackBar, YAxis, XAxis } from '@semcore/ui/d3-chart';
import { BarChartSkeleton } from '@semcore/ui/skeleton';

figma.connect(
  StackBar,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=14155-16881&t=rJcL0Nl5bcNFNb66-11',
  {
    example: () => (
      <StackBar y='/* Set y */' maxBarSize={/* Set max bar size */} />
    ),
  },
);

figma.connect(
  StackBar,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=14196-51402&t=rJcL0Nl5bcNFNb66-11',
  {
    variant: { skeleton: 'false' },
    props: {
      stackBar: figma.children('StackBar'),
    },
    example: ({ stackBar }) => (
      <Plot data={/* Add chart data here */} scale={/* [xScale, yScale] */} width={/* Add chart width here */} height={/* Add chart height here */}>
        <YAxis>
          <YAxis.Ticks />
          <YAxis.Grid />
        </YAxis>
        <XAxis>
          <XAxis.Ticks />
        </XAxis>
        {stackBar}
      </Plot>
    ),
  },
);

figma.connect(
  BarChartSkeleton,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=14196-51402&t=rJcL0Nl5bcNFNb66-11',
  {
    variant: { skeleton: 'true' },
    example: () => (
      <BarChartSkeleton />
    ),
  },
);
