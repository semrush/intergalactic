import figma from '@figma/code-connect/react';
import { Plot, HistogramChart, YAxis, XAxis } from '@semcore/ui/d3-chart';
import { HistogramChartSkeleton } from '@semcore/ui/skeleton';

figma.connect(
  HistogramChart,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=14188-19324&t=rJcL0Nl5bcNFNb66-11',
  {
    example: () => (
      <HistogramChart x='/* Set x */' y='/* Set y */' />
    ),
  },
);

figma.connect(
  HistogramChart,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=14188-19295&t=rJcL0Nl5bcNFNb66-11',
  {
    example: () => (
      <Plot data={/* Add chart data here */} scale={/* [xScale, yScale] */} width={/* Add chart width here */} height={/* Add chart height here */}>
        <YAxis>
          <YAxis.Ticks />
          <YAxis.Grid />
        </YAxis>
        <HistogramChart x='/* Set x */' y='/* Set y */' />
      </Plot>
    ),
  },
);

figma.connect(
  HistogramChart,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=13933-3311&t=rJcL0Nl5bcNFNb66-11',
  {
    example: () => (
      <Plot data={/* Add chart data here */} scale={/* [xScale, yScale] */} width={/* Add chart width here */} height={/* Add chart height here */}>
        <XAxis>
          <XAxis.Ticks />
        </XAxis>
        <HistogramChart x='/* Set x */' y='/* Set y */' />
      </Plot>
    ),
  },
);

figma.connect(
  HistogramChart,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=14048-2682&t=rJcL0Nl5bcNFNb66-11',
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
        <HistogramChart x='/* Set x */' y='/* Set y */' />
      </Plot>
    ),
  },
);

figma.connect(
  HistogramChartSkeleton,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=14048-2682&t=rJcL0Nl5bcNFNb66-11',
  {
    variant: { skeleton: 'true' },
    example: () => (
      <HistogramChartSkeleton />
    ),
  },
);
