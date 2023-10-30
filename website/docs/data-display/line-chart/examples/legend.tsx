import React from 'react';
import Card from '@semcore/ui/card';
import { Line, minMax, Plot, XAxis, YAxis } from '@semcore/ui/d3-chart';
import { Flex } from '@semcore/ui/flex-box';
import { scaleLinear } from 'd3-scale';
import Checkbox from '@semcore/ui/checkbox';

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

  const linesList = Object.keys(data[0]).filter((name) => name !== 'x');
  const [displayLines, setDisplayLines] = React.useState(
    linesList.reduce((o, key) => ({ ...o, [key]: true }), {}),
  );
  const [opacityLines, setOpacityLines] = React.useState(
    linesList.reduce((o, key) => ({ ...o, [key]: false }), {}),
  );
  const displayedLinesList = React.useMemo(
    () =>
      Object.entries(displayLines)
        .filter(([, displayed]) => displayed)
        .map(([line]) => line),
    [displayLines],
  );

  const handleMouseEnter = (line) => () => {
    if (displayedLinesList.includes(line)) {
      const opacity = { ...opacityLines };

      Object.keys(opacity).forEach((key) => {
        if (key !== line) {
          opacity[key] = true;
        }
      });

      setOpacityLines({ ...opacity });
    }
  };

  const handleMouseLeave = () => {
    setOpacityLines(linesList.reduce((o, key) => ({ ...o, [key]: false }), {}));
  };

  return (
    <Card w={'550px'}>
      <Card.Header pt={4}>
        <Card.Title tag={'h4'} m={0} hint={'Chart about ...'} inline={true}>
          Chart legend
        </Card.Title>
      </Card.Header>
      <Card.Body tag={Flex} direction='column'>
        <Flex flexWrap w={width} mt={1}>
          {linesList.map((line, index) => {
            return (
              <Checkbox
                key={line}
                theme={`chart-palette-order-${index + 1}`}
                mr={4}
                mb={2}
                onMouseEnter={handleMouseEnter(line)}
                onMouseLeave={handleMouseLeave}
              >
                <Checkbox.Value
                  checked={displayLines[line]}
                  onChange={(checked) =>
                    setDisplayLines((prevDisplayedLines) => ({
                      ...prevDisplayedLines,
                      [line]: checked,
                    }))
                  }
                />
                <Checkbox.Text>{line}</Checkbox.Text>
              </Checkbox>
            );
          })}
        </Flex>
        <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
          <YAxis>
            <YAxis.Ticks ticks={yScale.ticks(4)} />
            <YAxis.Grid ticks={yScale.ticks(4)} />
          </YAxis>
          <XAxis>
            <XAxis.Ticks ticks={xScale.ticks(5)} />
          </XAxis>
          {displayedLinesList.map((line, index) => {
            return (
              <Line
                x='x'
                y={line}
                key={line}
                color={`chart-palette-order-${index + 1}`}
                transparent={opacityLines[line]}
              >
                <Line.Dots display />
              </Line>
            );
          })}
        </Plot>
      </Card.Body>
    </Card>
  );
};

const data = [...Array(5).keys()].map((d, i) => ({
  x: i,
  line1: Math.random() * 10,
  line2: Math.random() * 10,
  line3: Math.random() * 10,
}));
