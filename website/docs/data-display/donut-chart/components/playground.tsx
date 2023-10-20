import React from 'react';
// @ts-ignore
import PlaygroundGeneration from '@components/PlaygroundGeneration';
// @ts-ignore
import { chartPlayground } from '@components/ChartPlayground';
import { Chart } from '@semcore/d3-chart';
import resolveColor from '@semcore/ui/utils/lib/color';
import { curveCardinal, curveLinearClosed, curveBumpX } from 'd3-shape';

const lineColors = {
  a: resolveColor('blue-300'),
  b: resolveColor('green-200'),
  c: resolveColor('orange-400'),
};

const data = {
  a: 3,
  b: 1,
  c: 2,
};

const Preview = (preview) => {
  const { select, radio, label, bool, text } = preview('ChartDonut');

  const {
    direction,
    alignItems,
    justifyContent,
    hideXAxis,
    hideYAxis,
    hideTooltip,
    hideLegend,
    legendProps,
  } = chartPlayground(
    { select, radio, label, bool },
    { direction: 'row-reverse', legendDirection: 'column' },
  );

  label({ label: 'Donut props', key: 'donutProps' });

  const halfSize = bool({
    key: 'halfSize',
    defaultValue: false,
    label: 'Half size',
  });

  const innerRadius = text({
    key: 'innerRadius',
    defaultValue: 100,
    label: 'Inner Radius',
  });

  const innerLabel = text({
    key: 'innerLabel',
    defaultValue: 'Example',
    label: 'Inner Label',
  });

  legendProps.legendMap = {
    a: { label: 'Nuts' },
    b: { label: 'fruits' },
    c: { label: 'Milk' },
  };

  return (
    // @ts-ignore
    <Chart.Donut
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
      innerRadius={innerRadius}
      halfsize={halfSize}
      innerLabel={innerLabel}
    />
  );
};

export default PlaygroundGeneration(Preview);
