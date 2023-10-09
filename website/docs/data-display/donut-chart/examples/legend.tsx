import React from 'react';
import { ChartLegend, Donut, LegendItem, Plot } from '@semcore/ui/d3-chart';
import { Flex } from '@semcore/ui/flex-box';
import Card from '@semcore/ui/card';
import Checkbox from '@semcore/ui/checkbox';
import resolveColor from '@semcore/ui/utils/lib/color';

const pieColors = {
  Dataset1: resolveColor('blue-300'),
  Dataset2: resolveColor('violet-400'),
  Dataset3: resolveColor('green-200'),
};

export default () => {
  const width = 250;
  const height = 250;

  const [pies, setPies] = React.useState(
    Object.keys(data).reduce<Record<string, LegendItem>>((res, item) => {
      res[item] = {
        id: item,
        label: item,
        checked: true,
        color: pieColors[item],
      };

      return res;
    }, {}),
  );

  const [opacityPie, setOpacityPie] = React.useState(
    Object.keys(pies).reduce((o, key) => ({ ...o, [key]: false }), {}),
  );
  const displayedPiesList = React.useMemo(
    () =>
      Object.entries(pies)
        .filter(([, pie]) => pie.checked)
        .map(([line]) => line),
    [pies],
  );

  const handleMouseEnter = (pie) => {
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
    setOpacityPie(Object.keys(pies).reduce((o, key) => ({ ...o, [key]: false }), {}));
  };

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
          items={pies}
          onChangeVisibleItem={(key, isVisible) => {
            setPies((prevDisplayedLines) => ({
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
  Dataset1: 3,
  Dataset2: 1,
  Dataset3: 2,
};
