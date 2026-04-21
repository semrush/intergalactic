import figma from '@figma/code-connect/react';
import { ChartLegend, LegendFlex, ChartLegendTable } from '@semcore/ui/d3-chart';

// figma.connect(
//   ChartLegend,
//   'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=13060-4082',
//   {
//     example: () => (
//       <ChartLegend.LegendItem shape={/* Set shape here */}>
//         <ChartLegend.LegendItem.Label />
//       </ChartLegend.LegendItem>
//     ),
//   },
// );

// Need to fix LegendFlex, code connect is not working

figma.connect(
  LegendFlex,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=13060-4082',
  {
    props: {
      ariaLabel: figma.textContent('↳ aria-label'),
    },
    example: ({ ariaLabel }) => (
      <LegendFlex
        aria-label={ariaLabel}
        direction='row'
        shape='Checkbox'
        size='m'
        trendIsVisible={false}
      />
    ),
  },
);

figma.connect(
  ChartLegendTable,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=13060-3831',
  {
    props: {
      ariaLabel: figma.textContent('↳ aria-label'),
    },
    example: ({ ariaLabel }) => (
      <ChartLegendTable items={/* Set items here */} aria-label={ariaLabel} />
    ),
  },
);
