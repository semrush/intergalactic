import { Flex } from '@semcore/ui/base-components';
import { Plot, Bubble, XAxis, YAxis, ChartLegend, makeDataHintsContainer } from '@semcore/ui/d3-chart';
import { Text } from '@semcore/ui/typography';
import { scaleLinear } from 'd3-scale';
import React from 'react';

import BubbleMockData from '../../../__mocks__/d3-chart/bubble';

const dataHints = makeDataHintsContainer();

const getDefaultLegendItems = () => {
  return data.map((item, index) => {
    return {
      id: index.toString(),
      label: item.label,
      checked: true,
      color: item.color,
    };
  });
};

const Demo = () => {
  const [legendItems, setLegendItems] = React.useState(getDefaultLegendItems);

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

  const MARGIN = 40;
  const width = 500;
  const height = 300;

  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain([0, 10]);

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([-2, 10]);

  return (
    <Flex direction='column'>
      <ChartLegend
        dataHints={dataHints}
        items={legendItems}
        patterns
        aria-label='Bubble chart legend'
        onChangeVisibleItem={handleChangeVisible}
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
        <Bubble x='x' y='y' value='value' label='label' color='color'>
          {legendItems.map(({ checked, id }, index) => (
            <Bubble.Circle visible={checked} key={id} index={index} />
          ))}
        </Bubble>
        <Bubble.Tooltip>
          {({ index }) => {
            return {
              children: (
                <>
                  <Bubble.Tooltip.Title>Data</Bubble.Tooltip.Title>
                  <Text tag='div'>
                    X axis
                    {' '}
                    {data[index].x}
                  </Text>
                  <Text tag='div'>
                    Y axis
                    {' '}
                    {data[index].y}
                  </Text>
                  <Text tag='div'>
                    Value
                    {' '}
                    {data[index].value}
                  </Text>
                </>
              ),
            };
          }}
        </Bubble.Tooltip>
      </Plot>
    </Flex>
  );
};

const data = BubbleMockData.LabelAndColor;

export default Demo;
