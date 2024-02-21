import React from 'react';
import { ChartLegend, Donut, makeDataHintsContainer, Plot } from '@semcore/ui/d3-chart';
import { Flex } from '@semcore/ui/flex-box';
import Card from '@semcore/ui/card';

const dataHints = makeDataHintsContainer();

const Demo = () => {
  const width = 250;
  const height = 250;

  const [legendItems, setLegendItems] = React.useState(
    Object.keys(data).map((item, index) => {
      return {
        id: item,
        label: `Dataset${item}`,
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
    <Card w={'550px'}>
      <Card.Header pt={4}>
        <Card.Title tag={'h4'} m={0} inline={true}>
          Chart legend
        </Card.Title>
      </Card.Header>
      <Card.Body tag={Flex} direction='row'>
        <ChartLegend
          direction={'column'}
          wMin={100}
          items={legendItems}
          onChangeVisibleItem={handleChangeVisible}
          onMouseEnterItem={handleMouseEnter}
          onMouseLeaveItem={handleMouseLeave}
          dataHints={dataHints}
          patterns
        />
        <Plot width={width} height={height} data={data} dataHints={dataHints} patterns>
          <Donut innerRadius={height / 2 - 50}>
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
      </Card.Body>
    </Card>
  );
};

const data = {
  1: 3,
  2: 1,
  3: 2,
};

export default Demo;
