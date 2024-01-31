---
title: Donut / Pie chart
fileSource: d3-chart
tabs: Design('donut-chart'), A11y('donut-chart-a11y'), API('donut-chart-api'), Examples('donut-chart-d3-code'), Changelog('d3-chart-changelog')
---

::: tip
For core principles, concept description, API and changelog, refer to the [D3 chart](/data-display/d3-chart/d3-chart).
:::

## Basic usage

::: sandbox

<script lang="tsx">
import React from 'react';
import { Chart } from '@semcore/ui/d3-chart';

const Demo = () => {
  return (
    <div style={{ width: '450px' }}>
      <Chart.Donut plotWidth={300} plotHeight={300} data={data} />
    </div>
  );
};

const data = {
  a: 3,
  b: 1,
  c: 2,
};
</script>

:::

## Donut

- You can draw donut and pie charts with the `Donut` component.
- `Pie` is a separate sector.
- `Label` is a text label inside the chart.

::: sandbox

<script lang="tsx">
import React from 'react';
import { Donut, Plot } from '@semcore/ui/d3-chart';
import { Flex } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';

const Demo = () => {
  return (
    <Plot width={300} height={300} data={data} patterns>
      <Donut innerRadius={100}>
        <Donut.Pie dataKey='a' name='Pie 1' />
        <Donut.Pie dataKey='b' name='Pie 2' />
        <Donut.Pie dataKey='c' name='Pie 3' />
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
import { Donut, Plot } from '@semcore/ui/d3-chart';
import { Flex } from '@semcore/ui/flex-box';
import Checkbox from '@semcore/ui/checkbox';

const data = { a: 3, b: 1, c: 2 };

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
              name={`Pie ${index}`}
              active={selected.includes(name)}
            />
          ))}
        </Donut>
      </Plot>
      <Flex direction='column'>
        {Object.keys(data).map((name, index) => {
          return (
            <Checkbox key={name} id={name} theme={`chart-palette-order-${index + 1}`}>
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
import { Plot, Donut } from '@semcore/ui/d3-chart';
import { Text } from '@semcore/ui/typography';
import { Flex } from '@semcore/ui/flex-box';

const Demo = () => {
  return (
    <Plot width={300} height={150} data={data}>
      <Donut halfsize innerRadius={100}>
        <Donut.Pie dataKey='a' name='Pie 1' />
        <Donut.Pie dataKey='b' name='Pie 2' />
        <Donut.Pie dataKey='c' name='Pie 3' />
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
        <Donut.Pie dataKey='b' name='b' />
        <Donut.Pie dataKey='c' name='c' />
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

## Legend and pattern fill

Note that for ChartLegend `patterns` property works only with default `shape={'Checkbox'}`.

::: sandbox

<script lang="tsx">
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
</script>

:::
