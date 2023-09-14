---
title: D3 chart principles
fileSource: d3-chart
tabs: Design('d3-chart'), Concept and code('d3-chart-code'), API('d3-chart-api'), A11y('d3-chart-a11y'), Changelog('d3-chart-changelog')
---

::: tip
Basic data visualization rules are described in the [Chart principles](/data-display/d3-chart/d3-chart).
:::

These components serve as the base for building charts from your data in the product.

They don't manipulate your data, and will not try to calculate, sort or check it in any way. Data manipulation is the product's job, not the component's.

Charts are a complex component that cannot be applied in a single line. That's why its API may seem a bit inflated, since it supports all the concepts of our design system.

## Concept

- We want to provide you with a convenient way to use the imperative d3 style with React's declarative approach.
- All charts are based on [d3-scale](https://github.com/d3/d3-scale), which you transfer to our charts in a customized form.
- We try to provide access to each SVG node, so you could modify it if needed.

Each element that you place on the chart is based on a real SVG element or a group of elements. For example, when you render `<Line/>`, you will get an SVG (`<line d = {...}>`). All properties you pass to `<Line/>` will go to the native SVG `<line d = {...}>` tag.

When you render `<Line.Dots/>` (dots on a line plot), you get a set of `<circle cx = {...} cy = {...}/>`. So all properties you pass to <Line.Dots/> will also go to the native SVG `<circle cx = {...} cy = {...}/>` tag.

For a point change in the properties of each specific dot, you need to pass a function that will be called at each dot with the calculated properties of this dot:

```jsx
<Line.Dots>
  {(props) => {
    return {
      // ...your_props
    };
  }}
</Line.Dots>
```

::: tip
You also can put functions into single elements if your properties are calculated dynamically.
:::

Since many SVG elements don't support nesting, they are rendered sequentially. For example, this code example doesn't nest `<circle/>` in `<line/>`, but draws them one after another:

```jsx
<Line>
  <Line.Dots />
</Line>
```

CSS is responsible for all the chart styles. See [Themes](/style/design-tokens/design-tokens#themes) for more information on how to customize it.

## Base

Any SVG container must have absolute values for its size.

See [d3-scale docs on GitHub](https://github.com/d3/d3-scale) for more information about the types of `scale`, as well as their `range` and `domain`.

::: tip
The `range` of the horizontal `scale` is inverted, so that the axes origin is at the bottom left corner.
:::

::: sandbox

<script lang="tsx">
import React from 'react';
import { Plot, Line, minMax } from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';

const Demo = () => {
  const width = 500;
  const height = 300;

  const xScale = scaleLinear().range([0, width]).domain(minMax(data, 'x'));

  const yScale = scaleLinear().range([height, 0]).domain(minMax(data, 'y'));

  return (
    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
      <Line x='x' y='y' />
    </Plot>
  );
};

const data = Array(20)
  .fill({})
  .map((d, i) => ({
    x: i,
    y: Math.random() * 10,
  }));
</script>

:::

## Paddings & margins

SVG size and chart plot size are usually different to prevent the clipping of additional items such as axes, axis values, and the legend.

That's why values in `scale.range ()` are set with a shift.

::: sandbox

<script lang="tsx">
import React from 'react';
import { Plot, Line, minMax } from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';

const Demo = () => {
  const MARGIN = 100;
  const width = 500;
  const height = 300;

  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain(minMax(data, 'x'));

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain(minMax(data, 'y'));

  return (
    <Plot
      data={data}
      scale={[xScale, yScale]}
      width={width}
      height={height}
      style={{ border: '1px solid' }}
    >
      <Line x='x' y='y' />
    </Plot>
  );
};

const data = Array(20)
  .fill({})
  .map((d, i) => ({
    x: i,
    y: Math.random() * 10,
  }));
</script>

:::

## Axes

When you pass `scale` to the root component it also sets the coordinate axes. However, you still need to specify them for them to render.

- `XAxis/YAxis` are the axis lines.
- `ticks` are the values on the axis.

It is also possible to have multiple axes with different positions.

You can get the number of ticks from the `scale.ticks` or `scale.domain` method. To calculate an approximate number of ticks, divide the chart size by the size of a one tick.

::: tip
According to the design guide, `YAxis` is hidden by default `(hide = true)`.
:::

::: sandbox

<script lang="tsx">
import React from 'react';
import { Plot, Line, XAxis, YAxis, minMax } from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';

const Demo = () => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;

  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain(minMax(data, 'x'));

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 10]);

  return (
    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
      <YAxis>
        <YAxis.Ticks ticks={[0, 5, 10]} />
      </YAxis>
      <XAxis>
        <XAxis.Ticks ticks={xScale.ticks(width / 50)} />
      </XAxis>
      <Line x='x' y='y' />
    </Plot>
  );
};

const data = Array(21)
  .fill({})
  .map((d, i) => ({
    x: i,
    y: Math.random() * 10,
  }));
</script>

:::

## Axis values

You can change the values and properties on the axis by passing a function.

The default tag is `<text/>`, but you can change it by defining the `tag` property. For example, you can change it to `foreignObject` for inserting `html` components.

::: tip
The function arguments contain calculated XY coordinates that you can use to shift the object as needed.
:::

::: sandbox

<script lang="tsx">
import React from 'react';
import { Plot, Line, XAxis, YAxis, minMax } from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';

const Demo = () => {
  const MARGIN = 60;
  const width = 500;
  const height = 300;

  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain(minMax(data, 'x'));

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([-1, 1]);

  return (
    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
      <XAxis>
        <XAxis.Ticks ticks={xScale.ticks()} />
      </XAxis>
      <YAxis>
        <YAxis.Ticks ticks={yScale.ticks(5)}>
          {({ value }) => ({
            children: yScale.tickFormat(5, '+%')(value),
          })}
        </YAxis.Ticks>
      </YAxis>
      <Line x='x' y='y' />
    </Plot>
  );
};

const data = Array(20)
  .fill({})
  .map((d, i) => ({
    x: i,
    y: (Math.random() > 0.5 ? 1 : -1) * Math.random(),
  }));
</script>

:::

## Additional lines

Additional lines are formed in the same way as ticks.

::: tip
To make things easier, ticks can be specified on the `Axis` component itself, and it will be automatically passed to `<Axis.Ticks/>` and `<Axis.Grid/>`.
:::

::: sandbox

<script lang="tsx">
import React from 'react';
import { Plot, Line, XAxis, YAxis, minMax } from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';

const Demo = () => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;

  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain(minMax(data, 'x'));

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 10]);

  return (
    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
      <YAxis>
        <YAxis.Ticks ticks={yScale.ticks()} />
        <YAxis.Grid ticks={yScale.ticks()} />
      </YAxis>
      <XAxis ticks={xScale.ticks()}>
        <XAxis.Ticks />
        <XAxis.Grid />
      </XAxis>
      <Line x='x' y='y' />
    </Plot>
  );
};

const data = Array(20)
  .fill({})
  .map((d, i) => ({
    x: i,
    y: Math.random() * 10,
  }));
</script>

:::

## Axes titles

Axis titles are formed in the same way as ticks and additional lines.

::: tip
By default, the title is set to the right for the Oy axis, and at the top for the Ox axis. However, you can change this condition by passing the desired location to `position`: `right`, `top`, `left`, or `bottom`.
:::

::: sandbox

<script lang="tsx">
import { Bar, XAxis, Plot, YAxis } from '@semcore/ui/d3-chart';
import React from 'react';
import { scaleBand, scaleLinear } from 'd3-scale';

const Demo = () => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;
  const xScale = scaleBand()
    .range([MARGIN, width - MARGIN])
    .domain(data.map((d) => d.category))
    .paddingInner(0.4)
    .paddingOuter(0.2);
  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 10]);
  return (
    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
      <YAxis>
        <YAxis.Ticks />
        <YAxis.Grid />
        <YAxis.Title>YAxis title</YAxis.Title>
      </YAxis>
      <XAxis>
        <XAxis.Ticks />
        <XAxis.Title>XAxis title</XAxis.Title>
      </XAxis>
      <Bar x='category' y='bar' />
    </Plot>
  );
};
const data = Array(5)
  .fill({})
  .map((d, i) => ({
    category: `Category ${i}`,
    bar: Math.random() * 10,
  }));
</script>

:::

## Tooltip

You can add a tooltip to the chart, for which you can set `Title` and `Footer`.

::: sandbox

<script lang="tsx">
import React from 'react';
import { Plot, Line, XAxis, YAxis, HoverLine, minMax } from '@semcore/ui/d3-chart';
import { Flex } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';
import { scaleLinear, scaleTime } from 'd3-scale';

function formatDate(value, options) {
  return new Intl.DateTimeFormat('en', options).format(value);
}

const Demo = () => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;

  const xScale = scaleTime()
    .range([MARGIN, width - MARGIN])
    .domain(minMax(data, 'time'));

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 10]);

  return (
    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
      <YAxis>
        <YAxis.Ticks />
        <YAxis.Grid />
      </YAxis>
      <XAxis>
        <XAxis.Ticks>
          {({ value }) => ({
            children: formatDate(value, {
              month: 'short',
              day: 'numeric',
            }),
          })}
        </XAxis.Ticks>
      </XAxis>
      <Line x='time' y='line'>
        <Line.Dots display />
      </Line>
      <HoverLine.Tooltip x='time' wMin={100}>
        {({ xIndex }) => {
          return {
            children: (
              <>
                <HoverLine.Tooltip.Title>
                  {formatDate(data[xIndex].time, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </HoverLine.Tooltip.Title>
                <Flex justifyContent='space-between'>
                  <HoverLine.Tooltip.Dot mr={4}>Line</HoverLine.Tooltip.Dot>
                  <Text bold>{data[xIndex].line}</Text>
                </Flex>
                <HoverLine.Tooltip.Footer>New data start tracking!</HoverLine.Tooltip.Footer>
              </>
            ),
          };
        }}
      </HoverLine.Tooltip>
    </Plot>
  );
};

const date = new Date();
const data = Array(10)
  .fill({})
  .map((d, i) => {
    return {
      time: new Date(date.setDate(date.getDate() + 5)),
      line: Math.random() * 10,
    };
  });
</script>

:::

## Adaptive chart

For SVG charts to display correctly on responsive layouts, you need to dynamically calculate their width and height. To help you with that, we created the `ResponsiveContainer` component that supports all the [Box properties](/layout/box-system/box-api) and can help you flexibly adjust the chart size.

::: tip
`ResponsiveContainer` supports the `aspect` property – the aspect ratio between the width and height of a chart.
:::

```jsx
<ResponsiveContainer aspect={1}> // width = height ...</ResponsiveContainer>
```

::: sandbox

<script lang="tsx">
import React, { useState } from 'react';
import { scaleLinear } from 'd3-scale';
import { Line, minMax, ResponsiveContainer, XAxis, Plot, YAxis } from '@semcore/ui/d3-chart';

const Demo = () => {
  const [[width, height], setSize] = useState([0, 0]);
  const MARGIN = 40;
  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain(minMax(data, 'x'));
  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 10]);

  return (
    <ResponsiveContainer h={300} onResize={setSize}>
      <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
        <YAxis>
          <YAxis.Ticks />
          <YAxis.Grid />
        </YAxis>
        <XAxis>
          <XAxis.Ticks />
        </XAxis>
        <Line x='x' y='y'>
          <Line.Dots display />
        </Line>
      </Plot>
    </ResponsiveContainer>
  );
};

const data = Array(20)
  .fill({})
  .map((d, i) => ({
    x: i,
    y: Math.random() * 10,
  }));
</script>

:::

## Chart legend

See [Chart legend](/data-display/chart-legend/chart-legend) for a guide on how to implement a clickable chart legend.

::: sandbox

<script lang="tsx">
import React, { useState } from 'react';
import { Line, minMax, XAxis, Plot, YAxis } from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';
import { Box } from '@semcore/ui/flex-box';
import Checkbox from '@semcore/ui/checkbox';

const Demo = () => {
  const [dataLegend, setDataLegend] = useState(
    Object.keys(data[0])
      .filter((name) => name !== 'x')
      .map((name) => ({ name, checked: true, opacity: false })),
  );

  const MAP_THEME = {
    y: 'orange',
    y2: 'green',
  };
  const width = 500;
  const height = 300;
  const MARGIN = 40;
  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain(minMax(data, 'x'));

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain(dataLegend.find((item) => item.checked) ? [0, 10] : []);

  const handleChange = (name) => (checked) => {
    const newDataLegend = dataLegend.map((item) => {
      if (item.name === name) {
        return { ...item, checked };
      }
      return { ...item, opacity: checked };
    });

    setDataLegend(newDataLegend);
  };

  const handleMouseEnter = (name) => () => {
    const activeItem = dataLegend.find((item) => item.name === name);
    if (!activeItem.checked) return;
    setDataLegend((data) =>
      data.map((item) => {
        if (item.name !== name) return { ...item, opacity: true };
        return item;
      }),
    );
  };
  const handleMouseLeave = () => {
    setDataLegend(dataLegend.map((item) => ({ ...item, opacity: false })));
  };

  return (
    <>
      <Box>
        {dataLegend.map((item) => {
          return (
            <Checkbox
              key={item.name}
              onMouseEnter={handleMouseEnter(item.name)}
              onMouseLeave={handleMouseLeave}
            >
              <Checkbox.Value
                theme={MAP_THEME[item.name]}
                checked={item.checked}
                onChange={handleChange(item.name)}
              />
              <Checkbox.Text pr={4}>{item.name}</Checkbox.Text>
            </Checkbox>
          );
        })}
      </Box>
      <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
        <YAxis>
          <YAxis.Ticks />
          <YAxis.Grid />
        </YAxis>
        <XAxis>
          <XAxis.Ticks />
        </XAxis>
        {dataLegend.map(
          (item) =>
            item.checked && (
              <Line
                key={item.name}
                x='x'
                y={item.name}
                color={MAP_THEME[item.name]}
                opacity={item.opacity ? 0.3 : 1}
              />
            ),
        )}
      </Plot>
    </>
  );
};

const data = [...Array(10).keys()].map((d, i) => ({
  x: i,
  y: Math.random() * i,
  y2: Math.random() * (i + 2),
}));
</script>

:::

## Reference line

::: sandbox

<script lang="tsx">
import React from 'react';
import { scaleLinear, scaleBand } from 'd3-scale';
import { Plot, ReferenceLine, XAxis, YAxis } from '@semcore/ui/d3-chart';

const Demo = () => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;

  const xScale = scaleBand()
    .range([MARGIN, width - MARGIN])
    .domain(dataBar.map((d) => d.category))
    .paddingInner(0.4)
    .paddingOuter(0.2);

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 10]);

  return (
    <Plot data={dataBar} scale={[xScale, yScale]} width={width} height={height}>
      <YAxis>
        <YAxis.Ticks />
      </YAxis>
      <XAxis>
        <XAxis.Ticks />
      </XAxis>
      <ReferenceLine title='Left data' value={dataBar[0].category} />
      <ReferenceLine title='Right data' position='right' value={dataBar[1].category} />
      <ReferenceLine title='Top data' position='top' value={9} />
      <ReferenceLine title='Bottom data' position='bottom' value={3} />
      <ReferenceLine
        value={dataBar[3].category}
        strokeDasharray='3 3'
        strokeWidth='0.5'
        width='100'
      >
        <ReferenceLine.Background width='100' />
      </ReferenceLine>
    </Plot>
  );
};

const dataBar = Array(5)
  .fill({})
  .map((d, i) => ({
    category: `Category ${i}`,
    bar: i >= 3 ? Math.random() * 10 : 0,
  }));
</script>

:::

## Synchronous charts

You can pass a common `eventEmitter` to synchronize the charts.

::: tip
Be careful when choosing the `scale` for the axis, since it's common across different charts.
:::

::: sandbox

<script lang="tsx">
import React from 'react';
import { scaleLinear, scaleBand } from 'd3-scale';
import { Bar, HoverLine, HoverRect, Line, XAxis, Plot, YAxis } from '@semcore/ui/d3-chart';
import EventEmitter from '@semcore/ui/utils/eventEmitter';

const eventEmitter = new EventEmitter();

const Demo = () => {
  const [width, height] = [600, 300];
  const MARGIN = 80;

  const xScale = scaleBand()
    .domain(data.map((d) => d.date_chart))
    .range([MARGIN, width - MARGIN])
    .paddingInner(0.4)
    .paddingOuter(0.2);

  const yScale = scaleLinear()
    .domain([0, Math.max(...data.map((d) => d.download))])
    .range([height - MARGIN / 2, MARGIN / 2]);

  const getDate = (date) =>
    new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);

  return (
    <>
      <Plot
        data={data}
        scale={[xScale, yScale]}
        width={width}
        height={height}
        eventEmitter={eventEmitter}
      >
        <YAxis ticks={yScale.ticks(4)}>
          <YAxis.Ticks />
          <YAxis.Grid />
        </YAxis>
        <Line x='date_chart' y='download'>
          <Line.Dots display />
        </Line>
        <HoverLine.Tooltip x='date_chart' wMin={100}>
          {({ xIndex }) => {
            return {
              children: <>{data[xIndex].download}</>,
            };
          }}
        </HoverLine.Tooltip>
      </Plot>
      <Plot
        data={data}
        scale={[xScale, yScale]}
        width={width}
        height={height}
        eventEmitter={eventEmitter}
      >
        <YAxis ticks={yScale.ticks(4)}>
          <YAxis.Ticks />
          <YAxis.Grid />
        </YAxis>
        <XAxis>
          <XAxis.Ticks>
            {({ value, index }) => ({ children: index % 2 ? '' : getDate(value) })}
          </XAxis.Ticks>
        </XAxis>
        <HoverRect.Tooltip x='date_chart' wMin={100}>
          {({ xIndex }) => {
            return {
              children: <>{data[xIndex]?.download}</>,
            };
          }}
        </HoverRect.Tooltip>
        <Bar x='date_chart' y='download' />
      </Plot>
    </>
  );
};

const data = [...Array(10).keys()].map((d, i) => ({
  download: 172 + 10 * i,
  date_chart: 1594791280000 + 1000000000 * i,
}));
</script>

:::

## Export to image (png, jpeg, webp)

::: sandbox

<script lang="tsx">
import React from 'react';
import { scaleLinear } from 'd3-scale';
import { Line, minMax, Plot, XAxis, YAxis } from '@semcore/ui/d3-chart';
import { Flex } from '@semcore/ui/flex-box';
import DropdownMenu from '@semcore/ui/dropdown-menu';
import Button from '@semcore/ui/button';
import FileExportM from '@semcore/ui/icon/FileExport/m';

const extensions = ['png', 'jpeg', 'webp'];

const data = Array(20)
  .fill({})
  .map((_, i) => ({
    x: i,
    y: Math.random() * 10,
  }));

const Demo = () => {
  const svgRef = React.useRef<SVGSVGElement>(null);
  const width = 500;
  const height = 300;
  const MARGIN = 40;

  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain(minMax(data, 'x'));

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 10]);

  const downloadImage = React.useCallback(
    (extention: string) => async () => {
      const svgElement = svgRef.current;
      let svgText = svgElementToSvgText(svgElement);
      svgText = svgText.replace(/(\w+)?:?xlink=/g, 'xmlns:xlink='); // Fix root xlink without namespace
      svgText = svgText.replace(/NS\d+:href/g, 'xlink:href'); // Safari NS namespace fix

      const downloadUrl = await svgText2DownloadUrl(svgText, 2 * width, 2 * height, extention);

      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `image.${extention}`;

      link.dispatchEvent(
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window,
        }),
      );

      setTimeout(() => {
        link.remove();
      }, 100);
    },
    [],
  );

  return (
    <Flex>
      <Plot ref={svgRef} data={data} scale={[xScale, yScale]} width={width} height={height}>
        <YAxis ticks={yScale.ticks()}>
          <YAxis.Ticks />
          <YAxis.Grid />
        </YAxis>
        <XAxis ticks={xScale.ticks()}>
          <XAxis.Ticks />
        </XAxis>
        <Line x='x' y='y'>
          <Line.Dots display />
        </Line>
      </Plot>
      <DropdownMenu>
        <DropdownMenu.Trigger tag={Button}>
          <Button.Addon>
            <FileExportM />
          </Button.Addon>
          <Button.Text>Export</Button.Text>
        </DropdownMenu.Trigger>
        <DropdownMenu.Popper wMax='257px'>
          <DropdownMenu.List>
            {extensions.map((name) => (
              <DropdownMenu.Item onClick={downloadImage(name)}>{name}</DropdownMenu.Item>
            ))}
          </DropdownMenu.List>
        </DropdownMenu.Popper>
      </DropdownMenu>
    </Flex>
  );
};

const getCSSStyles = (parentElement: Element) => {
  const selectorTextArr: string[] = [];

  for (let c = 0; c < parentElement.classList.length; c++) {
    if (!selectorTextArr.includes(`.${parentElement.classList[c]}`))
      selectorTextArr.push(`.${parentElement.classList[c]}`);
  }

  // Add Children element Ids and Classes to the list
  const nodes = parentElement.getElementsByTagName('*');
  for (let i = 0; i < nodes.length; i++) {
    const id = nodes[i].id;
    if (!selectorTextArr.includes(`#${id}`)) selectorTextArr.push(`#${id}`);

    const classes = nodes[i].classList;
    for (let c = 0; c < classes.length; c++)
      if (!selectorTextArr.includes(`.${classes[c]}`)) selectorTextArr.push(`.${classes[c]}`);
  }

  // Extract CSS Rules
  let extractedCSSText = '';
  for (let i = 0; i < document.styleSheets.length; i++) {
    const s = document.styleSheets[i];

    try {
      if (!s.cssRules) continue;
    } catch (e) {
      if (e.name !== 'SecurityError') throw e; // for Firefox
      continue;
    }

    const cssRules: any = s.cssRules;
    for (let r = 0; r < cssRules.length; r++) {
      if (
        cssRules[r].selectorText &&
        selectorTextArr.some((s) => cssRules[r].selectorText.includes(s))
      )
        extractedCSSText += cssRules[r].cssText;
    }
  }
  return extractedCSSText;
};

const appendCSS = (cssText: string, element: Element) => {
  const styleElement = document.createElement('style');
  styleElement.setAttribute('type', 'text/css');
  styleElement.innerHTML = cssText;
  const refNode = element.hasChildNodes() ? element.children[0] : null;
  element.insertBefore(styleElement, refNode);
};

const svgElementToSvgText = (svgNode: Element) => {
  svgNode.setAttribute('xlink', 'http://www.w3.org/1999/xlink');
  const cssStyleText = getCSSStyles(svgNode);
  appendCSS(cssStyleText, svgNode);

  const serializer = new XMLSerializer();

  const svgString = serializer.serializeToString(svgNode);

  return svgString;
};

const svgText2DownloadUrl = async (svg: string, width: number, height: number, format: string) =>
  new Promise<string>((resolve, reject) => {
    const imgsrc = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width = width;
    canvas.height = height;

    const image = new Image();
    image.onload = function () {
      context.clearRect(0, 0, width, height);
      context.drawImage(image, 0, 0, width, height);

      const img = canvas.toDataURL(`image/${format}`);
      resolve(img);
    };
    image.onerror = reject;

    image.src = imgsrc;
  });
</script>

:::

## Initial loading

Use [Skeleton](/components/skeleton/skeleton) with the appropriate chart type for the initial loading of the charts. If a chart widget has a title, it should be displayed while the chart is loading.

