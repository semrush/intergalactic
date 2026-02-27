import figma from '@figma/code-connect/react';
import { Plot, XAxis, YAxis, Area } from '@semcore/ui/d3-chart';
import { AreaChartSkeleton } from '@semcore/ui/skeleton';

figma.connect(
  Area,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=14003-301026&t=kZysxCyJe4tnPXYg-11',
  {
    variant: { '🔵 dots': 'false' },
    example: () => (
      <Area x='/* Set x */' y='/* Set y */' />
    ),
  },
);

figma.connect(
  Area,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=14003-301026&t=kZysxCyJe4tnPXYg-11',
  {
    variant: { '🔵 dots': 'true' },
    props: {
      displayDots: figma.boolean('🔵 dots'),
    },
    example: ({ displayDots }) => (
      <Area x='/* Set x */' y='/* Set y */'>
        <Area.Dots display={displayDots} />
      </Area>
    ),
  },
);

figma.connect(
  Area,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=13987-163781&t=kZysxCyJe4tnPXYg-11',
  {
    variant: { skeleton: 'false' },
    props: {
      area: figma.children('Area'),
    },
    example: ({ area }) => (
      <Plot data={/* Add chart data here */} scale={/* [xScale, yScale] */} width={/* Add chart width here */} height={/* Add chart height here */}>
        <YAxis>
          <YAxis.Ticks />
          <YAxis.Grid />
        </YAxis>
        <XAxis>
          <XAxis.Ticks>
          </XAxis.Ticks>
        </XAxis>
        {area}
      </Plot>
    ),
  },
);

// figma.connect(
//   AreaChartSkeleton,
//   'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=13987-163781&t=kZysxCyJe4tnPXYg-11',
//   {
//     variant: { skeleton: 'true' },
//     example: () => (
//       <AreaChartSkeleton type='monotone' />
//     ),
//   },
// );
