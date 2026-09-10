import figma from '@figma/code-connect/react';
import { Plot, XAxis, YAxis, Line } from '@semcore/ui/d3-chart';
import { LineSkeleton } from '@semcore/ui/skeleton';

figma.connect(
  Line,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=13999-12407&t=kghn8VFPezOPMocI-11',
  {
    variant: { '🔵 dots': 'false' },
    example: () => (
      <Line x='x' y='y'>
        <Line.Area y0='y0' y1='y1' />
      </Line>
    ),
  },
);

figma.connect(
  Line,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=13999-12407&t=kghn8VFPezOPMocI-11',
  {
    variant: { '🔵 dots': 'true' },
    props: {
      displayDots: figma.boolean('🔵 dots'),
    },
    example: ({ displayDots }) => (
      <Line x='x' y='y'>
        <Line.Area y0='y0' y1='y1' />
        <Line.Dots display={displayDots} />
      </Line>
    ),
  },
);

figma.connect(
  Line,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=13891-16352&t=kghn8VFPezOPMocI-11',
  {
    variant: { skeleton: 'false' },
    props: {
      lineArea: figma.children('Line.Area'),
    },
    example: ({ lineArea }) => (
      <Plot data={/* Add chart data here */} scale={/* [xScale, yScale] */} width={/* Add chart width here */} height={/* Add chart height here */}>
        <YAxis>
          <YAxis.Ticks />
          <YAxis.Grid />
        </YAxis>
        <XAxis>
          <XAxis.Ticks>
          </XAxis.Ticks>
        </XAxis>
        {lineArea}
      </Plot>
    ),
  },
);

figma.connect(
  LineSkeleton,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=13891-16352&t=kghn8VFPezOPMocI-11',
  {
    variant: { skeleton: 'true' },
    example: () => (
      <LineSkeleton type='monotone' />
    ),
  },
);
