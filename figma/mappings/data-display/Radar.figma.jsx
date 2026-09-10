import figma from '@figma/code-connect/react';
import { Chart, Plot, Radar } from '@semcore/ui/d3-chart';

figma.connect(
  Chart.Radar,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=13688-3809&t=rJcL0Nl5bcNFNb66-11',
  {
    props: {
      ariaLabel: figma.textContent('↳ aria-label'),
    },
    example: ({ ariaLabel }) => (
      <Chart.Radar
        data={/* Add chart data here */}
        groupKey='/* Set group key here */'
        plotWidth={/* Set plot width here */}
        plotHeight={/* Set plot height here */}
        aria-label={ariaLabel}
        showDots={true}
        showTooltip={true}
      />
    ),
  },
);

// Mini Radar chart
figma.connect(
  Chart.Radar,
  'https://www.figma.com/design/EBG44NotS7lmjZnUOkhyrp/-Refactored---%E2%9C%A8-Charts?node-id=3423-123017&t=rJcL0Nl5bcNFNb66-11',
  {
    example: () => (
      <Plot data={/* Add chart data here */} width={6} height={6}>
        <Radar>
          <Radar.Axis dataKey='/* Set group key here */'></Radar.Axis>
          <Radar.Polygon dataKey='/* Set data key here */'>
            <Radar.Polygon.Line />
          </Radar.Polygon>
        </Radar>
      </Plot>
    ),
  },
);
