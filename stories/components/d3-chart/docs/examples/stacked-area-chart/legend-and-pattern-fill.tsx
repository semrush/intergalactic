import {
  Plot,
  XAxis,
  YAxis,
  minMax,
  StackedArea,
  HoverLine,
  makeDataHintsContainer,
  ChartLegend,
} from '@semcore/d3-chart';
import { Flex, Box } from '@semcore/ui/base-components';
import { Text } from '@semcore/ui/typography';
import { scaleLinear } from 'd3-scale';
import { curveCardinal } from 'd3-shape';
import React from 'react';

function formatDate(value: any, options: any) {
  return new Intl.DateTimeFormat('en', options).format(value);
}

const lineColors: Record<string, string> = {
  1: '--blue-300',
  2: '--green-200',
  3: '--orange-400',
};

const dataHints = makeDataHintsContainer();

type DataItem = {
  time: Date;
  1: number;
  2: number;
  3: number;
};

const getDegaultLegendItems = () => {
  return Object.keys(data[0])
    .filter((name) => name !== 'time')
    .map((item) => {
      return {
        id: item,
        label: `Stack ${item}`,
        checked: true,
        color: lineColors[item],
      };
    });
};

const Demo = () => {
  const [legendItems, setLegendItems] = React.useState(getDegaultLegendItems);

  const handleChangeVisible = React.useCallback((id: string, isVisible: boolean) => {
    setLegendItems((prevItems) => {
      const newItems = prevItems.map((item) => {
        if (item.id === id) {
          item.checked = isVisible;
        }

        return item;
      });

      return newItems;
    });
  }, []);

  const MARGIN = 28;
  const width = 500;
  const height = 260;

  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain(minMax(data, 'time'));

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 15]);

  return (
    <>
      <ChartLegend
        dataHints={dataHints}
        items={legendItems}
        shape='Checkbox'
        patterns
        aria-label='Stacked area chart legend'
        onChangeVisibleItem={handleChangeVisible}
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
        <HoverLine.Tooltip x='time' wMin={100}>
          {({ xIndex }) => {
            return {
              children: (
                <>
                  <HoverLine.Tooltip.Title>
                    {formatDate(data[xIndex].time, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </HoverLine.Tooltip.Title>

                  {legendItems.map((item) => {
                    return (
                      <Flex key={item.id} justifyContent='space-between'>
                        <HoverLine.Tooltip.Dot mr={4} color={lineColors[item.id]}>
                          {item.label}
                        </HoverLine.Tooltip.Dot>
                        {/* @ts-ignore */}
                        <Text bold>{data[xIndex][item.id as keyof DataItem]}</Text>
                      </Flex>
                    );
                  })}

                  <Flex mt={2} justifyContent='space-between'>
                    <Box mr={4}>Total</Box>
                    <Text bold>
                      {data[xIndex]['1'] + data[xIndex]['2'] + data[xIndex]['3']}
                    </Text>
                  </Flex>
                </>
              ),
            };
          }}
        </HoverLine.Tooltip>
        <StackedArea x='time'>
          {legendItems.map((item) =>
            item.checked
              ? (
                  <StackedArea.Area
                    key={item.id}
                    y={item.id}
                    fill={`chart-palette-order-${item.id}`}
                    color={lineColors[item.id]}
                    curve={curveCardinal}
                  >
                    <StackedArea.Area.Dots />
                  </StackedArea.Area>
                )
              : null,
          )}
        </StackedArea>
      </Plot>
    </>
  );
};

const date = new Date();
const data = [...Array(5).keys()].map((d, i) => ({
  time: new Date(date.setDate(date.getDate() + 5)),
  1: Math.random() * 5,
  2: Math.random() * 5,
  3: Math.random() * 5,
}));

export default Demo;
