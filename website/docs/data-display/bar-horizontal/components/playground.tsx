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
};

const data = [...Array(5).keys()].map((d, i) => ({
  x: i,
  Line1: Math.random() * 10,
  Line2: Math.random() * 10,
}));

const Preview = (preview) => {
  const { select, radio, label, bool } = preview('Chart.Bar');

  const {
    direction,
    alignItems,
    showTotalInTooltip,
    justifyContent,
    hideXAxis,
    hideYAxis,
    hideTooltip,
    hideLegend,
    legendProps,
  } = chartPlayground({ select, radio, label, bool }, { invertAxis: true });

  const withTrend = bool({
    key: 'withTrend',
    defaultValue: false,
    label: 'With trend',
  });

  legendProps.withTrend = withTrend;

  return (
    // @ts-ignore
    <Chart.Bar
      groupKey={'x'}
      colorMap={lineColors}
      invertAxis={true}
      hideXAxis={hideXAxis}
      hideYAxis={hideYAxis}
      showTotalInTooltip={showTotalInTooltip}
      plotWidth={500}
      plotHeight={300}
      legendProps={legendProps}
      direction={direction}
      alignItems={alignItems}
      justifyContent={justifyContent}
      hideLegend={hideLegend}
      hideTooltip={hideTooltip}
      data={data}
    />
  );
};

export default PlaygroundGeneration(Preview);
