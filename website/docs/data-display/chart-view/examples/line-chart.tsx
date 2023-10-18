import React from 'react';
import { Chart, LegendItem, LegendFlexProps } from '@semcore/d3-chart';
import resolveColor from '@semcore/ui/utils/lib/color';
import DesktopIcon from '@semcore/ui/icon/Desktop/m';
import { Intergalactic } from '@semcore/core';
import { IconProps } from '@semcore/icon';

export default () => {
  return <Chart.Line data={data} xKey={'x'} colorMap={lineColors} width={500} height={300} />;
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
