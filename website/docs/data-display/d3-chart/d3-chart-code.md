---
title: D3 chart
fileSource: d3-chart
tabs: Design('d3-chart'), Concept and code('d3-chart-code'), API('d3-chart-api'), A11y('d3-chart-a11y'), Changelog('d3-chart-changelog')
---

## Description

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
import React from 'react';
import { scaleLinear } from 'd3-scale';
import { Line, minMax, ResponsiveContainer, XAxis, Plot, YAxis } from '@semcore/ui/d3-chart';

const Demo = () => {
  const [[width, height], setSize] = React.useState([0, 0]);
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

Refer to [Chart legend](/data-display/chart-legend/chart-legend), for a guide on how to implement a clickable chart legend.

::: sandbox

<script lang="tsx">
import React from 'react';
import { Line, minMax, XAxis, Plot, YAxis, ChartLegend } from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';
import { Box } from '@semcore/ui/flex-box';
import Checkbox from '@semcore/ui/checkbox';

const Demo = () => {
  const MAP_THEME = {
    y: 'orange',
    y2: 'green',
  };
  const width = 500;
  const height = 300;
  const MARGIN = 40;

  const [legendItems, setLegendItems] = React.useState(
    Object.keys(data[0])
      .filter((name) => name !== 'x')
      .map((item) => {
        return {
          id: item,
          label: item,
          checked: true,
          color: MAP_THEME[item],
        };
      }),
  );

  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain(minMax(data, 'x'));

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain(legendItems.find((item) => item.checked) ? [0, 10] : []);

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
    <>
      <Box>
        <ChartLegend
          items={legendItems}
          onChangeVisibleItem={handleChangeVisible}
          onMouseEnterItem={handleMouseEnter}
          onMouseLeaveItem={handleMouseLeave}
        />
      </Box>
      <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
        <YAxis>
          <YAxis.Ticks />
          <YAxis.Grid />
        </YAxis>
        <XAxis>
          <XAxis.Ticks />
        </XAxis>
        {legendItems.map((item, index) => {
          return (
            item.checked && (
              <Line
                key={item.id}
                x='x'
                y={item.id}
                color={MAP_THEME[item.id]}
                transparent={highlightedLine !== -1 && highlightedLine !== index}
              />
            )
          );
        })}
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
import EventEmitter from '@semcore/ui/utils/lib/eventEmitter';

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

## Initial data loading

Use [Skeleton](/components/skeleton/skeleton) with the appropriate chart type for the initial loading of the charts. If a chart widget has a title, it should be displayed while the chart is loading.

## Pattern fill

To enable visual patterns on chart, simply add `pattern` prop to the chart component.

`pattern` prop is inherited by all children components. So, you can apply it both to _end_ components like `Line` and to _container_ components like `Plot` .

::: sandbox

<script lang="tsx">
import React from 'react'; 
import { Chart } from '@semcore/ui/d3-chart'; 
import { curveCardinal } from 'd3-shape'; 

const Demo = () => {
  return (
    <Chart.Area
      data={data}
      plotWidth={500}
      plotHeight={200}
      groupKey={'time'}
      stacked={true}
      curve={curveCardinal}
      patterns
      showXAxis={false}
    />
  ); 
}; 

const date = new Date(); 
const data = [... Array(5).keys()].map((d, i) => ({
  time: new Date(date.setDate(date.getDate() + 5)), 
  stack1: Math.random() * 5, 
  stack2: Math.random() * 5, 
  stack3: Math.random() * 5, 
})); 
</script>

:::

### Enforcing patterns

You can enforce use of build-in patterns by using it's names. The list of available patterns:

1. `starSmall`
1. `romb`
1. `circleOutline`
1. `triangleDown`
1. `rombOutline`
1. `square`
1. `trees`
1. `wave`
1. `star`
1. `cogwheel`
1. `crossesDiagonal`
1. `triangleOutline`
1. `chain`
1. `squama`
1. `linesDouble`
1. `zigzagVertical`
1. `triangleDownOutline`
1. `crosses`
1. `linesDoubleHorizontal`
1. `waveVertical`
1. `squareOutline`
1. `triangle`
1. `crescent`
1. `zigzag`

::: sandbox

<script lang="tsx">
import React from 'react';
import { Plot, XAxis, YAxis, minMax, StackedArea, HoverLine } from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';
import { Flex, Box } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';
import { curveCardinal } from 'd3-shape';

const Demo = () => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;

  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain(minMax(data, 'time'));

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 15]);

  return (
    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
      <YAxis>
        <YAxis.Ticks />
        <YAxis.Grid />
      </YAxis>
      <StackedArea x='time'>
        <StackedArea.Area y='stack1' curve={curveCardinal} patterns="crosses">
          <StackedArea.Area.Dots />
        </StackedArea.Area>
        <StackedArea.Area y='stack2' curve={curveCardinal} patterns="linesDouble">
          <StackedArea.Area.Dots />
        </StackedArea.Area>
        <StackedArea.Area y='stack3' curve={curveCardinal} patterns="linesDoubleHorizontal">
          <StackedArea.Area.Dots />
        </StackedArea.Area>
      </StackedArea>
    </Plot>
  );
};

const date = new Date();
const data = [...Array(5).keys()].map((d, i) => ({
  time: new Date(date.setDate(date.getDate() + 5)),
  stack1: Math.random() * 5,
  stack2: Math.random() * 5,
  stack3: Math.random() * 5,
}));
</script>

:::

### Custom patterns

You can provide custom pattern object to enforce it's form. The pattern object should include both fill and symbol properties.

The fill data is used for rendering charts like an `Area` while symbol data is needed to render corresponding symbol in chart legend or on the dots.

::: sandbox 

<script  lang="tsx">
import React from 'react';
import { Chart, Pattern } from '@semcore/ui/d3-chart';

const customPattern: Pattern = {
  fill: {
    viewBox: '0 0 21 20',
    children: (
      <>
        <path d='M9.17 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .951.69h3.461c.969 0 1.372 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.839-.197-1.54-1.118l1.07-3.292a1 1 0 0 0-.363-1.118L3.1 8.72c-.784-.57-.381-1.81.587-1.81H7.15a1 1 0 0 0 .95-.69l1.07-3.292Z' />
      </>
    ),
  },
  symbol: {
    viewBox: '0 0 33 32',
    size: [16.41, 15.66],
    children: (
      <>
        <path d='M15.049.927c.3-.921 1.603-.921 1.902 0l2.866 8.82a1 1 0 0 0 .95.69h9.274c.97 0 1.372 1.24.588 1.81l-7.502 5.45a1 1 0 0 0-.364 1.119l2.866 8.82c.3.92-.755 1.687-1.539 1.117l-7.502-5.45a1 1 0 0 0-1.176 0l-7.502 5.45c-.784.57-1.838-.196-1.54-1.118l2.867-8.82a1 1 0 0 0-.364-1.117l-7.502-5.451c-.784-.57-.381-1.81.588-1.81h9.273a1 1 0 0 0 .951-.69L15.05.927Z' />
      </>
    ),
  },
}

const Demo = () => {
  return (
    <Chart.Line
      data={data}
      plotWidth={500}
      plotHeight={200}
      groupKey={'x'}
      xTicksCount={data.length / 2}
      patterns={customPattern}
      showDots
      showTooltip
    />
  );
};

const data = Array(20)
  .fill({})
  .map((d, i) => ({
    x: i,
    y1: Math.random() * 10,
  }));
</script>

:::

You can also provide a list of patterns.

::: sandbox

<script lang="tsx">
import React from 'react';
import { Plot, Venn, colors } from '@semcore/ui/d3-chart';
import { Text } from '@semcore/ui/typography';

const data = {
  G: 200,
  F: 200,
  C: 500,
  U: 1,
  'G/F': 100,
  'G/C': 100,
  'F/C': 100,
  'G/F/C': 100,
};

const patterns = [
   {
    fill: {
      viewBox: '0 0 12 12',
      children: (
        <>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M5.625 8.875C5.625 9.4067 5.91354 10.0738 6.77174 10.5888L8.05798 11.3605L6.5145 13.933L5.22826 13.1612C3.58646 12.1762 2.625 10.5933 2.625 8.875C2.625 7.1567 3.58646 5.57384 5.22826 4.58876C6.08646 4.07384 6.375 3.4067 6.375 2.875C6.375 2.3433 6.08646 1.67616 5.22826 1.16124L3.94202 0.389496L5.4855 -2.18298L6.77174 -1.41124C8.41354 -0.42616 9.375 1.1567 9.375 2.875C9.375 4.5933 8.41354 6.17616 6.77174 7.16124C5.91354 7.67616 5.625 8.3433 5.625 8.875Z'
          />
        </>
      ),
    },
    symbol: {
      viewBox: '0 0 21 20',
      size: [16, 17.14],
      children: (
        <>
          <path d='M8.823 1.336 6.596 0h8.62a8.593 8.593 0 0 1 1.29 4.512c0 3.183-1.78 6.116-4.823 7.941-1.59.954-2.125 2.19-2.125 3.176 0 .985.535 2.22 2.125 3.175L13.677 20H5.206A8.578 8.578 0 0 1 4 15.629c0-3.184 1.781-6.117 4.823-7.942 1.59-.954 2.125-2.19 2.125-3.175 0-.986-.534-2.222-2.125-3.176Z' />
        </>
      ),
    },
  },
  {
    fill: {
      viewBox: '0 0 12 12',
      children: (
        <>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M3 5.5C2.4683 5.5 1.80116 5.78854 1.28624 6.64674L0.514495 7.93298L-2.05798 6.3895L-1.28624 5.10326C-0.30116 3.46146 1.2817 2.5 3 2.5C4.7183 2.5 6.30116 3.46146 7.28624 5.10326C7.80116 5.96146 8.4683 6.25 9 6.25C9.5317 6.25 10.1988 5.96146 10.7138 5.10326L11.4855 3.81702L14.058 5.3605L13.2862 6.64674C12.3012 8.28854 10.7183 9.25 9 9.25C7.2817 9.25 5.69884 8.28854 4.71376 6.64674C4.19884 5.78854 3.5317 5.5 3 5.5Z'
          />
        </>
      ),
    },
    symbol: {
      viewBox: '0 0 21 20',
      size: [17.14, 14],
      children: (
        <>
          <path d='m20.121 6.457-.027-.017-1.43 2.383c-.954 1.59-2.19 2.125-3.176 2.125-.985 0-2.22-.534-3.175-2.125C10.488 5.781 7.555 4 4.372 4c-1.503 0-2.95.397-4.25 1.136v8.339l1.074-1.792c.954-1.59 2.19-2.125 3.176-2.125.985 0 2.22.535 3.175 2.125 1.825 3.042 4.758 4.823 7.942 4.823 1.651 0 3.235-.479 4.632-1.365V6.457Z' />
        </>
      ),
    },
  },
]

const Demo = () => {
  return (
    <Plot height={300} width={400} data={data} patterns={patterns}>
      <Venn>
        <Venn.Circle dataKey='G' name='Good' />
        <Venn.Circle dataKey='F' name='Fast' />
        <Venn.Intersection dataKey='G/F' name='Good & Fast' />
      </Venn>
    </Plot>
  );
};
</script>

:::

### Low level components use

You can access `PatternFill` and `PatternSymbol` components for low level use. 

`PatternFill` allows you to initialize [svg pattern](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Patterns) and use it for customized charts.

`PatternSymbol` allows you to render symbols, you can use pattern key to sync it with `PatternFill` that use same pattern key.

::: sandbox

<script lang="tsx">
import React from 'react';
import { PatternFill, PatternSymbol, getPatternSymbolSize } from '@semcore/ui/d3-chart';


const Demo = () => {
  const patterns = "zigzag";
  const patternKey = "my-pattern";
  const patternSymbolSize = getPatternSymbolSize({ patternKey, patterns });

  return (
    <svg height="100px" width="200px">
      <PatternFill
        id="pattern-element"
        patternKey={patternKey}
        color="red"
        patterns={patterns}
      />
      <rect width="100px" height="100px" top="0" left="0" fill={`url(#pattern-element)`} stroke="red" />
      <PatternSymbol
        color="red"
        patternKey={patternKey}
        patterns={patterns}
        x={150 - patternSymbolSize[0] / 2}
        y={50 - patternSymbolSize[1] / 2}
      />
    </svg>
  )
}
</script>

:::

