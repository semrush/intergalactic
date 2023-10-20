import React from 'react';
// @ts-ignore
import PlaygroundGeneration from '@components/PlaygroundGeneration';
// @ts-ignore
import { chartPlayground } from '@components/ChartPlayground';
import { Chart } from '@semcore/d3-chart';
import resolveColor from '@semcore/ui/utils/lib/color';

const lineColors = {
  Line1: resolveColor('blue-300'),
  Line2: resolveColor('green-200'),
  Line3: resolveColor('yellow-200'),
};

const data = [...Array(5).keys()].map((d, i) => ({
  x: i,
  Line1: Math.random() * 10,
  Line2: Math.random() * 10,
  Line3: Math.random() * 10,
}));

const Preview = (preview) => {
  const { select, radio, label, bool } = preview('Chart.Bar');

  const {
    direction,
    alignItems,
    justifyContent,
    hideXAxis,
    hideYAxis,
    hideTooltip,
    showTotalInTooltip,
    hideLegend,
    legendProps,
  } = chartPlayground(
    { select, radio, label, bool },
    { invertAxis: true, showTotalInTooltip: true },
  );

  return (
    // @ts-ignore
    <Chart.Bar
      groupKey={'x'}
      type={'stack'}
      colorMap={lineColors}
      invertAxis={true}
      hideXAxis={hideXAxis}
      hideYAxis={hideYAxis}
      plotWidth={500}
      plotHeight={300}
      legendProps={legendProps}
      direction={direction}
      alignItems={alignItems}
      justifyContent={justifyContent}
      hideLegend={hideLegend}
      hideTooltip={hideTooltip}
      data={data}
      showTotalInTooltip={showTotalInTooltip}
    />
  );
};

export default PlaygroundGeneration(Preview);
