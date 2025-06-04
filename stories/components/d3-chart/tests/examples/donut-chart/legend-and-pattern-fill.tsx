import React from 'react';
import { ChartLegend, Donut, makeDataHintsContainer, Plot, Chart } from '@semcore/d3-chart';
import { Flex } from '@semcore/flex-box';

const dataHints = makeDataHintsContainer();

const Demo = () => {
  const width = 250;
  const height = 250;

  const [legendItems, setLegendItems] = React.useState(
    Object.keys(data).map((item, index) => {
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
    <Flex direction='row' gap={5} mb={4}>
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
        direction={'column'}
        wMin={100}
        items={legendItems}
        onChangeVisibleItem={handleChangeVisible}
        onMouseEnterItem={handleMouseEnter}
        onMouseLeaveItem={handleMouseLeave}
        dataHints={dataHints}
        patterns
        aria-label={'Donut chart legend'}
      />
    </Flex>

    <Flex direction='row' gap={5}>
    <Chart.Donut plotWidth={300} plotHeight={300} data={data} aria-label={'Donut chart'} 
     alignItems="flex-start"
  direction="row"
  innerLabel="Example"
  showLegend={true}
  showXAxis={true}
  showYAxis={true}
  innerRadius={60}
    legendProps={{

      disableHoverItems: true,
      disableSelectItems: false,
      legendMap: {
        a: {
          label: 'Nuts'
        },
        b: {
          label: 'Fruits'
        },
        c: {
          label: 'Milk'
        }
      },
      shape: 'Checkbox',
      size: 'l'
    }}
    />
</Flex>

    </>
  );
};

const data = {
  1: 3,
  2: 1,
  3: 2,
};

export default Demo;
