import { Flex, Box } from '@semcore/ui/base-components';
import {
  Plot,
  XAxis,
  YAxis,
  minMax,
  StackedArea,
  HoverLine,
  makeDataHintsContainer,
  ChartLegend,
} from '@semcore/ui/d3-chart';
import { Text } from '@semcore/ui/typography';
import { scaleLinear } from 'd3-scale';
import React from 'react';

import StackedAreaMockData from '../../../__mocks__/stacked-area';

function formatDate(value: any, options: any) {
  return new Intl.DateTimeFormat('en', options).format(value);
}

const lineColors: Record<string, string> = {
  stack1: 'chart-palette-order-1',
  stack2: 'chart-palette-order-2',
  stack3: 'chart-palette-order-3',
};

const dataHints = makeDataHintsContainer();

type DataItem = typeof StackedAreaMockData.Default[0];

const getDegaultLegendItems = () => {
  return Object.keys(data[0])
    .filter((name) => name !== 'time')
    .map((item, index) => {
      return {
        id: item,
        label: `Stack ${index + 1}`,
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
                      {data[xIndex].stack1 + data[xIndex].stack2 + data[xIndex].stack3}
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

const data = StackedAreaMockData.Default;

export default Demo;
