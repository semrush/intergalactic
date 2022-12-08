import React from 'react';
import { Donut, Plot, Tooltip } from '@semcore/ui/d3-chart';
import { Flex } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';
import Card from '@semcore/ui/card';
import Checkbox from '@semcore/ui/checkbox';
import resolveColor from '@semcore/ui/utils/lib/color';

const pieColors = {
  a: resolveColor('blue-300'),
  b: resolveColor('violet-400'),
  c: resolveColor('green-200'),
};

export default () => {
  const width = 250;
  const height = 250;

  const checkboxesList = ['a', 'b', 'c'];
  const [displayPie, setDisplayPie] = React.useState({ a: true, b: true, c: true });
  const displayedPiesList = React.useMemo(
    () =>
      Object.entries(displayPie)
        .filter(([, displayed]) => displayed)
        .map(([line]) => line),
    [displayPie],
  );

  return (
    <Card w={'550px'}>
      <Card.Header pt={4}> Chart legend</Card.Header>
      <Card.Body tag={Flex} direction="column">
        <Plot width={width} height={height} data={data}>
          <Donut innerRadius={height / 2 - 50}>
            {displayedPiesList.map((marker) => (
              <Donut.Pie dataKey={marker} key={marker} name={marker} color={pieColors[marker]} />
            ))}
          </Donut>
          <Tooltip>
            {({ dataKey, name }) => {
              return {
                children: (
                  <>
                    <Tooltip.Title>{name}</Tooltip.Title>
                    <Flex justifyContent="space-between">
                      <Text bold>{data[dataKey]}</Text>
                    </Flex>
                  </>
                ),
              };
            }}
          </Tooltip>
        </Plot>
        <Flex flexWrap w={width}>
          {checkboxesList.map((pie) => {
            return (
              <Checkbox key={pie} theme={pieColors[pie]} mr={4} mb={2}>
                <Checkbox.Value
                  checked={displayPie[pie]}
                  onChange={(checked) =>
                    setDisplayPie((prevDisplayedLines) => ({
                      ...prevDisplayedLines,
                      [pie]: checked,
                    }))
                  }
                />
                <Checkbox.Text>{pie}</Checkbox.Text>
              </Checkbox>
            );
          })}
        </Flex>
      </Card.Body>
    </Card>
  );
};

const data = {
  a: 3,
  b: 1,
  c: 2,
};
