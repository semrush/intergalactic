import React from 'react';
import {
  Plot,
  XAxis,
  YAxis,
  minMax,
  Area,
  interpolateValue,
  ChartLegend,
  makeDataHintsContainer,
} from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';
import { curveCardinal } from 'd3-shape';
import resolveColor from '@semcore/utils/lib/color';

function formatDate(value, options) {
  return new Intl.DateTimeFormat('en', options).format(value);
}

const lineColors = {
  line1: resolveColor('blue-300'),
  line2: resolveColor('green-200'),
};

const dataHints = makeDataHintsContainer();

export default () => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;

  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain(minMax(data, 'time'));

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 10]);

  const [legendItems, setLegendItems] = React.useState(
    Object.keys(data[0])
      .filter((name) => name !== 'time')
      .map((item) => {
        return {
          id: item,
          label: `Line (${item})`,
          checked: true,
          color: lineColors[item],
        };
      }),
  );

  const handleChangeVisible = React.useCallback((id: string, isVisible: boolean) => {
    setLegendItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === id) {
          item.checked = isVisible;
        }

        return item;
      });
    });
  }, []);

  return (
    <>
      <ChartLegend
        dataHints={dataHints}
        items={legendItems}
        onChangeVisibleItem={handleChangeVisible}
      />
      <Plot
        data={data}
        scale={[xScale, yScale]}
        width={width}
        height={height}
        dataHints={dataHints}
      >
        <YAxis>
          <YAxis.Ticks />
          <YAxis.Grid />
        </YAxis>
        <XAxis>
          <XAxis.Ticks ticks={data.map((d) => +d.time)}>
            {({ value }) => ({
              children: formatDate(value, {
                month: 'short',
                day: 'numeric',
              }),
            })}
          </XAxis.Ticks>
        </XAxis>
        <Area x='time' y='line1' curve={curveCardinal} color={lineColors.line1}>
          <Area.Dots display />
        </Area>
        <Area x='time' y='line2' curve={curveCardinal} color={lineColors.line2}>
          <Area.Dots display />
        </Area>
      </Plot>
    </>
  );
};

const data = [
  {
    time: new Date(Date.now() + 5 * 60 * 60 * 1000),
    line1: 5,
    line2: 3,
  },
  {
    time: new Date(Date.now() + 10 * 60 * 60 * 1000),
    line1: 8,
    line2: interpolateValue,
  },
  {
    time: new Date(Date.now() + 15 * 60 * 60 * 1000),
    line1: 4,
    line2: 8,
  },
  {
    time: new Date(Date.now() + 20 * 60 * 60 * 1000),
    line1: 5,
    line2: interpolateValue,
  },
  {
    time: new Date(Date.now() + 25 * 60 * 60 * 1000),
    line1: 5,
    line2: interpolateValue,
  },
  {
    time: new Date(Date.now() + 30 * 60 * 60 * 1000),
    line1: 3,
    line2: 1,
  },
];
