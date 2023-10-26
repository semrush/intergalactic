import React from 'react';
import { ChartLegend, Donut, LegendItem, makeDataHintsContainer, Plot } from '@semcore/ui/d3-chart';
import { Flex } from '@semcore/ui/flex-box';
import Card from '@semcore/ui/card';
import resolveColor from '@semcore/ui/utils/lib/color';

const pieColors = {
  1: resolveColor('blue-300'),
  2: resolveColor('violet-400'),
  3: resolveColor('green-200'),
};

const dataHints = makeDataHintsContainer();

export default () => {
  const width = 250;
  const height = 250;

  const [legendItems, setLegendItems] = React.useState(
    Object.keys(data).map((item) => {
      return {
        id: item,
        label: `Dataset${item}`,
        checked: true,
        color: pieColors[item],
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
        <ChartLegend.Flex
          direction={'column'}
          wMin={100}
          items={legendItems}
          onChangeVisibleItem={handleChangeVisible}
          onMouseEnterItem={handleMouseEnter}
          onMouseLeaveItem={handleMouseLeave}
          dataHints={dataHints}
        />
        <Plot width={width} height={height} data={data} dataHints={dataHints}>
          <Donut innerRadius={height / 2 - 50}>
            {legendItems.map((pie, index) => {
              return (
                pie.checked && (
                  <Donut.Pie
                    dataKey={pie.id}
                    key={pie.id}
                    name={pie.label}
                    color={pieColors[pie.id]}
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
