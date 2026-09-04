import figma from '@figma/code-connect/react';
import { Plot, Bar, YAxis, XAxis } from '@semcore/ui/d3-chart';
import { BarChartSkeleton } from '@semcore/ui/skeleton';

figma.connect(
  Bar,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=14145-9172&t=Qp0tBVtbbr9U39bH-11',
  {
    example: () => (
      <Bar x='/* Set x */' y='/* Set y */' maxBarSize={/* Set max bar size */} />
    ),
  },
);

figma.connect(
  Bar,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=14135-6007&t=Qp0tBVtbbr9U39bH-11',
  {
    example: () => (
      <Bar x='/* Set x */' y='/* Set y */' maxBarSize={/* Set max bar size */} />
    ),
  },
);

figma.connect(
  Bar,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=14135-7279&t=Qp0tBVtbbr9U39bH-11',
  {
    variant: { skeleton: 'false' },
    props: {
      bar: figma.children('Bar'),
    },
    example: ({ bar }) => (
      <Plot data={/* Add chart data here */} scale={/* [xScale, yScale] */} width={/* Add chart width here */} height={/* Add chart height here */}>
        <YAxis>
          <YAxis.Ticks />
          <YAxis.Grid />
        </YAxis>
        <XAxis>
          <XAxis.Ticks />
        </XAxis>
        {bar}
      </Plot>
    ),
  },
);

figma.connect(
  BarChartSkeleton,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=14135-7279&t=Qp0tBVtbbr9U39bH-11',
  {
    variant: { skeleton: 'true' },
    example: () => (
      <BarChartSkeleton />
    ),
  },
);
