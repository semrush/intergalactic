import React from 'react';
// @ts-ignore
import PlaygroundGeneration from '@components/PlaygroundGeneration';
import { Chart, LineChartProps } from '@semcore/d3-chart';
import resolveColor from '@semcore/ui/utils/lib/color';
import { curveCardinal, curveLinearClosed, curveBumpX } from 'd3-shape';

const lineColors = {
  Line1: resolveColor('blue-300'),
  Line2: resolveColor('green-200'),
  Line3: resolveColor('orange-400'),
  Line4: resolveColor('pink-300'),
  Line5: resolveColor('yellow-200'),
};

const data = [...Array(5).keys()].map((d, i) => ({
  x: i,
  Line1: Math.random() * 10,
  Line2: Math.random() * 10,
  Line3: Math.random() * 10,
  Line4: Math.random() * 10,
  Line5: Math.random() * 10,
}));

const curveMap = {
  curveCardinal,
  curveLinearClosed,
  curveBumpX,
};

const Preview = (preview) => {
  const { select, radio, text, bool } = preview('Chart.Line');

  const direction = radio({
    key: 'direction',
    defaultValue: 'column',
    label: 'Direction',
    options: ['row', 'column'],
  });

  const size = radio({
    key: 'size',
    defaultValue: 'm',
    label: 'Size',
    options: ['m', 'l'],
  });

  const shape = select({
    key: 'shape',
    defaultValue: 'Checkbox',
    label: 'Shape',
    options: ['Checkbox', 'Line', 'Circle', 'Square'],
  });

  const curveName = select({
    key: 'curveName',
    defaultValue: 'No curve',
    label: 'Curve',
    options: ['No curve', ...Object.keys(curveMap)],
  });

  const disableTooltip = bool({
    key: 'disableTooltip',
    defaultValue: false,
    label: 'Disable tooltip',
  });

  const disableDots = bool({
    key: 'disableDots',
    defaultValue: false,
    label: 'Disable dots',
  });

  const hideLegend = bool({
    key: 'hideLegend',
    defaultValue: false,
    label: 'Hide legend',
  });

  const disableCheck = bool({
    key: 'disableCheck',
    defaultValue: false,
    label: 'Disable check',
  });

  const disableSelect = bool({
    key: 'disableSelect',
    defaultValue: false,
    label: 'Disable select',
  });

  const legendProps: LineChartProps['legendProps'] = {
    shape,
    size,
    disableSelectItems: disableSelect,
    disableCheckedItems: disableCheck,
  };

  return (
    // @ts-ignore
    <Chart.Line
      data={data}
      xKey={'x'}
      colorMap={lineColors}
      width={500}
      height={300}
      legendProps={legendProps}
      direction={direction}
      hideLegend={hideLegend}
      disableTooltip={disableTooltip}
      disableDots={disableDots}
      curve={curveMap[curveName]}
    />
  );
};

export default PlaygroundGeneration(Preview);
