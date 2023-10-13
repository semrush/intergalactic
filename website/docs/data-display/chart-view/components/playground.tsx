import React from 'react';
// @ts-ignore
import PlaygroundGeneration from '@components/PlaygroundGeneration';
import { Chart, LegendItem, LegendFlexProps } from '@semcore/d3-chart';
import resolveColor from '@semcore/ui/utils/lib/color';
import DesktopIcon from '@semcore/ui/icon/Desktop/m';
import { Intergalactic } from '@semcore/core';
import { IconProps } from '@semcore/icon';

const Preview = (preview) => {
  const { select, radio, text, bool } = preview('ChartView');

  const direction = radio({
    key: 'direction',
    defaultValue: 'row',
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

  const withIcon = bool({
    key: 'withIcon',
    defaultValue: false,
    label: 'With icon',
  });

  const additionLabel = text({
    key: 'additionLabel',
    defaultValue: '',
    label: 'Addition Label',
  });

  const count = text({
    key: 'count',
    defaultValue: '',
    label: 'Count',
  });

  const withTrend = bool({
    key: 'withTrend',
    defaultValue: false,
    label: 'With trend',
  });

  return (
    <Chart.Line
      data={data}
      xKey={'x'}
      colorMap={lineColors}
      legendMap={legendMap}
      width={500}
      height={300}
    />
  );
};

const legendMap = {
  Line1: { label: 'LINE1', count: 12 },
  Line2: { label: 'Line2', defaultChecked: false },
  Line3: {},
  Line4: {},
  Line5: {},
};

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

export default PlaygroundGeneration(Preview);
