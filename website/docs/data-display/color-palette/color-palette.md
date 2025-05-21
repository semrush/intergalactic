---
title: Color palette
fileSource: d3-chart
tabName: Design
docs: true
---

## Basic principles

- Use colors thoughtfully and avoid excessive brightness without a valid reason, **always considering the visual hierarchy**.
- When multiple widgets on a page reference the same entity, ensure consistent color usage for that entity across all widgets on the page.
- Be mindful that green and red are often associated with positive and negative connotations, such as growth and decline.

::: tip
We recommend using red carefully, as it is typically reserved for destructive actions and invalid states.
:::

## Chart tokens

For chart-related elements, refer to the [tokens list](/style/design-tokens/design-tokens#semantic-tokens) containing tokens with `chart` in their names.

## Text and grid tokens

Table: Tokens for text and additional information

| Token                 | Usage                                                    |
| --------------------- | -------------------------------------------------------- |
| `--text-primary`      | Primary text information                                 |
| `--text-secondary`    | Additional text information                              |
| `--chart-grid-line`   | Grid lines for the X-axis and accent lines, if necessary |
| `--chart-grid-x-axis` | Additional guide lines for X-axis                        |

## Color usage

There are two approaches for applying colors from our palette:

### Categorical order

This method assists in selecting colors in a predefined order with suitable contrast for your data. Use chart tokens from the [semantic tokens list](/style/design-tokens/design-tokens#semantic-tokens) or tokens from the base palette in the [base tokens list](/style/design-tokens/design-tokens#base-tokens-palette).

#### Basic pack

::: react-view

<script lang="tsx">
import React from 'react';
import Color from '@components/Color';

const colors = [
    '--intergalactic-chart-palette-order-1',
    '--intergalactic-chart-palette-order-2',
    '--intergalactic-chart-palette-order-3',
    '--intergalactic-chart-palette-order-4',
    '--intergalactic-chart-palette-order-5',
    '--intergalactic-chart-palette-order-6',
    '--intergalactic-chart-palette-order-7',
    '--intergalactic-chart-palette-order-8',
  ] // basicPack


const App = function (props) {
  return (
    <div style={{ marginBottom: 32 }}>
      {colors.map((colorName, i) => {
        return (
          <Color
            key={i}
            style={{ margin: 4, width: 48, height: 48, borderRadius: 6 }}
            name={colorName}
          />
        );
      })}
    </div>
  );
}
</script>

:::

#### Second pack

::: react-view

<script lang="tsx">
import React from 'react';
import Color from '@components/Color';

const colors = [
    '--intergalactic-chart-palette-order-9',
    '--intergalactic-chart-palette-order-10',
    '--intergalactic-chart-palette-order-11',
    '--intergalactic-chart-palette-order-12',
    '--intergalactic-chart-palette-order-13',
    '--intergalactic-chart-palette-order-14',
    '--intergalactic-chart-palette-order-15',
    '--intergalactic-chart-palette-order-16',
  ] // secondPack

const App = function (props) {
  return (
    <div style={{ marginBottom: 32 }}>
      {colors.map((colorName, i) => {
        return (
          <Color
            key={i}
            style={{ margin: 4, width: 48, height: 48, borderRadius: 6 }}
            name={colorName}
          />
        );
      })}
    </div>
  );
}
</script>

:::

#### Third pack

::: react-view

<script lang="tsx">
import React from 'react';
import Color from '@components/Color';

const colors = [
    '--intergalactic-chart-palette-order-17',
    '--intergalactic-chart-palette-order-18',
    '--intergalactic-chart-palette-order-19',
    '--intergalactic-chart-palette-order-20',
    '--intergalactic-chart-palette-order-21',
    '--intergalactic-chart-palette-order-22',
    '--intergalactic-chart-palette-order-23',
    '--intergalactic-chart-palette-order-24',
  ] // thirdPack

const App = function (props) {
  return (
    <div style={{ marginBottom: 32 }}>
      {colors.map((colorName, i) => {
        return (
          <Color
            key={i}
            style={{ margin: 4, width: 48, height: 48, borderRadius: 6 }}
            name={colorName}
          />
        );
      })}
    </div>
  );
}
</script>

:::

#### Total amount

Use `--intergalactic-chart-palette-order-total-amount` token to indicate total values.

::: react-view

<script lang="tsx">
import React from 'react';
import Color from '@components/Color';

const colors = ['--intergalactic-chart-palette-order-total-amount'] // totalAmount

const App = function (props) {
  return (
    <div style={{ marginBottom: 32 }}>
      {colors.map((colorName, i) => {
        return (
          <Color
            key={i}
            style={{ margin: 4, width: 48, height: 48, borderRadius: 6 }}
            name={colorName}
          />
        );
      })}
    </div>
  );
}
</script>

:::

#### Other data

Use `--intergalactic-chart-palette-order-other-data` token to indicate voids, missing or some other data.

::: react-view

<script lang="tsx">
import React from 'react';
import Color from '@components/Color';

const colors = ['--intergalactic-chart-palette-order-other-data'] // otherData

const App = function (props) {
  return (
    <div style={{ marginBottom: 32 }}>
      {colors.map((colorName, i) => {
        return (
          <Color
            key={i}
            style={{ margin: 4, width: 48, height: 48, borderRadius: 6 }}
            name={colorName}
          />
        );
      })}
    </div>
  );
}
</script>

:::

#### Null and n/a data

Use `--intergalactic-chart-palette-order-null` token to indicate null or not available data when applicable (for example, in Donut chart).

::: react-view

<script lang="tsx">
import React from 'react';
import Color from '@components/Color';

const colors = ['--intergalactic-chart-palette-order-null'] // nullData

const App = function (props) {
  return (
    <div style={{ marginBottom: 32 }}>
      {colors.map((colorName, i) => {
        return (
          <Color
            key={i}
            style={{ margin: 4, width: 48, height: 48, borderRadius: 6 }}
            name={colorName}
          />
        );
      })}
    </div>
  );
}
</script>

:::

### Sequental order

This method helps to color your data in a monochromatic way. In this case use tokens from the base palette in the [tokens list](/style/design-tokens/design-tokens#base-tokens-palette).

#### Blue

::: react-view

<script lang="tsx">
import React from 'react';
import Color from '@components/Color';

const colors = ['--blue-100', '--blue-200', '--blue-300', '--blue-400', '--blue-500'] // blue

const App = function (props) {
  return (
    <div style={{ marginBottom: 32 }}>
      {colors.map((colorName, i) => {
        return (
          <Color
            key={i}
            style={{ margin: 4, width: 48, height: 48, borderRadius: 6 }}
            name={colorName}
          />
        );
      })}
    </div>
  );
}
</script>

:::

#### Green

::: react-view

<script lang="tsx">
import React from 'react';
import Color from '@components/Color';

const colors = ['--green-100', '--green-200', '--green-300', '--green-400', '--green-500'] // green

const App = function (props) {
  return (
    <div style={{ marginBottom: 32 }}>
      {colors.map((colorName, i) => {
        return (
          <Color
            key={i}
            style={{ margin: 4, width: 48, height: 48, borderRadius: 6 }}
            name={colorName}
          />
        );
      })}
    </div>
  );
}
</script>

:::

#### Salad

::: react-view

<script lang="tsx">
import React from 'react';
import Color from '@components/Color';

const colors = ['--salad-100', '--salad-200', '--salad-300', '--salad-400', '--salad-500'] // salad

const App = function (props) {
  return (
    <div style={{ marginBottom: 32 }}>
      {colors.map((colorName, i) => {
        return (
          <Color
            key={i}
            style={{ margin: 4, width: 48, height: 48, borderRadius: 6 }}
            name={colorName}
          />
        );
      })}
    </div>
  );
}
</script>

:::

#### Orange

::: react-view

<script lang="tsx">
import React from 'react';
import Color from '@components/Color';

const colors = ['--orange-100', '--orange-200', '--orange-300', '--orange-400', '--orange-500'] // orange

const App = function (props) {
  return (
    <div style={{ marginBottom: 32 }}>
      {colors.map((colorName, i) => {
        return (
          <Color
            key={i}
            style={{ margin: 4, width: 48, height: 48, borderRadius: 6 }}
            name={colorName}
          />
        );
      })}
    </div>
  );
}
</script>

:::

#### Yellow

::: react-view

<script lang="tsx">
import React from 'react';
import Color from '@components/Color';

const colors = ['--yellow-100', '--yellow-200', '--yellow-300', '--yellow-400', '--yellow-500'] // yellow

const App = function (props) {
  return (
    <div style={{ marginBottom: 32 }}>
      {colors.map((colorName, i) => {
        return (
          <Color
            key={i}
            style={{ margin: 4, width: 48, height: 48, borderRadius: 6 }}
            name={colorName}
          />
        );
      })}
    </div>
  );
}
</script>

:::

#### Red

::: react-view

<script lang="tsx">
import React from 'react';
import Color from '@components/Color';

const colors = ['--red-100', '--red-200', '--red-300', '--red-400', '--red-500'] // red

const App = function (props) {
  return (
    <div style={{ marginBottom: 32 }}>
      {colors.map((colorName, i) => {
        return (
          <Color
            key={i}
            style={{ margin: 4, width: 48, height: 48, borderRadius: 6 }}
            name={colorName}
          />
        );
      })}
    </div>
  );
}
</script>

:::

#### Pink

::: react-view

<script lang="tsx">
import React from 'react';
import Color from '@components/Color';

const colors = ['--pink-100', '--pink-200', '--pink-300', '--pink-400', '--pink-500'] // pink

const App = function (props) {
  return (
    <div style={{ marginBottom: 32 }}>
      {colors.map((colorName, i) => {
        return (
          <Color
            key={i}
            style={{ margin: 4, width: 48, height: 48, borderRadius: 6 }}
            name={colorName}
          />
        );
      })}
    </div>
  );
}
</script>

:::

#### Violet

::: react-view

<script lang="tsx">
import React from 'react';
import Color from '@components/Color';

const colors = ['--violet-100', '--violet-200', '--violet-300', '--violet-400', '--violet-500'] // violet

const App = function (props) {
  return (
    <div style={{ marginBottom: 32 }}>
      {colors.map((colorName, i) => {
        return (
          <Color
            key={i}
            style={{ margin: 4, width: 48, height: 48, borderRadius: 6 }}
            name={colorName}
          />
        );
      })}
    </div>
  );
}
</script>

:::

#### Gray

::: react-view

<script lang="tsx">
import React from 'react';
import Color from '@components/Color';

const colors = ['--gray-100', '--gray-200', '--gray-300', '--gray-400', '--gray-500'] // gray

const App = function (props) {
  return (
    <div style={{ marginBottom: 32 }}>
      {colors.map((colorName, i) => {
        return (
          <Color
            key={i}
            style={{ margin: 4, width: 48, height: 48, borderRadius: 6 }}
            name={colorName}
          />
        );
      })}
    </div>
  );
}
</script>

:::

## Need more colors?

::: tip
The recommended maximum number of colors on a chart is 30.
:::

Using 30 or more colors is reserved for exceptionally complex scenarios when a large number of colors must be assigned by the system for data representation.

To create a usable palette for such situations, begin by using [tokens from the base palette](/style/design-tokens/design-tokens#base-tokens-palette) with a hue of 300, followed by 200, and then 400. Continue this process until you achieve the desired quantity of colors.

## Accessibility

To make charts visually accessible, use [pattern fills, dots and lines](../d3-chart/d3-chart-a11y.md#pattern-fills-dots-and-lines).
