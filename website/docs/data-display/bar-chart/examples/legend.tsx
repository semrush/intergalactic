import React from 'react';
import {
  Plot,
  GroupBar,
  YAxis,
  XAxis,
  HoverRect,
  colors,
  LegendItem,
  makeDataHintsContainer,
  ChartLegend,
} from '@semcore/ui/d3-chart';
import { scaleLinear, scaleBand } from 'd3-scale';
import { Flex } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';
import resolveColor from '@semcore/utils/src/color';

const lineColors = {
  1: resolveColor('blue-300'),
  2: resolveColor('green-200'),
};

const dataHints = makeDataHintsContainer();

export default () => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;

  const xScale = scaleBand()
    .range([MARGIN, width - MARGIN])
    .domain(data.map((d) => d.category))
    .paddingInner(0.4)
    .paddingOuter(0.2);

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 10]);

  const [legendItems, setLegendItems] = React.useState(
    Object.keys(data[0])
      .filter((name) => name !== 'category')
      .map((item) => {
        return {
          id: item,
          label: `Bar ${item}`,
          checked: true,
          color: lineColors[item],
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
          <XAxis.Ticks />
        </XAxis>
        <GroupBar x='category'>
          {legendItems
            .filter((item) => item.checked)
            .map((item, index) => {
              return (
                <GroupBar.Bar
                  y={item.id}
                  color={lineColors[item.id]}
                  transparent={highlightedLine !== -1 && highlightedLine !== index}
                />
              );
            })}
        </GroupBar>
        <HoverRect.Tooltip x='category' wMin={100}>
          {({ xIndex }) => ({
            children: (
              <>
                <HoverRect.Tooltip.Title>{data[xIndex].category}</HoverRect.Tooltip.Title>
                <Flex justifyContent='space-between'>
                  <HoverRect.Tooltip.Dot mr={4} color={lineColors[1]}>
                    Bar 1
                  </HoverRect.Tooltip.Dot>
                  <Text bold>{data[xIndex][1]}</Text>
                </Flex>
                <Flex mt={2} justifyContent='space-between'>
                  <HoverRect.Tooltip.Dot mr={4} color={lineColors[2]}>
                    Bar 2
                  </HoverRect.Tooltip.Dot>
                  <Text bold>{data[xIndex][2]}</Text>
                </Flex>
              </>
            ),
          })}
        </HoverRect.Tooltip>
      </Plot>
    </>
  );
};

const data = Array(5)
  .fill({})
  .map((d, i) => ({
    category: `Category ${i}`,
    1: Math.random() * 10,
    2: Math.random() * 10,
  }));
