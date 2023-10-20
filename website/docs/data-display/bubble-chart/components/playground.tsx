import React from 'react';
// @ts-ignore
import PlaygroundGeneration from '@components/PlaygroundGeneration';
// @ts-ignore
import { chartPlayground } from '@components/ChartPlayground';
import { Chart } from '@semcore/d3-chart';
import resolveColor from '@semcore/ui/utils/lib/color';
import { curveCardinal, curveLinearClosed, curveBumpX } from 'd3-shape';

const data = [
  { x: 2, y: 3, value: 5040, label: 'label 1', color: '#2BB3FF' },
  { x: 1, y: 9, value: 40, label: 'label 2', color: '#59DDAA' },
  { x: 6, y: 2, value: 45634, label: 'label 3', color: '#FF4953' },
  { x: 4, y: 7, value: 245, label: 'label 4', color: '#AB6CFE' },
  { x: 9, y: 5, value: 7462, label: 'label 5', color: '#66C030' },
];

const Preview = (preview) => {
  const { select, radio, label, bool } = preview('Chart.Line');

  const {
    direction,
    alignItems,
    justifyContent,
    hideXAxis,
    hideYAxis,
    hideTooltip,
    hideLegend,
    legendProps,
  } = chartPlayground({ select, radio, label, bool });

  legendProps.legendMap = {
    0: { lable: 'Item 1', color: resolveColor('blue-300') },
    1: { lable: 'Item 2' },
    2: { color: resolveColor('pink-300') },
    3: { lable: 'Item 4', color: resolveColor('yellow-300') },
    4: { lable: 'Item 5', color: resolveColor('red-300') },
  };

  legendProps.shape = 'Circle';

  return (
    // @ts-ignore
    <Chart.Bubble
      data={data}
      plotWidth={500}
      plotHeight={300}
      legendProps={legendProps}
      direction={direction}
      hideLegend={hideLegend}
      hideTooltip={hideTooltip}
      hideXAxis={hideXAxis}
      hideYAxis={hideYAxis}
      alignItems={alignItems}
      justifyContent={justifyContent}
    />
  );
};

export default PlaygroundGeneration(Preview);
