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
} from 'intergalactic/d3-chart';
import { scaleLinear } from 'd3-scale';
import { curveCardinal } from 'd3-shape';

function formatDate(value, options) {
  return new Intl.DateTimeFormat('en', options).format(value);
}

const dataHints = makeDataHintsContainer();

const Demo = () => {
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
      .map((item, index) => {
        return {
          id: item,
          label: `Line (${item})`,
          checked: true,
          color: `chart-palette-order-${index + 1}`,
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
        patterns
      />
      <Plot
        data={data}
        scale={[xScale, yScale]}
        width={width}
        height={height}
        dataHints={dataHints}
        patterns={true}
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
        {legendItems.map((item) => {
          return (
            item.checked && (
              <Area key={item.id} x='time' y={item.id} curve={curveCardinal} color={item.color}>
                <Area.Dots display />
              </Area>
            )
          );
        })}
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

export default Demo;
