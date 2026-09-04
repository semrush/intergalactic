import figma from '@figma/code-connect/react';
import { Plot, StackBar, YAxis, XAxis, HorizontalBar } from '@semcore/ui/d3-chart';
import { BarChartSkeleton } from '@semcore/ui/skeleton';

// Forced to add HorizontalBar to imports to avoid 'Could not find declaration for component' error
figma.connect(
  StackBar,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=14202-58981&t=rJcL0Nl5bcNFNb66-11',
  {
    variant: { skeleton: 'false' },
    example: () => (
      <Plot data={/* Add chart data here */} scale={/* [xScale, yScale] */} width={/* Add chart width here */} height={/* Add chart height here */}>
        <YAxis>
          <YAxis.Ticks />
          <YAxis.Grid />
        </YAxis>
        <XAxis>
          <XAxis.Ticks />
        </XAxis>
        <StackBar.HorizontalBar x='/* Set x */' maxBarSize={/* Set max bar size */} />
      </Plot>
    ),
  },
);

figma.connect(
  BarChartSkeleton,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=14202-58981&t=rJcL0Nl5bcNFNb66-11',
  {
    variant: { skeleton: 'true' },
    example: () => (
      <BarChartSkeleton layout='vertical' />
    ),
  },
);

// Horizontal bar chart without grid

figma.connect(
  HorizontalBar,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=14200-57647&t=rJcL0Nl5bcNFNb66-11',
  {
    variant: { skeleton: 'false' },
    example: () => (
      <Plot data={/* Add chart data here */} scale={/* [xScale, yScale] */} width={/* Add chart width here */} height={/* Add chart height here */}>
        <YAxis>
          <YAxis.Ticks />
        </YAxis>
        <HorizontalBar x='/* Set x */' y='/* Set y */' maxBarSize={/* Set max bar size */} />
      </Plot>
    ),
  },
);

figma.connect(
  BarChartSkeleton,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=14200-57647&t=rJcL0Nl5bcNFNb66-11',
  {
    variant: { skeleton: 'true' },
    example: () => (
      <BarChartSkeleton layout='vertical' />
    ),
  },
);
