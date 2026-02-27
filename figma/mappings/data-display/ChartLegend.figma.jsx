import figma from '@figma/code-connect/react';
import { ChartLegend, LegendFlex, ChartLegendTable } from '@semcore/ui/d3-chart';

figma.connect(
  ChartLegend,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=13066-1685&t=rJcL0Nl5bcNFNb66-11',
  {
    example: () => (
      <ChartLegend.LegendItem shape={/* Set shape here */}>
        <ChartLegend.LegendItem.Label />
      </ChartLegend.LegendItem>
    ),
  },
);

// Need to fix LegendFlex, code connect is not working

figma.connect(
  LegendFlex,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=13039-1404&t=rJcL0Nl5bcNFNb66-11',
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
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=13744-10359&t=rJcL0Nl5bcNFNb66-11',
  {
    props: {
      ariaLabel: figma.textContent('↳ aria-label'),
    },
    example: ({ ariaLabel }) => (
      <ChartLegendTable items={/* Set items here */} aria-label={ariaLabel} />
    ),
  },
);
