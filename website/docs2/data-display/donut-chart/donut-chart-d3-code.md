---
title: Donut / Pie chart
fileSource: d3-chart
tabs: Design('donut-chart'), A11y('donut-chart-a11y'), API('donut-chart-api'), Examples('donut-chart-d3-code'), Changelog('d3-chart-changelog')
---

::: tip
See core principles, concept description, API and changelog in the [Chart principles](/data-display/d3-chart/d3-chart).
:::

## Donut

- You can draw donut and pie charts with the `Donut` component.
- `Pie` is a separate sector.
- `Label` is a text label inside the chart.

::: sandbox

<script lang="tsx">
import React from 'react';
import { Donut, Plot, colors } from '@semcore/ui/d3-chart';
import { Flex } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';

const Demo = () => {
  return (
    <Plot width={300} height={300} data={data}>
      <Donut innerRadius={100}>
        <Donut.Pie dataKey='a' name='Pie 1' />
        <Donut.Pie dataKey='b' color={colors['green-02']} name='Pie 2' />
        <Donut.Pie dataKey='c' color={colors['violet-04']} name='Pie 3' />
        <Donut.Label>Example</Donut.Label>
      </Donut>
      <Donut.Tooltip>
        {({ dataKey, name }) => {
          return {
            children: (
              <>
                <Donut.Tooltip.Title>{name}</Donut.Tooltip.Title>
                <Flex justifyContent='space-between'>
                  <Text bold>{data[dataKey]}</Text>
                </Flex>
              </>
            ),
          };
        }}
      </Donut.Tooltip>
    </Plot>
  );
};

const data = {
  a: 3,
  b: 1,
  c: 2,
};
</script>

:::

## Donut controlled highlight

Use `active` property to control segments highlight.

::: sandbox

<script lang="tsx">
import React from 'react';
import { colors, Donut, Plot } from '@semcore/ui/d3-chart';
import { Flex } from '@semcore/ui/flex-box';
import Checkbox from '@semcore/ui/checkbox';

const data = { a: 3, b: 1, c: 2 };
const pieColors = [colors['blue-03'], colors['green-02'], colors['violet-04']];

const Demo = () => {
  const [selected, setSelected] = React.useState(['b']);
  const handleCheckboxToggle = React.useCallback(
    (name) => () => {
      setSelected((selected) => {
        if (selected.includes(name)) {
          return selected.filter((selectedName) => selectedName !== name);
        } else {
          return [...selected, name];
        }
      });
    },
    [setSelected],
  );

  return (
    <Flex mt={3} alignItems='flex-start' flexWrap>
      <Plot height={120} width={120} m='0 28px 24px 0' data={data}>
        <Donut innerRadius={30}>
          {Object.keys(data).map((name, index) => (
            <Donut.Pie
              key={name}
              dataKey={name}
              color={pieColors[index]}
              name={`Pie ${index}`}
              active={selected.includes(name)}
            />
          ))}
        </Donut>
      </Plot>
      <Flex direction='column'>
        {Object.keys(data).map((name, index) => {
          return (
            <Checkbox key={name} id={name} theme={pieColors[index]}>
              <Checkbox.Value
                value={name}
                checked={selected.includes(name)}
                onChange={handleCheckboxToggle(name)}
              />
              <Checkbox.Text>{`Option ${name.toUpperCase()}`}</Checkbox.Text>
            </Checkbox>
          );
        })}
      </Flex>
    </Flex>
  );
};
</script>

:::

## Semi-Donut

To create a half-size chart, you need to specify the `halfsize` value and reduce the height of the chart by half.

::: sandbox

<script lang="tsx">
import React from 'react';
import { Plot, Donut, colors } from '@semcore/ui/d3-chart';
import { Text } from '@semcore/ui/typography';
import { Flex } from '@semcore/ui/flex-box';

const Demo = () => {
  return (
    <Plot width={300} height={150} data={data}>
      <Donut halfsize innerRadius={100}>
        <Donut.Pie dataKey='a' name='Pie 1' />
        <Donut.Pie dataKey='b' color={colors['green-02']} name='Pie 2' />
        <Donut.Pie dataKey='c' color={colors['violet-04']} name='Pie 3' />
        <Donut.Label label='71,240 engagements'>
          <Text tag='tspan' x='0' dy='-1.2em' fill='#191b23' size={600}>
            71,240
          </Text>
          <Text tag='tspan' x='0' dy='1.2em' fill='#6c6e79' size={200}>
            Engagements
          </Text>
        </Donut.Label>
      </Donut>
      <Donut.Tooltip>
        {({ dataKey, name }) => {
          return {
            children: (
              <>
                <Donut.Tooltip.Title>{name}</Donut.Tooltip.Title>
                <Flex justifyContent='space-between'>
                  <Text bold>{data[dataKey]}</Text>
                </Flex>
              </>
            ),
          };
        }}
      </Donut.Tooltip>
    </Plot>
  );
};

const data = {
  a: 3,
  b: 1,
  c: 2,
};
</script>

:::

## Edge cases

- If any data is missing – don't display it on the chart.
- If only one value is known – display it with a small sector. Be sure to also specify the percentage or value of the unknown data.

::: sandbox

<script lang="tsx">
import React from 'react';
import { Plot, Donut } from '@semcore/ui/d3-chart';
import { Text } from '@semcore/ui/typography';

const Demo = () => {
  return (
    <Plot width={300} height={150} data={data}>
      <Donut halfsize innerRadius={100}>
        <Donut.Pie name='Speed' dataKey='speed' />
        <Donut.Pie name='Other' dataKey='other' color='#C4C7CF' />
        <Donut.Label>
          <Text tag='tspan' x='0' dy='-1.2em' fill='#6C6E79' size={400}>
            Keyword volume
          </Text>
        </Donut.Label>
      </Donut>
    </Plot>
  );
};

const data = {
  speed: 3,
  other: 200,
};
</script>

:::

- If there is no data – show an empty gray chart.

::: sandbox

<script lang="tsx">
import React from 'react';
import { Plot, Donut, colors } from '@semcore/ui/d3-chart';

const Demo = () => {
  return (
    <Plot width={300} height={300} data={data}>
      <Donut innerRadius={100}>
        <Donut.EmptyData />
        <Donut.Pie dataKey='a' name='a' />
        <Donut.Pie dataKey='b' name='b' color={colors['green-02']} />
        <Donut.Pie dataKey='c' name='c' color={colors['pink-03']} />
      </Donut>
    </Plot>
  );
};

const data = {
  a: 0,
  b: 0,
  c: 0,
};
</script>

:::

## Legend

::: sandbox

<script lang="tsx">
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

const Demo = () => {
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
      <Card.Body tag={Flex} direction='column'>
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
</script>

:::
