---
title: Spin
fileSource: spin
tabs: Design('spin'), A11y('spin-a11y'), API('spin-api'), Changelog('spin-changelog')
---

::: react-view

<script lang="tsx">
import React from 'react';
import Spin from '@semcore/ui/spin';
import { Flex } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';
import PlaygroundGeneration from '@components/PlaygroundGeneration';

const SIZES = ['xs', 's', 'm', 'l', 'xl', 'xxl'];
const THEMES = ['dark', 'invert'];
function getSizeText(sizeSpin) {
  if (sizeSpin.includes('l') || sizeSpin.includes('m')) {
    return 300;
  }
  if (sizeSpin.includes('s')) {
    return 200;
  }
  return 100;
}
function getMarginText(orientation = 'bottom', sizeSpin = undefined) {
  if (orientation === 'right') {
    if (sizeSpin.includes('xl')) {
      return '0 0 0 16px';
    }
    if (sizeSpin.includes('xs')) {
      return '0 0 0 4px';
    }
    return '0 0 0 8px';
  }
  if (sizeSpin.includes('s')) {
    return '4px 0 0';
  }

  return '8px 0 0';
}

const App = PlaygroundGeneration((createGroupWidgets) => {
  const { bool, select, radio, text: textWidget } = createGroupWidgets('Spin');

  const size = select({
    key: 'size',
    defaultValue: 'm',
    label: 'Size',
    options: SIZES.map((value) => ({
      name: value,
      value,
    })),
  });

  const theme = radio({
    key: 'theme',
    defaultValue: 'dark',
    label: 'Theme',
    options: THEMES,
  });

  const centered = bool({
    key: 'centered',
    defaultValue: true,
    label: 'Centered',
  });

  const text = textWidget({
    key: 'text',
    defaultValue: '',
    label: 'Text',
  });

  const textRight = bool({
    key: 'textRight',
    defaultValue: false,
    label: 'TextRight',
  });

  if (text.length) {
    return (
      <Flex
        m={centered ? 'auto' : 0}
        alignItems='center'
        justifyContent='center'
        direction={textRight ? 'row' : 'column'}
      >
        <Spin size={size} theme={theme} />
        {
          <Text
            tag='div'
            m={textRight ? getMarginText('right', size) : getMarginText('bottom', size)}
          >
            <Text size={getSizeText(size)} color='gray60'>
              {text}
            </Text>
          </Text>
        }
      </Flex>
    );
  }

  return <Spin size={size} theme={theme} centered={centered} />;
});
</script>

:::

## Description

**Spin** is a component used to display the loading state of a page, section, or widget when the system does not have an exact data loading time.

To display Spin around any component, use [SpinContainer](/components/spin-container/spin-container).

::: tip
This component demonstrates the loading and response to user actions in the interface. For general recommendations regarding such components, refer to the [Loading patterns](/patterns/loading-states/loading-states).
:::

## Sizes and margins

The Spin component comes in six different sizes. The text size should be at least 14px.

Table: Spin sizes and margins

| Size    | Text below                        | Text on the right                   |
| ------- | --------------------------------- | ----------------------------------- |
| **XS**  | ![](static/text-vertical-xs.png)  | ![](static/text-horizontal-xs.png)  |
| **S**   | ![](static/text-vertical-s.png)   | ![](static/text-horizontal-s.png)   |
| **M**   | ![](static/text-vertical-m.png)   | ![](static/text-horizontal-m.png)   |
| **L**   | ![](static/text-vertical-l.png)   | ![](static/text-horizontal-l.png)   |
| **XL**  | ![](static/text-vertical-xl.png)  | ![](static/text-horizontal-xl.png)  |
| **XXL** | ![](static/text-vertical-xxl.png) | ![](static/text-horizontal-xxl.png) |

## Styles

::: tip
For recommendations on Spin positioning and indents in blocks and on the page, refer to [SpinContainer](/components/spin-container/spin-container).
:::

You can place text next to the spinner to inform the user that data is being loaded. The text should use the `--text-secondary` token for color, as it is considered a secondary message according to the overall visual hierarchy of the page.

**Text can be placed on the right or below the spinner.** In small components, blocks, and widgets, place the text to the right of the spinner. For large components, blocks of components, or inside large blocks and widgets, we recommend placing the text below the spinner and using one of the four largest Spin sizes.

## Themes

Spin has two themes: `dark` and `invert` – for use on light and dark/colored backgrounds, respectively. Additionally, you can customize the Spin color as needed.

Table: Spin themes

| Theme    | Appearance example        | Description                                          |
| -------- | ------------------------- | ---------------------------------------------------- |
| `dark`   | ![](static/dark-m.png)    | Use this theme of Spin on a light background.        |
| `invert` | ![](static/invert-m.png)  | Use this theme of Spin on a dark/colored background. |

## Animation

For Spin appearance and disappearance, use an animation with a 300ms delay and `ease-out` easing.

## Usage in UX/UI

Remember that the page loading indicator should help the user estimate the interface's response time (specifically how long they should wait for a certain result). Therefore, in cases where the system cannot determine the exact data loading time, we recommend adding an explanatory message next to the spinner, for example:  **Loading...**.

