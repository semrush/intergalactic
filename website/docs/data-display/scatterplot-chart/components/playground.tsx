import React from 'react';
// @ts-ignore
import PlaygroundGeneration from '@components/PlaygroundGeneration';
// @ts-ignore
import { chartPlayground } from '@components/ChartPlayground';
import { Chart } from '@semcore/d3-chart';
import resolveColor from '@semcore/utils/src/color';

const colorMap = {
  y: resolveColor('blue-300'),
  y2: resolveColor('green-200'),
};

const data = [...Array(25).keys()].map((d, i) => ({
  x: i,
  y: Math.random() * 10,
  y2: Math.random() * 10,
  value: Math.round(Math.random() * 10),
}));

const Preview = (preview) => {
  const { select, radio, label, bool } = preview('Chart.ScatterPlot');

  const {
    direction,
    alignItems,
    justifyContent,
    hideXAxis,
    hideYAxis,
    hideTooltip,
    hideLegend,
    legendProps,
  } = chartPlayground({ select, radio, label, bool }, { direction: 'column' });

  return (
    // @ts-ignore
    <Chart.ScatterPlot
      data={data}
      groupKey={'x'}
      valueKey={'value'}
      colorMap={colorMap}
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
      xTicksCount={10}
      yTicksCount={6}
    />
  );
};

export default PlaygroundGeneration(Preview);
