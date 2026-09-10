import figma from '@figma/code-connect/react';
import { Chart } from '@semcore/ui/d3-chart';
import { Skeleton } from '@semcore/ui/skeleton';

figma.connect(
  Chart.Cigarette,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=13456-915&t=rJcL0Nl5bcNFNb66-11',
  {
    props: {
      ariaLabel: figma.textContent('↳ aria-label'),
    },
    example: ({ ariaLabel }) => (
      <Chart.Cigarette data={/* Add chart data here */} plotWidth={/* Add chart width here */} aria-label={ariaLabel} />
    ),
  },
);

figma.connect(
  Skeleton,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=13456-915&t=rJcL0Nl5bcNFNb66-11',
  {
    variant: { skeleton: 'true' },
    example: () => (
      <Skeleton h={/* Add height here */} />
    ),
  },
);

figma.connect(
  Chart.Cigarette,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=14130-17556&t=rJcL0Nl5bcNFNb66-11',
  {
    variant: { orientation: 'column', skeleton: 'false' },
    props: {
      ariaLabel: figma.textContent('↳ aria-label'),
    //   metric: figma.textContent('↳ metric'),
    },
    example: ({ ariaLabel }) => (
      <Chart.Cigarette
        data={/* Add chart data here */}
        width={/* Add chart width here */}
        height={/* Add chart height here */}
        header={/* Add header here */}
        showLegend={true}
        aria-label={ariaLabel}
      />
    ),
  },
);

figma.connect(
  Skeleton,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=14130-17556&t=rJcL0Nl5bcNFNb66-11',
  {
    variant: { orientation: 'column', skeleton: 'true' },
    example: () => <Skeleton h={/* Add height here */} />,
  },
);

figma.connect(
  Chart.Cigarette,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=14130-17556&t=rJcL0Nl5bcNFNb66-11',
  {
    variant: { orientation: 'row' },
    props: {
      ariaLabel: figma.textContent('↳ aria-label'),
    //   metric: figma.textContent('↳ metric'),
    },
    example: ({ ariaLabel }) => (
      <Chart.Cigarette
        data={/* Add chart data here */}
        width={/* Add chart width here */}
        height={/* Add chart height here */}
        header={/* Add header here */}
        invertAxis={false}
        showLegend={true}
        aria-label={ariaLabel}
      />
    ),
  },
);

figma.connect(
  Skeleton,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=14130-17556&t=rJcL0Nl5bcNFNb66-11',
  {
    variant: { orientation: 'row', skeleton: 'true' },
    example: () => <Skeleton h={/* Add height here */} />,
  },
);
