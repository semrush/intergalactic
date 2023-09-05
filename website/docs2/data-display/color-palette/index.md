---
title: Color palette
fileSource: d3-chart
tabName: Design
docs: true
---

## Basic rules

- Use color thoughtfully and don't make colors too bright without a reason. **Keep in mind the visual hierarchy.**
- If there are several widgets on a page that mention the same entity, then use the same color for the entity in all widgets on the same page.
- **Keep in mind that green and red are often associated with good and bad, growth and decline.**

::: tip
**We recommend using red carefully**. It is usually used for destructive actions and invalid states.
:::

## Chart tokens

You can find all tokens for charts in the [tokens list](/style/design-tokens/#semantic_tokens). They all have `chart` in their token name.

## Tokens for text and additional information

| Token                 | Usage                                                       |
| --------------------- | ----------------------------------------------------------- |
| `--text-primary`      | Basic text information                                      |
| `--text-secondary`    | Additional text information                                 |
| `--chart-grid-line`   | The X-axis and the accent lines on the grid when, if needed |
| `--chart-grid-x-axis` | Additional guide lines                                      |

## Colors usage

There are two ways of coloring your data with our palette.

### Categorical order

This way helps to choose colors with a predefined order and contrast for your data. Use chart tokens from the [semantic tokens list](/style/design-tokens/#semantic_tokens) or tokens from the base palette in the [base tokens list](/style/design-tokens/#base_tokens_palette).

#### Basic pack

::: react-view

<script lang="tsx">
import React from 'react';
import Color from '@components/Color';

const group = {
  basicPack: [
    '--blue-300',
    '--green-200',
    '--orange-400',
    '--pink-300',
    '--yellow-200',
    '--violet-400',
    '--red-300',
    '--salad-200',
  ],
  secondPack: [
    '--blue-400',
    '--green-300',
    '--orange-200',
    '--pink-400',
    '--yellow-300',
    '--violet-200',
    '--red-400',
    '--salad-300',
  ],
  thirdPack: [
    '--blue-200',
    '--green-400',
    '--orange-300',
    '--pink-200',
    '--yellow-400',
    '--violet-300',
    '--red-200',
    '--salad-400',
  ],
  otherData: ['--gray-200'],
  blue: ['--blue-100', '--blue-200', '--blue-300', '--blue-400', '--blue-500'],
  green: ['--green-100', '--green-200', '--green-300', '--green-400', '--green-500'],
  salad: ['--salad-100', '--salad-200', '--salad-300', '--salad-400', '--salad-500'],
  orange: ['--orange-100', '--orange-200', '--orange-300', '--orange-400', '--orange-500'],
  yellow: ['--yellow-100', '--yellow-200', '--yellow-300', '--yellow-400', '--yellow-500'],
  red: ['--red-100', '--red-200', '--red-300', '--red-400', '--red-500'],
  pink: ['--pink-100', '--pink-200', '--pink-300', '--pink-400', '--pink-500'],
  violet: ['--violet-100', '--violet-200', '--violet-300', '--violet-400', '--violet-500'],
  gray: ['--gray-100', '--gray-200', '--gray-300', '--gray-400', '--gray-500'],
};

const App = function (props) {
  const colors = group[props.group];
  if (!colors) {
    return `Group "${props.group}" not found`;
  }
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

const group = {
  basicPack: [
    '--blue-300',
    '--green-200',
    '--orange-400',
    '--pink-300',
    '--yellow-200',
    '--violet-400',
    '--red-300',
    '--salad-200',
  ],
  secondPack: [
    '--blue-400',
    '--green-300',
    '--orange-200',
    '--pink-400',
    '--yellow-300',
    '--violet-200',
    '--red-400',
    '--salad-300',
  ],
  thirdPack: [
    '--blue-200',
    '--green-400',
    '--orange-300',
    '--pink-200',
    '--yellow-400',
    '--violet-300',
    '--red-200',
    '--salad-400',
  ],
  otherData: ['--gray-200'],
  blue: ['--blue-100', '--blue-200', '--blue-300', '--blue-400', '--blue-500'],
  green: ['--green-100', '--green-200', '--green-300', '--green-400', '--green-500'],
  salad: ['--salad-100', '--salad-200', '--salad-300', '--salad-400', '--salad-500'],
  orange: ['--orange-100', '--orange-200', '--orange-300', '--orange-400', '--orange-500'],
  yellow: ['--yellow-100', '--yellow-200', '--yellow-300', '--yellow-400', '--yellow-500'],
  red: ['--red-100', '--red-200', '--red-300', '--red-400', '--red-500'],
  pink: ['--pink-100', '--pink-200', '--pink-300', '--pink-400', '--pink-500'],
  violet: ['--violet-100', '--violet-200', '--violet-300', '--violet-400', '--violet-500'],
  gray: ['--gray-100', '--gray-200', '--gray-300', '--gray-400', '--gray-500'],
};

const App = function (props) {
  const colors = group[props.group];
  if (!colors) {
    return `Group "${props.group}" not found`;
  }
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

const group = {
  basicPack: [
    '--blue-300',
    '--green-200',
    '--orange-400',
    '--pink-300',
    '--yellow-200',
    '--violet-400',
    '--red-300',
    '--salad-200',
  ],
  secondPack: [
    '--blue-400',
    '--green-300',
    '--orange-200',
    '--pink-400',
    '--yellow-300',
    '--violet-200',
    '--red-400',
    '--salad-300',
  ],
  thirdPack: [
    '--blue-200',
    '--green-400',
    '--orange-300',
    '--pink-200',
    '--yellow-400',
    '--violet-300',
    '--red-200',
    '--salad-400',
  ],
  otherData: ['--gray-200'],
  blue: ['--blue-100', '--blue-200', '--blue-300', '--blue-400', '--blue-500'],
  green: ['--green-100', '--green-200', '--green-300', '--green-400', '--green-500'],
  salad: ['--salad-100', '--salad-200', '--salad-300', '--salad-400', '--salad-500'],
  orange: ['--orange-100', '--orange-200', '--orange-300', '--orange-400', '--orange-500'],
  yellow: ['--yellow-100', '--yellow-200', '--yellow-300', '--yellow-400', '--yellow-500'],
  red: ['--red-100', '--red-200', '--red-300', '--red-400', '--red-500'],
  pink: ['--pink-100', '--pink-200', '--pink-300', '--pink-400', '--pink-500'],
  violet: ['--violet-100', '--violet-200', '--violet-300', '--violet-400', '--violet-500'],
  gray: ['--gray-100', '--gray-200', '--gray-300', '--gray-400', '--gray-500'],
};

const App = function (props) {
  const colors = group[props.group];
  if (!colors) {
    return `Group "${props.group}" not found`;
  }
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

Use `--chart-palette-order-other-data` token to indicate voids, missing or some other data.

::: react-view

<script lang="tsx">
import React from 'react';
import Color from '@components/Color';

const group = {
  basicPack: [
    '--blue-300',
    '--green-200',
    '--orange-400',
    '--pink-300',
    '--yellow-200',
    '--violet-400',
    '--red-300',
    '--salad-200',
  ],
  secondPack: [
    '--blue-400',
    '--green-300',
    '--orange-200',
    '--pink-400',
    '--yellow-300',
    '--violet-200',
    '--red-400',
    '--salad-300',
  ],
  thirdPack: [
    '--blue-200',
    '--green-400',
    '--orange-300',
    '--pink-200',
    '--yellow-400',
    '--violet-300',
    '--red-200',
    '--salad-400',
  ],
  otherData: ['--gray-200'],
  blue: ['--blue-100', '--blue-200', '--blue-300', '--blue-400', '--blue-500'],
  green: ['--green-100', '--green-200', '--green-300', '--green-400', '--green-500'],
  salad: ['--salad-100', '--salad-200', '--salad-300', '--salad-400', '--salad-500'],
  orange: ['--orange-100', '--orange-200', '--orange-300', '--orange-400', '--orange-500'],
  yellow: ['--yellow-100', '--yellow-200', '--yellow-300', '--yellow-400', '--yellow-500'],
  red: ['--red-100', '--red-200', '--red-300', '--red-400', '--red-500'],
  pink: ['--pink-100', '--pink-200', '--pink-300', '--pink-400', '--pink-500'],
  violet: ['--violet-100', '--violet-200', '--violet-300', '--violet-400', '--violet-500'],
  gray: ['--gray-100', '--gray-200', '--gray-300', '--gray-400', '--gray-500'],
};

const App = function (props) {
  const colors = group[props.group];
  if (!colors) {
    return `Group "${props.group}" not found`;
  }
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

This way helps to color your data in a monochromatic way. In this case use tokens from the base palette in the [tokens list](/style/design-tokens/#base).

#### Blue

::: react-view

<script lang="tsx">
import React from 'react';
import Color from '@components/Color';

const group = {
  basicPack: [
    '--blue-300',
    '--green-200',
    '--orange-400',
    '--pink-300',
    '--yellow-200',
    '--violet-400',
    '--red-300',
    '--salad-200',
  ],
  secondPack: [
    '--blue-400',
    '--green-300',
    '--orange-200',
    '--pink-400',
    '--yellow-300',
    '--violet-200',
    '--red-400',
    '--salad-300',
  ],
  thirdPack: [
    '--blue-200',
    '--green-400',
    '--orange-300',
    '--pink-200',
    '--yellow-400',
    '--violet-300',
    '--red-200',
    '--salad-400',
  ],
  otherData: ['--gray-200'],
  blue: ['--blue-100', '--blue-200', '--blue-300', '--blue-400', '--blue-500'],
  green: ['--green-100', '--green-200', '--green-300', '--green-400', '--green-500'],
  salad: ['--salad-100', '--salad-200', '--salad-300', '--salad-400', '--salad-500'],
  orange: ['--orange-100', '--orange-200', '--orange-300', '--orange-400', '--orange-500'],
  yellow: ['--yellow-100', '--yellow-200', '--yellow-300', '--yellow-400', '--yellow-500'],
  red: ['--red-100', '--red-200', '--red-300', '--red-400', '--red-500'],
  pink: ['--pink-100', '--pink-200', '--pink-300', '--pink-400', '--pink-500'],
  violet: ['--violet-100', '--violet-200', '--violet-300', '--violet-400', '--violet-500'],
  gray: ['--gray-100', '--gray-200', '--gray-300', '--gray-400', '--gray-500'],
};

const App = function (props) {
  const colors = group[props.group];
  if (!colors) {
    return `Group "${props.group}" not found`;
  }
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

const group = {
  basicPack: [
    '--blue-300',
    '--green-200',
    '--orange-400',
    '--pink-300',
    '--yellow-200',
    '--violet-400',
    '--red-300',
    '--salad-200',
  ],
  secondPack: [
    '--blue-400',
    '--green-300',
    '--orange-200',
    '--pink-400',
    '--yellow-300',
    '--violet-200',
    '--red-400',
    '--salad-300',
  ],
  thirdPack: [
    '--blue-200',
    '--green-400',
    '--orange-300',
    '--pink-200',
    '--yellow-400',
    '--violet-300',
    '--red-200',
    '--salad-400',
  ],
  otherData: ['--gray-200'],
  blue: ['--blue-100', '--blue-200', '--blue-300', '--blue-400', '--blue-500'],
  green: ['--green-100', '--green-200', '--green-300', '--green-400', '--green-500'],
  salad: ['--salad-100', '--salad-200', '--salad-300', '--salad-400', '--salad-500'],
  orange: ['--orange-100', '--orange-200', '--orange-300', '--orange-400', '--orange-500'],
  yellow: ['--yellow-100', '--yellow-200', '--yellow-300', '--yellow-400', '--yellow-500'],
  red: ['--red-100', '--red-200', '--red-300', '--red-400', '--red-500'],
  pink: ['--pink-100', '--pink-200', '--pink-300', '--pink-400', '--pink-500'],
  violet: ['--violet-100', '--violet-200', '--violet-300', '--violet-400', '--violet-500'],
  gray: ['--gray-100', '--gray-200', '--gray-300', '--gray-400', '--gray-500'],
};

const App = function (props) {
  const colors = group[props.group];
  if (!colors) {
    return `Group "${props.group}" not found`;
  }
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

const group = {
  basicPack: [
    '--blue-300',
    '--green-200',
    '--orange-400',
    '--pink-300',
    '--yellow-200',
    '--violet-400',
    '--red-300',
    '--salad-200',
  ],
  secondPack: [
    '--blue-400',
    '--green-300',
    '--orange-200',
    '--pink-400',
    '--yellow-300',
    '--violet-200',
    '--red-400',
    '--salad-300',
  ],
  thirdPack: [
    '--blue-200',
    '--green-400',
    '--orange-300',
    '--pink-200',
    '--yellow-400',
    '--violet-300',
    '--red-200',
    '--salad-400',
  ],
  otherData: ['--gray-200'],
  blue: ['--blue-100', '--blue-200', '--blue-300', '--blue-400', '--blue-500'],
  green: ['--green-100', '--green-200', '--green-300', '--green-400', '--green-500'],
  salad: ['--salad-100', '--salad-200', '--salad-300', '--salad-400', '--salad-500'],
  orange: ['--orange-100', '--orange-200', '--orange-300', '--orange-400', '--orange-500'],
  yellow: ['--yellow-100', '--yellow-200', '--yellow-300', '--yellow-400', '--yellow-500'],
  red: ['--red-100', '--red-200', '--red-300', '--red-400', '--red-500'],
  pink: ['--pink-100', '--pink-200', '--pink-300', '--pink-400', '--pink-500'],
  violet: ['--violet-100', '--violet-200', '--violet-300', '--violet-400', '--violet-500'],
  gray: ['--gray-100', '--gray-200', '--gray-300', '--gray-400', '--gray-500'],
};

const App = function (props) {
  const colors = group[props.group];
  if (!colors) {
    return `Group "${props.group}" not found`;
  }
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

const group = {
  basicPack: [
    '--blue-300',
    '--green-200',
    '--orange-400',
    '--pink-300',
    '--yellow-200',
    '--violet-400',
    '--red-300',
    '--salad-200',
  ],
  secondPack: [
    '--blue-400',
    '--green-300',
    '--orange-200',
    '--pink-400',
    '--yellow-300',
    '--violet-200',
    '--red-400',
    '--salad-300',
  ],
  thirdPack: [
    '--blue-200',
    '--green-400',
    '--orange-300',
    '--pink-200',
    '--yellow-400',
    '--violet-300',
    '--red-200',
    '--salad-400',
  ],
  otherData: ['--gray-200'],
  blue: ['--blue-100', '--blue-200', '--blue-300', '--blue-400', '--blue-500'],
  green: ['--green-100', '--green-200', '--green-300', '--green-400', '--green-500'],
  salad: ['--salad-100', '--salad-200', '--salad-300', '--salad-400', '--salad-500'],
  orange: ['--orange-100', '--orange-200', '--orange-300', '--orange-400', '--orange-500'],
  yellow: ['--yellow-100', '--yellow-200', '--yellow-300', '--yellow-400', '--yellow-500'],
  red: ['--red-100', '--red-200', '--red-300', '--red-400', '--red-500'],
  pink: ['--pink-100', '--pink-200', '--pink-300', '--pink-400', '--pink-500'],
  violet: ['--violet-100', '--violet-200', '--violet-300', '--violet-400', '--violet-500'],
  gray: ['--gray-100', '--gray-200', '--gray-300', '--gray-400', '--gray-500'],
};

const App = function (props) {
  const colors = group[props.group];
  if (!colors) {
    return `Group "${props.group}" not found`;
  }
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

const group = {
  basicPack: [
    '--blue-300',
    '--green-200',
    '--orange-400',
    '--pink-300',
    '--yellow-200',
    '--violet-400',
    '--red-300',
    '--salad-200',
  ],
  secondPack: [
    '--blue-400',
    '--green-300',
    '--orange-200',
    '--pink-400',
    '--yellow-300',
    '--violet-200',
    '--red-400',
    '--salad-300',
  ],
  thirdPack: [
    '--blue-200',
    '--green-400',
    '--orange-300',
    '--pink-200',
    '--yellow-400',
    '--violet-300',
    '--red-200',
    '--salad-400',
  ],
  otherData: ['--gray-200'],
  blue: ['--blue-100', '--blue-200', '--blue-300', '--blue-400', '--blue-500'],
  green: ['--green-100', '--green-200', '--green-300', '--green-400', '--green-500'],
  salad: ['--salad-100', '--salad-200', '--salad-300', '--salad-400', '--salad-500'],
  orange: ['--orange-100', '--orange-200', '--orange-300', '--orange-400', '--orange-500'],
  yellow: ['--yellow-100', '--yellow-200', '--yellow-300', '--yellow-400', '--yellow-500'],
  red: ['--red-100', '--red-200', '--red-300', '--red-400', '--red-500'],
  pink: ['--pink-100', '--pink-200', '--pink-300', '--pink-400', '--pink-500'],
  violet: ['--violet-100', '--violet-200', '--violet-300', '--violet-400', '--violet-500'],
  gray: ['--gray-100', '--gray-200', '--gray-300', '--gray-400', '--gray-500'],
};

const App = function (props) {
  const colors = group[props.group];
  if (!colors) {
    return `Group "${props.group}" not found`;
  }
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

const group = {
  basicPack: [
    '--blue-300',
    '--green-200',
    '--orange-400',
    '--pink-300',
    '--yellow-200',
    '--violet-400',
    '--red-300',
    '--salad-200',
  ],
  secondPack: [
    '--blue-400',
    '--green-300',
    '--orange-200',
    '--pink-400',
    '--yellow-300',
    '--violet-200',
    '--red-400',
    '--salad-300',
  ],
  thirdPack: [
    '--blue-200',
    '--green-400',
    '--orange-300',
    '--pink-200',
    '--yellow-400',
    '--violet-300',
    '--red-200',
    '--salad-400',
  ],
  otherData: ['--gray-200'],
  blue: ['--blue-100', '--blue-200', '--blue-300', '--blue-400', '--blue-500'],
  green: ['--green-100', '--green-200', '--green-300', '--green-400', '--green-500'],
  salad: ['--salad-100', '--salad-200', '--salad-300', '--salad-400', '--salad-500'],
  orange: ['--orange-100', '--orange-200', '--orange-300', '--orange-400', '--orange-500'],
  yellow: ['--yellow-100', '--yellow-200', '--yellow-300', '--yellow-400', '--yellow-500'],
  red: ['--red-100', '--red-200', '--red-300', '--red-400', '--red-500'],
  pink: ['--pink-100', '--pink-200', '--pink-300', '--pink-400', '--pink-500'],
  violet: ['--violet-100', '--violet-200', '--violet-300', '--violet-400', '--violet-500'],
  gray: ['--gray-100', '--gray-200', '--gray-300', '--gray-400', '--gray-500'],
};

const App = function (props) {
  const colors = group[props.group];
  if (!colors) {
    return `Group "${props.group}" not found`;
  }
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

const group = {
  basicPack: [
    '--blue-300',
    '--green-200',
    '--orange-400',
    '--pink-300',
    '--yellow-200',
    '--violet-400',
    '--red-300',
    '--salad-200',
  ],
  secondPack: [
    '--blue-400',
    '--green-300',
    '--orange-200',
    '--pink-400',
    '--yellow-300',
    '--violet-200',
    '--red-400',
    '--salad-300',
  ],
  thirdPack: [
    '--blue-200',
    '--green-400',
    '--orange-300',
    '--pink-200',
    '--yellow-400',
    '--violet-300',
    '--red-200',
    '--salad-400',
  ],
  otherData: ['--gray-200'],
  blue: ['--blue-100', '--blue-200', '--blue-300', '--blue-400', '--blue-500'],
  green: ['--green-100', '--green-200', '--green-300', '--green-400', '--green-500'],
  salad: ['--salad-100', '--salad-200', '--salad-300', '--salad-400', '--salad-500'],
  orange: ['--orange-100', '--orange-200', '--orange-300', '--orange-400', '--orange-500'],
  yellow: ['--yellow-100', '--yellow-200', '--yellow-300', '--yellow-400', '--yellow-500'],
  red: ['--red-100', '--red-200', '--red-300', '--red-400', '--red-500'],
  pink: ['--pink-100', '--pink-200', '--pink-300', '--pink-400', '--pink-500'],
  violet: ['--violet-100', '--violet-200', '--violet-300', '--violet-400', '--violet-500'],
  gray: ['--gray-100', '--gray-200', '--gray-300', '--gray-400', '--gray-500'],
};

const App = function (props) {
  const colors = group[props.group];
  if (!colors) {
    return `Group "${props.group}" not found`;
  }
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

const group = {
  basicPack: [
    '--blue-300',
    '--green-200',
    '--orange-400',
    '--pink-300',
    '--yellow-200',
    '--violet-400',
    '--red-300',
    '--salad-200',
  ],
  secondPack: [
    '--blue-400',
    '--green-300',
    '--orange-200',
    '--pink-400',
    '--yellow-300',
    '--violet-200',
    '--red-400',
    '--salad-300',
  ],
  thirdPack: [
    '--blue-200',
    '--green-400',
    '--orange-300',
    '--pink-200',
    '--yellow-400',
    '--violet-300',
    '--red-200',
    '--salad-400',
  ],
  otherData: ['--gray-200'],
  blue: ['--blue-100', '--blue-200', '--blue-300', '--blue-400', '--blue-500'],
  green: ['--green-100', '--green-200', '--green-300', '--green-400', '--green-500'],
  salad: ['--salad-100', '--salad-200', '--salad-300', '--salad-400', '--salad-500'],
  orange: ['--orange-100', '--orange-200', '--orange-300', '--orange-400', '--orange-500'],
  yellow: ['--yellow-100', '--yellow-200', '--yellow-300', '--yellow-400', '--yellow-500'],
  red: ['--red-100', '--red-200', '--red-300', '--red-400', '--red-500'],
  pink: ['--pink-100', '--pink-200', '--pink-300', '--pink-400', '--pink-500'],
  violet: ['--violet-100', '--violet-200', '--violet-300', '--violet-400', '--violet-500'],
  gray: ['--gray-100', '--gray-200', '--gray-300', '--gray-400', '--gray-500'],
};

const App = function (props) {
  const colors = group[props.group];
  if (!colors) {
    return `Group "${props.group}" not found`;
  }
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

const group = {
  basicPack: [
    '--blue-300',
    '--green-200',
    '--orange-400',
    '--pink-300',
    '--yellow-200',
    '--violet-400',
    '--red-300',
    '--salad-200',
  ],
  secondPack: [
    '--blue-400',
    '--green-300',
    '--orange-200',
    '--pink-400',
    '--yellow-300',
    '--violet-200',
    '--red-400',
    '--salad-300',
  ],
  thirdPack: [
    '--blue-200',
    '--green-400',
    '--orange-300',
    '--pink-200',
    '--yellow-400',
    '--violet-300',
    '--red-200',
    '--salad-400',
  ],
  otherData: ['--gray-200'],
  blue: ['--blue-100', '--blue-200', '--blue-300', '--blue-400', '--blue-500'],
  green: ['--green-100', '--green-200', '--green-300', '--green-400', '--green-500'],
  salad: ['--salad-100', '--salad-200', '--salad-300', '--salad-400', '--salad-500'],
  orange: ['--orange-100', '--orange-200', '--orange-300', '--orange-400', '--orange-500'],
  yellow: ['--yellow-100', '--yellow-200', '--yellow-300', '--yellow-400', '--yellow-500'],
  red: ['--red-100', '--red-200', '--red-300', '--red-400', '--red-500'],
  pink: ['--pink-100', '--pink-200', '--pink-300', '--pink-400', '--pink-500'],
  violet: ['--violet-100', '--violet-200', '--violet-300', '--violet-400', '--violet-500'],
  gray: ['--gray-100', '--gray-200', '--gray-300', '--gray-400', '--gray-500'],
};

const App = function (props) {
  const colors = group[props.group];
  if (!colors) {
    return `Group "${props.group}" not found`;
  }
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

30 and more colors are for the really complex cases where you need a large number of colors that will be set for the data by the system.

To make a usable palette for this case first use [tokens from the base palette](/style/design-tokens/#base_tokens_palette) with a hue of 300, then 200, then 400 and repeat this steps until you get the desired number of colors.
