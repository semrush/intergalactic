import React from 'react';
// @ts-ignore
import PlaygroundGeneration from '@components/PlaygroundGeneration';
// @ts-ignore
import { chartPlayground } from '@components/ChartPlayground';
import { Chart } from '@semcore/d3-chart';
import resolveColor from '@semcore/utils/src/color';

const data = {
  G: 200,
  F: 200,
  C: 500,
  U: 1,
  'G/F': 100,
  'G/C': 100,
  'F/C': 100,
  'G/F/C': 100,
};

const lineColors = {
  G: resolveColor('blue-300'),
  F: resolveColor('green-200'),
  C: resolveColor('orange-400'),
  U: resolveColor('red-400'),
};

const Preview = (preview) => {
  const { select, radio, label, bool } = preview('Chart.Venn');

  const {
    direction,
    alignItems,
    justifyContent,
    hideLegend,
    hideXAxis,
    hideYAxis,
    hideTooltip,
    legendProps,
  } = chartPlayground({ select, radio, label, bool });

  legendProps.legendMap = {
    G: { label: 'Good' },
    F: { label: 'Fast' },
    C: { label: 'Clean' },
    U: { label: 'Uniq' },
  };

  return (
    // @ts-ignore
    <Chart.Venn
      data={data}
      plotWidth={300}
      plotHeight={300}
      colorMap={lineColors}
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
