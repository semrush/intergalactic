---
title: ProgressBar
fileSource: progress-bar
tabs: Design('progress-bar'), A11y('progress-bar-a11y'), API('progress-bar-api'), Example('progress-bar-code'), Changelog('progress-bar-changelog')
---

::: react-view

<script lang="tsx">
import React from 'react';
import ProgressBar from '@semcore/ui/progress-bar';
import PlaygroundGeneration from '@components/PlaygroundGeneration';

const SIZES = ['l', 'm', 's'];

const Preview = (preview) => {
  const { radio, text, select } = preview('ProgressBar');

  const size = radio({
    key: 'size',
    defaultValue: 'm',
    label: 'Size',
    options: SIZES,
  });

  const theme = select({
    key: 'theme',
    defaultValue: 'invert',
    label: 'Theme',
    options: [
      {
        name: 'invert',
        value: 'invert',
      },
      {
        name: 'dark',
        value: 'dark',
      },
    ],
  });

  const duration = text({
    key: 'duration',
    defaultValue: 1000,
    label: 'Duration',
  });

  const value = text({
    key: 'value',
    defaultValue: 50,
    label: 'Value',
  });

  return <ProgressBar theme={theme} size={size} duration={duration} value={value} w={200} aria-label="Progress bar" />;
};

const App = PlaygroundGeneration(Preview, {filterProps: ['w']});
</script>

:::

## Description

**ProgressBar** is a component used to display the loading status of a long process, typically taking more than 5 seconds, such as collecting keywords or updating mentions.

::: tip
This component demonstrates the loading and response to user actions in the interface. For general recommendations regarding such components, refer to the [Loading patterns](/patterns/loading-states/loading-states).
:::

In general, the progress bar doesn't obstruct the functionality of the product. However, there is an exception during the first launch of the product when the data may be partially displayed or not displayed at all.

## Component composition

ProgressBar consists of two main elements: `ProgressBar` and `ProgressBar.Value`.

![](static/progressbar-composition.png)

## Sizes

Our ProgressBar has three sizes.

Table: ProgressBar sizes and styles

| Size (height in px) | Appearance example   | Border-radius token     | Where to use        |
| ------------------- | -------------------- | ----------------------- | ------------------- |
| S (4px)    | ![](static/size-s.png) | `--rounded-medium`  | Use in widgets inside reports/products.                               |
| M (8px)    | ![](static/size-m.png) | `--rounded-medium`  | Use inside the product.                                               |
| L (12px)    | ![](static/size-l.png) | `--rounded-medium` | Use in modal windows or the start screen. |

## Themes

ProgressBar offers two themes: `dark` and `invert`, which are suitable for light and dark/colored backgrounds respectively. Both themes use the `--progress-bar-value` token for color with a gradient pattern to indicate progress.

Table: ProgressBar themes

| Theme  | Appearance example       | Background token            |
| ------ | ------------------------ | --------------------------- |
| Invert | ![](static/size-l.png)   | `--progress-bar-bg`         |
| Dark   | ![](static/dark-theme.png) | `--progress-bar-bg-invert`|

## Usage with counter

A counter can be added next to the ProgressBar to indicate the number of loaded data. If the exact number of the data is unknown, the counter shouldn't be displayed. **Place the counter above or near the ProgressBar, ensuring that the margins between the counter and the ProgressBar are multiples of 4.**

![](static/progressbar-counter.png)

![](static/progressbar-counter-above.png)

## Interaction

### States

The ProgressBar has three states:

Table: ProgressBar states

| State | Appearance example  |
| ----- | ------------------- |
| 0% – The progress bar is colored in gray and animated. | ![](static/loading-gray.png) |
| 1-99% – The progress bar is partially filled and the pattern is animated. | ![](static/size-l.png) |
| 100% – The progress bar is static and green. | ![](static/loaded.png) |

The progress bar shouldn't remain in the 100% state. Once the process is completed, either a success message should be displayed, or the user should be provided with further actions.

::: tip
If it isn’t possible to perform the action immediately, display the success status and instruct the user on what to do next.
:::

### Animation

The progress value is always animated with `ease-in`.

## Usage in UX/UI

### When to use ProgressBar

- To visualize a long process that doesn't block working with data.
- When you need to visualize a short process, but it is essential to show how much is left until the end of the process, such as uploading multiple files.
- If the process is long and blocks working with data, but the user needs to know when the process will end.

::: tip
In certain cases, you can use an animation without the green bar instead of the progress bar when launching the product. This can be done when you don't know how long the data collection will take or to create the illusion of the user approaching the end of the process.
:::

### Pinned ProgressBar

When scrolling, the progress bar can be pinned, remaining visible above all components, including filters and table headers.

![](static/progressbar-sticky.png)

### Avoid Using ProgressBar

- For short actions that take less than 5 seconds, consider using [Spin](/components/spin/spin) instead.
- To display steps, such as when filling out a form.

### Specific cases

- If the download process is too long and we know about it in advance, the progress shall be visualized immediately.
- If the exact or approximate loading time isn’t known, wait for 3 seconds and display the fake progress.
- In cases when loading is very fast, set the minimum time for displaying the progress bar – 3 seconds. This is necessary to avoid "blinking" of the interface.
- If the download process is expected to be long, visualize the progress immediately.
- If the exact or approximate loading time is unknown, wait for 3 seconds and display the fake progress.
- For very fast loading, set the minimum time for displaying the progress bar to 3 seconds to avoid interface "blinking."

