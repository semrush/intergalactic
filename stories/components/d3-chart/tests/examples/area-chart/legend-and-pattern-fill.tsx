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
import React from 'react';

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
      .map((item, index) => ({
        id: item,
        label: `Line ${index + 1}`,
        checked: true,
        color: `chart-palette-order-${index + 1}`,
      })),
  );

  const [highlightedLine, setHighlightedLine] = React.useState<number>(-1);

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

  const handleMouseEnter = React.useCallback(
    (id: string) => {
      setHighlightedLine(legendItems.findIndex((line) => line.id === id));
    },
    [legendItems],
  );

  const handleMouseLeave = React.useCallback(() => {
    setHighlightedLine(-1);
  }, []);

  const onClickHandler = (index: number, event: React.SyntheticEvent) => {
    const clickedItem = data[index];
    console.log('Clicked area chart point:');
    console.log('→ Index:', index);
    console.log('→ Data item:', clickedItem);
    console.log('→ Event:', event);
  };
  return (
    <>
      <ChartLegend
        dataHints={dataHints}
        items={legendItems}
        onChangeVisibleItem={handleChangeVisible}
        onMouseEnterItem={handleMouseEnter}
        onMouseLeaveItem={handleMouseLeave}
        patterns
        aria-label='Area chart legend'
      />
      <Plot
        data={data}
        scale={[xScale, yScale]}
        width={width}
        height={height}
        dataHints={dataHints}
        patterns
      >
        <YAxis>
          <YAxis.Ticks />
          <YAxis.Grid />
        </YAxis>
        <XAxis>
          <XAxis.Ticks ticks={data.map((d) => +d.time)}>
            {({ value }) => ({
              children: new Intl.DateTimeFormat('en', {
                month: 'short',
                day: 'numeric',
              }).format(value),
            })}
          </XAxis.Ticks>
        </XAxis>
        {legendItems
          .filter((item) => item.checked)
          .map((item, index) => (
            <Area
              key={item.id}
              x='time'
              y={item.id}
              curve={curveCardinal}
              color={item.color}
              transparent={highlightedLine !== -1 && highlightedLine !== index}
              onClick={onClickHandler}
            >
              <Area.Dots display />
            </Area>
          ))}
      </Plot>
    </>
  );
};

const data = [
  {
    time: new Date('2024-01-01T00:00:00Z'),
    line1: 5,
    line2: 3,
  },
  {
    time: new Date('2024-01-01T05:00:00Z'),
    line1: 8,
    line2: interpolateValue,
  },
  {
    time: new Date('2024-01-01T10:00:00Z'),
    line1: 4,
    line2: 8,
  },
  {
    time: new Date('2024-01-01T15:00:00Z'),
    line1: 5,
    line2: interpolateValue,
  },
  {
    time: new Date('2024-01-01T20:00:00Z'),
    line1: 5,
    line2: interpolateValue,
  },
  {
    time: new Date('2024-01-02T01:00:00Z'),
    line1: 3,
    line2: 1,
  },
];

export default Demo;
