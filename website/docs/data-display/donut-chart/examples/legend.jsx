import React from 'react';
import { Donut, Plot } from '@semcore/ui/d3-chart';
import { Flex } from '@semcore/ui/flex-box';
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

  const piesList = Object.keys(data);
  const [opacityPie, setOpacityPie] = React.useState(
    piesList.reduce((o, key) => ({ ...o, [key]: false }), {}),
  );
  const [displayPie, setDisplayPie] = React.useState(
    piesList.reduce((o, key) => ({ ...o, [key]: true }), {}),
  );
  const displayedPiesList = React.useMemo(
    () =>
      Object.entries(displayPie)
        .filter(([, displayed]) => displayed)
        .map(([line]) => line),
    [displayPie],
  );

  const handleMouseEnter = (pie) => () => {
    if (displayedPiesList.includes(pie)) {
      const opacity = { ...opacityPie };

      Object.keys(opacity).forEach((key) => {
        if (key !== pie) {
          opacity[key] = true;
        }
      });

      setOpacityPie({ ...opacity });
    }
  };

  const handleMouseLeave = () => {
    setOpacityPie(piesList.reduce((o, key) => ({ ...o, [key]: false }), {}));
  };

  return (
    <Card w={'550px'}>
      <Card.Header pt={4}> Chart legend</Card.Header>
      <Card.Body tag={Flex} direction="column">
        <Flex flexWrap w={width}>
          {piesList.map((pie) => {
            return (
              <Checkbox
                key={pie}
                theme={pieColors[pie]}
                mr={4}
                mb={2}
                onMouseEnter={handleMouseEnter(pie)}
                onMouseLeave={handleMouseLeave}
              >
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
        <Plot width={width} height={height} data={data}>
          <Donut innerRadius={height / 2 - 50}>
            {displayedPiesList.map((pie) => (
              <Donut.Pie
                dataKey={pie}
                key={pie}
                name={pie}
                color={pieColors[pie]}
                transparent={opacityPie[pie]}
              />
            ))}
          </Donut>
        </Plot>
      </Card.Body>
    </Card>
  );
};

const data = {
  a: 3,
  b: 1,
  c: 2,
};
