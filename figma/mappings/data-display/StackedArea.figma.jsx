import figma from '@figma/code-connect/react';
import { Plot, XAxis, YAxis, StackedArea } from '@semcore/ui/d3-chart';
import { AreaChartSkeleton } from '@semcore/ui/skeleton';

figma.connect(
  StackedArea,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=14003-314929&t=kZysxCyJe4tnPXYg-11',
  {
    variant: { '🔵 dots': 'false' },
    example: () => (
      <StackedArea x='/* Set x */' />
    ),
  },
);

figma.connect(
  StackedArea,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=14003-314929&t=kZysxCyJe4tnPXYg-11',
  {
    variant: { '🔵 dots': 'true' },
    props: {
      displayDots: figma.boolean('🔵 dots'),
    },
    example: ({ displayDots }) => (
      <StackedArea x='/* Set x */'>
        <StackedArea.Area y='/* Set y */'>
          <StackedArea.Area.Dots display={displayDots} />
        </StackedArea.Area>
      </StackedArea>
    ),
  },
);

figma.connect(
  StackedArea,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=13987-258829&t=kZysxCyJe4tnPXYg-11',
  {
    variant: { skeleton: 'false' },
    props: {
      stackedArea: figma.children('StackedArea'),
    },
    example: ({ stackedArea }) => (
      <Plot data={/* Add chart data here */} scale={/* [xScale, yScale] */} width={/* Add chart width here */} height={/* Add chart height here */}>
        <YAxis>
          <YAxis.Ticks />
          <YAxis.Grid />
        </YAxis>
        <XAxis>
          <XAxis.Ticks>
          </XAxis.Ticks>
        </XAxis>
        {stackedArea}
      </Plot>
    ),
  },
);

// For some reason, the AreaChartSkeleton is not working correctly. I guess it's because AreaChartSkeleton is used in two components.
  AreaChartSkeleton,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=13987-163781&t=kZysxCyJe4tnPXYg-11',
  {
    variant: { skeleton: 'true' },
    example: () => (
      <AreaChartSkeleton type='monotone' />
    ),
  },
);