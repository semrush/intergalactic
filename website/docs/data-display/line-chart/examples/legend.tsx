import React from 'react';
import Card from '@semcore/ui/card';
import { Line, minMax, Plot, XAxis, YAxis, ChartLegend, LegendItem } from '@semcore/ui/d3-chart';
import { Flex } from '@semcore/ui/flex-box';
import resolveColor from '@semcore/ui/utils/lib/color';
import { scaleLinear } from 'd3-scale';

const lineColors = {
  Line1: resolveColor('blue-300'),
  Line2: resolveColor('green-200'),
  Line3: resolveColor('orange-400'),
};

export default () => {
  const MARGIN = 30;
  const width = 500;
  const height = 300;

  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain(minMax(data, 'x'));

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 10]);

  const [legendItems, setLegendItems] = React.useState(
    Object.keys(data[0])
      .filter((name) => name !== 'x')
      .reduce<LegendItem[]>((res, item) => {
        res.push({
          id: item,
          label: item,
          checked: true,
          color: lineColors[item],
        });

        return res;
      }, []),
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
        <Card.Title tag={'h4'} m={0} hint={'Chart about ...'} inline={true}>
          Chart legend
        </Card.Title>
      </Card.Header>
      <Card.Body tag={Flex} direction='column'>
        <ChartLegend.Flex
          items={legendItems}
          onChangeVisibleItem={handleChangeVisible}
          onMouseEnterItem={handleMouseEnter}
          onMouseLeaveItem={handleMouseLeave}
        />
        <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
          <YAxis>
            <YAxis.Ticks ticks={yScale.ticks(4)} />
            <YAxis.Grid ticks={yScale.ticks(4)} />
          </YAxis>
          <XAxis>
            <XAxis.Ticks ticks={xScale.ticks(5)} />
          </XAxis>
          {legendItems.map((item, index) => {
            return (
              item.checked && (
                <Line
                  x='x'
                  y={item.id}
                  key={item.id}
                  color={lineColors[item.id]}
                  transparent={highlightedLine !== -1 && highlightedLine !== index}
                >
                  <Line.Dots display />
                </Line>
              )
            );
          })}
        </Plot>
      </Card.Body>
    </Card>
  );
};

const data = [...Array(5).keys()].map((d, i) => ({
  x: i,
  Line1: Math.random() * 10,
  Line2: Math.random() * 10,
  Line3: Math.random() * 10,
}));
