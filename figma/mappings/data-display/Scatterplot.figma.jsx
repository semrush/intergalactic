import figma from '@figma/code-connect/react';
import { Plot, XAxis, YAxis, Scatterplot } from '@semcore/ui/d3-chart';
import { ScatterPlotChartSkeleton } from '@semcore/ui/skeleton';

figma.connect(
  Scatterplot,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=14003-326870&t=kghn8VFPezOPMocI-11',
  {
    example: () => (
      <Scatterplot x='x' y='y' />
    ),
  },
);

figma.connect(
  Scatterplot,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=13991-291272&t=kghn8VFPezOPMocI-11',
  {
    variant: { skeleton: 'false' },
    props: {
      scatterplot: figma.children('Scatterplot'),
    },
    example: ({ scatterplot }) => (
      <Plot data={/* Add chart data here */} scale={/* [xScale, yScale] */} width={/* Add chart width here */} height={/* Add chart height here */}>
        <YAxis>
          <YAxis.Ticks />
          <YAxis.Grid />
        </YAxis>
        <XAxis>
          <XAxis.Ticks>
          </XAxis.Ticks>
        </XAxis>
        {scatterplot}
      </Plot>
    ),
  },
);

figma.connect(
  ScatterPlotChartSkeleton,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=13991-291272&t=kghn8VFPezOPMocI-11',
  {
    variant: { skeleton: 'true' },
    example: () => (
      <ScatterPlotChartSkeleton />
    ),
  },
);
