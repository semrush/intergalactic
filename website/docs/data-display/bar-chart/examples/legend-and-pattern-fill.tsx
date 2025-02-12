import React from 'react';
import {
  Plot,
  GroupBar,
  YAxis,
  XAxis,
  HoverRect,
  makeDataHintsContainer,
  ChartLegend,
} from '@semcore/d3-chart';
import { scaleLinear, scaleBand } from 'd3-scale';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

const dataHints = makeDataHintsContainer();

const Demo = () => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;

  const xScale = scaleBand()
    .range([MARGIN, width - MARGIN])
    .domain(data.map((d) => d.bar))
    .paddingInner(0.4)
    .paddingOuter(0.2);

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 10]);

  const [legendItems, setLegendItems] = React.useState(
    Object.keys(data[0])
      .filter((name) => name !== 'bar')
      .map((item, index) => {
        return {
          id: item,
          label: `Category ${item}`,
          checked: true,
          color: `chart-palette-order-${index + 1}`,
        };
      }),
  );

  const [highlightedLine, setHighlightedLine] = React.useState(-1);

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

  const handleMouseEnter = React.useCallback((id: string) => {
    setHighlightedLine(legendItems.findIndex((line) => line.id === id));
  }, []);
  const handleMouseLeave = React.useCallback(() => {
    setHighlightedLine(-1);
  }, []);

  return (
    <>
      <ChartLegend
        dataHints={dataHints}
        items={legendItems}
        onChangeVisibleItem={handleChangeVisible}
        onMouseEnterItem={handleMouseEnter}
        onMouseLeaveItem={handleMouseLeave}
        patterns
        aria-label={'Bar chart legend'}
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
          <XAxis.Ticks />
        </XAxis>
        <HoverRect.Tooltip x='bar' wMin={100}>
          {({ xIndex }) => ({
            children: (
              <>
                <HoverRect.Tooltip.Title>{data[xIndex].bar}</HoverRect.Tooltip.Title>
                <Flex justifyContent='space-between'>
                  <HoverRect.Tooltip.Dot mr={4} color={legendItems[0].color}>
                    Bar 1
                  </HoverRect.Tooltip.Dot>
                  <Text bold>{data[xIndex][1]}</Text>
                </Flex>
                <Flex mt={2} justifyContent='space-between'>
                  <HoverRect.Tooltip.Dot mr={4} color={legendItems[1].color}>
                    Bar 2
                  </HoverRect.Tooltip.Dot>
                  <Text bold>{data[xIndex][2]}</Text>
                </Flex>
              </>
            ),
          })}
        </HoverRect.Tooltip>
        <GroupBar x='bar'>
          {legendItems
            .filter((item) => item.checked)
            .map((item, index) => {
              return (
                <GroupBar.Bar
                  y={item.id}
                  color={item.color}
                  transparent={highlightedLine !== -1 && highlightedLine !== index}
                />
              );
            })}
        </GroupBar>
      </Plot>
    </>
  );
};

const data = Array(5)
  .fill({})
  .map((d, i) => ({
    bar: `Bar ${i + 1}`,
    1: Math.random() * 10,
    2: Math.random() * 10,
  }));

export default Demo;
