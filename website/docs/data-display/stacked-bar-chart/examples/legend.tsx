import React from 'react';
import { Plot, StackBar, YAxis, XAxis, ChartLegend, LegendItem } from '@semcore/ui/d3-chart';
import { scaleLinear, scaleBand } from 'd3-scale';
import { Flex } from '@semcore/ui/flex-box';
import resolveColor from '@semcore/ui/utils/lib/color';
import Card from '@semcore/ui/card';

const barColors = {
  Dataset1: resolveColor('blue-300'),
  Dataset2: resolveColor('blue-200'),
  Dataset3: resolveColor('yellow-200'),
};

export default () => {
  const MARGIN = 30;
  const width = 500;
  const height = 300;

  const xScale = scaleBand()
    .range([MARGIN, width - MARGIN])
    .domain(data.map((d) => d.category))
    .paddingInner(0.4)
    .paddingOuter(0.2);

  const yScale = scaleLinear()
    .range([height - MARGIN, 0])
    .domain([0, 15]);

  const [bars, setBars] = React.useState(
    Object.keys(data[0])
      .filter((name) => name !== 'category')
      .reduce<Record<string, LegendItem>>((res, item) => {
        res[item] = {
          id: item,
          label: item,
          checked: true,
          color: barColors[item],
        };

        return res;
      }, {}),
  );

  const [opacityBars, setOpacityBars] = React.useState(
    Object.keys(bars).reduce((o, key) => ({ ...o, [key]: false }), {}),
  );
  const displayedBarsList = React.useMemo(
    () =>
      Object.entries(bars)
        .filter(([, barItem]) => barItem.checked)
        .map(([stack]) => stack),
    [bars],
  );

  const handleMouseEnter = (stack) => {
    if (displayedBarsList.includes(stack)) {
      const opacity = { ...opacityBars };

      Object.keys(opacity).forEach((key) => {
        if (key !== stack) {
          opacity[key] = true;
        }
      });

      setOpacityBars({ ...opacity });
    }
  };

  const handleMouseLeave = () => {
    setOpacityBars(Object.keys(bars).reduce((o, key) => ({ ...o, [key]: false }), {}));
  };

  return (
    <Card w={'550px'}>
      <Card.Header pt={4}>
        <Card.Title tag={'h4'} m={0} inline={true}>
          Chart legend
        </Card.Title>
      </Card.Header>
      <Card.Body tag={Flex} direction='column'>
        <ChartLegend.Flex
          items={bars}
          onChangeVisibleItem={(key, isVisible) => {
            setBars((prevDisplayedLines) => ({
              ...prevDisplayedLines,
              [key]: {
                ...prevDisplayedLines[key],
                checked: isVisible,
              },
            }));
          }}
          onMouseEnterItem={handleMouseEnter}
          onMouseLeaveItem={handleMouseLeave}
        />
        <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
          <YAxis>
            <YAxis.Ticks />
            <YAxis.Grid />
          </YAxis>
          <XAxis>
            <XAxis.Ticks />
          </XAxis>
          <StackBar x='category'>
            {displayedBarsList.map((stack) => (
              <StackBar.Bar
                y={stack}
                key={stack}
                color={barColors[stack]}
                transparent={opacityBars[stack]}
              />
            ))}
          </StackBar>
        </Plot>
      </Card.Body>
    </Card>
  );
};

const data = [...Array(5).keys()].map((d, i) => ({
  category: `Category ${i}`,
  Dataset1: Math.random() * 5,
  Dataset2: Math.random() * 5,
  Dataset3: Math.random() * 5,
}));
