import { Flex } from '@semcore/ui/base-components';
import { ChartLegend, Donut, makeDataHintsContainer, Plot } from '@semcore/ui/d3-chart';
import React from 'react';

import DonutMockData from '../../../__mocks__/d3-chart/donut';

const dataHints = makeDataHintsContainer();

const Demo = () => {
  const width = 250;
  const height = 250;

  const [legendItems, setLegendItems] = React.useState(
    Object.keys(data).map((item, index) => {
      return {
        id: item,
        label: `Category ${index + 1}`,
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
    <Flex direction='row' gap={5}>
      <Plot width={width} height={height} data={data} dataHints={dataHints} patterns>
        <Donut innerRadius={height / 2 - 50}>
          {legendItems.filter((item) => item.checked).length === 0 && <Donut.EmptyData />}
          {legendItems.map((item, index) => {
            return (
              item.checked && (
                <Donut.Pie
                  dataKey={item.id}
                  key={item.id}
                  name={item.label}
                  color={item.color}
                  transparent={highlightedLine !== -1 && highlightedLine !== index}
                />
              )
            );
          })}
        </Donut>
      </Plot>
      <ChartLegend
        direction='column'
        wMin={100}
        items={legendItems}
        onChangeVisibleItem={handleChangeVisible}
        onMouseEnterItem={handleMouseEnter}
        onMouseLeaveItem={handleMouseLeave}
        dataHints={dataHints}
        patterns
        aria-label='Donut chart legend'
      />
    </Flex>
  );
};

const data = DonutMockData.Default;

export default Demo;
