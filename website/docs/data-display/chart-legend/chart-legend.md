---
title: Chart legend
fileSource: d3-chart
docs: true
tabs: Design('chart-legend'), API('chart-legend-api'), Example('chart-legend-code'), Changelog('d3-chart-changelog')
---

::: react-view

<script lang="tsx">
import React from 'react';
import PlaygroundGeneration from '@components/PlaygroundGeneration';
import { ChartLegend as ChartL, LegendItem, LegendFlexProps } from '@semcore/d3-chart';
import DesktopIcon from '@semcore/ui/icon/Desktop/m';
import { Intergalactic } from '@semcore/core';
import { IconProps } from '@semcore/icon';

const Preview = (preview) => {
    const { select, radio, text, bool } = preview('ChartLegend');

    const direction = radio({
        key: 'direction',
        defaultValue: 'row',
        label: 'Direction',
        options: ['row', 'column'],
    });
    
    const size = radio({
        key: 'size',
        defaultValue: 'm',
        label: 'Size',
        options: ['m', 'l'],
    });
    
    const shape = select({
        key: 'shape',
        defaultValue: 'Checkbox',
        label: 'Shape',
        options: ['Checkbox', 'Line', 'Circle', 'Square'],
    });
    
    const withIcon = bool({
        key: 'withIcon',
        defaultValue: false,
        label: 'With icon',
    });
    
    const additionLabel = text({
        key: 'additionLabel',
        defaultValue: '',
        label: 'Addition Label',
    });
    
    const count = text({
        key: 'count',
        defaultValue: '',
        label: 'Count',
    });
    
    const withTrend = bool({
        key: 'withTrend',
        defaultValue: false,
        label: 'With trend',
    });
    
    return (
        <ChartLegend
            withTrend={withTrend || undefined}
            direction={direction}
            shape={shape}
            size={size}
            additionLabel={additionLabel}
            count={count}
            withIcon={withIcon}
        />
    );
};

const data = [...Array(5).keys()].map((d, i) => ({
    x: i,
    Line1: Math.random() * 10,
    Line2: Math.random() * 10,
    Line3: Math.random() * 10,
    Line4: Math.random() * 10,
    Line5: Math.random() * 10,
}));

type ChartLProps = Omit<LegendFlexProps, 'items'> & {
    additionLabel?: string;
    count?: number;
    withIcon?: boolean;
};

const ChartLegend = (props: ChartLProps) => {
    const { withTrend, direction, shape, size, additionLabel, count, withIcon } = props;
    
    const [lines, setLines] = React.useState<LegendItem[]>(
        Object.keys(data[0])
            .filter((name) => name !== 'x')
            .map((item, index) => {
                return {
                    id: item,
                    label: item,
                    checked: true,
                    color: `chart-palette-order-${index + 1}`,
                };
            }),
    );
    
    React.useEffect(() => {
        setLines(() => {
            const newLines = lines.map((item) => {
                if (additionLabel && count) {
                    item.additionalInfo = {
                        label: additionLabel,
                        count: count,
                    };
                } else if (additionLabel && !count) {
                    item.additionalInfo = {
                        label: additionLabel,
                    };
                } else if (!additionLabel && count) {
                    item.additionalInfo = {
                        count: count,
                    };
                } else {
                    item.additionalInfo = undefined;
                }
    
                if (withIcon) {
                  item.icon = (<DesktopIcon />) as unknown as Intergalactic.Component<'svg', IconProps>;
                } else {
                  item.icon = undefined;
                }
        
                return item;
            });
    
            return newLines;
        });
    }, [additionLabel, count, withIcon]);
    
    const onChangeDisplayLine = (key: string, isDisplay: boolean) => {
        setLines((prevDisplayedLines) => {
            return prevDisplayedLines.map((item) => {
                if (item.id === key) {
                    item.checked = isDisplay;
                }
            
                return item;
            });
        });
    };
    
    const [trendIsVisible, setTrendIsVisible] = React.useState(false);
    
    return (
        <div>
            <ChartL
                withTrend={withTrend}
                trendLabel={withTrend ? 'Trend' : undefined}
                direction={direction}
                shape={shape}
                items={lines}
                onChangeVisibleItem={onChangeDisplayLine}
                size={size}
                trendIsVisible={trendIsVisible}
                onTrendIsVisibleChange={setTrendIsVisible}
            />
        </div>
    );
};

const App = PlaygroundGeneration(Preview);

</script>

:::

::: tip
Basic data visualization rules in widgets with charts are described in [D3 chart](/data-display/d3-chart/d3-chart).
:::

## Description

**Chart legend** is a component that helps a user read the data presented on the chart.

Add legend to the chart if there are more than one data set. If there is only one data set on the chart, then don’t display the legend: in this case the purpose of the data should be clear from the chart context: chart title, description, etc.

## Component composition

![](static/legend-composition.png)

Component consists of the following elements:

1. `ChartLegend.LegendItem`
2. `ChartLegend.LegendItem.Shape`
3. `ChartLegend.LegendItem.Label`

Optionally you can add the following to the LegendItem:

![](static/legend-optional-elements.png)

- Leading Icon
- Additional label
- Counter

## Placement

The recommended placement of the legend is the top left position above the chart.

![](static/checkbox.png)

### Other placement options

In some cases, you can position the legend either below the chart on the left or to the right of the chart. Here are examples and some possible scenarios:

Table: Chart legend placement examples

| Placement | Appearance example  | Examples of cases |
| --------- | ------------------- | ----------------- |
| right     | ![](static/legend-right.png) ![](static/legend-right2.png) | When the chart is compact and doesn't take up much space or when you want to display legend items in a list for value comparisons. |
| bottom    | ![](static/legend-bottom.png) ![](static/legend-bottom2.png) | For instance, when there are multiple filters above the chart or when the chart adapts for smaller screens. |

## Legend items

Legend items can be either interactive or static. Use `Checkbox` for interactive legend items and choose from a list of default SVG shapes (`Circle`, `Square`, `Line`) for static legend items. You can also set a custom shape if needed.

The colors of the checkboxes or shapes correspond to the data on the chart.

All legend items use `--text-primary` token for color of the text label.

Table: Legend item shapes

| Shape property           | Appearance example                   |
| ------------------------ | ------------------------------------ |
| `Checkbox` (interactive) | ![](static/checkbox.png)             |
| `Circle` (static)        | ![](static/static-legend-circle.png) |
| `Square` (static)        | ![](static/static-legend-square.png) |
| `Line` (static)          | ![](static/static-legend-line.png)   |

### Optional legend item elements

A legend item can include an icon, additional text, a counter, or a combination of these.

Table: Optional legend item elements

| Element       | Appearance example    | Styles   |
| ------------- | --------------------- | -------- |
| Leading icon  | ![](static/items-icon.png)      | Icon has M size and `--icon-non-interactive` color.   |
| Additional information | ![](static/items-info.png) | For additional information, use text with 14px size (`--fs-200`) and `--text-secondary` token for color. |
| Counter      | ![](static/items-counter.png)   | For a counter, use text with 14px size (`--fs-200`) and `--text-secondary` token for color.  |

Example of a combination of the elements above:

![](static/items-combination.png)

## Trend and average value

To display the trend or average value in the legend, use the `withTrend` property. It adds checkbox with [Divider](/components/divider/divider) to separate trend from the main legend.

![](static/legend-trend.png)

Similarly, you can display total values. Dots on the line are optional.

## Interaction

Hovering over a LegendItem can highlight the corresponding data on the chart by reducing the transparency of other data categories to 30%.

![](static/legend-hover.png)

If some data is already disabled in the legend, it should remain disabled while hovering.

![](static/legend-hover2.png)

## Disabled legend

When all legend items are disabled, the chart should display the X-axis.

![](static/legend-turn-off.png)

