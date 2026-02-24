import figma from '@figma/code-connect/react';
import { XAxis } from '@semcore/ui/d3-chart';

// Common component
figma.connect(
  XAxis,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=13867-59679&t=kghn8VFPezOPMocI-11',
  {
    example: () => (
      <XAxis>
        <XAxis.Ticks />
      </XAxis>
    ),
  },
);

// Line chart
figma.connect(
  XAxis,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=14195-49172&t=kghn8VFPezOPMocI-11',
  {
    example: () => (
      <XAxis>
        <XAxis.Ticks />
      </XAxis>
    ),
  },
);

// Area chart
figma.connect(
  XAxis,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=14195-48439&t=kghn8VFPezOPMocI-11',
  {
    example: () => (
      <XAxis>
        <XAxis.Ticks />
      </XAxis>
    ),
  },
);

// XAxis with grid
figma.connect(
  XAxis,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=13987-108088&t=kghn8VFPezOPMocI-11',
  {
    example: () => (
      <XAxis>
        <XAxis.Ticks />
        <XAxis.Grid />
      </XAxis>
    ),
  },
);
