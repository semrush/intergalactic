import figma from '@figma/code-connect/react';
import { YAxis } from '@semcore/ui/d3-chart';

figma.connect(
  YAxis,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=13824-22133&t=kghn8VFPezOPMocI-11',
  {
    example: () => (
      <YAxis>
        <YAxis.Ticks />
      </YAxis>
    ),
  },
);

// With grid
figma.connect(
  YAxis,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=13144-9633&t=kghn8VFPezOPMocI-11',
  {
    example: () => (
      <YAxis>
        <YAxis.Ticks />
        <YAxis.Grid />
      </YAxis>
    ),
  },
);
