---
title: ProgressBar
fileSource: progress-bar
tabName: Design
---

@import playground

@## Description

**ProgressBar** is a component used to display the loading status of a long process, typically taking more than 5 seconds, such as collecting keywords or updating mentions.

> This component demonstrates the loading and response to user actions in the interface. For general recommendations regarding such components, refer to the [Loading patterns](/patterns/loading-states/).

In general, the progress bar does not obstruct the functionality of the product. However, there is an exception during the first launch of the product when the data may be partially displayed or not displayed at all.

@## Component composition

ProgressBar consists of two main elements: `ProgressBar` and `ProgressBar.Value`.

![](static/progressbar-scheme.png)

@## Sizes and styles

Our ProgressBar has three sizes.

@table-caption ProgressBar sizes and styles

| Size (height in px) | Appearance example   | Border-radius token     | Where to use        |
| ------------------- | -------------------- | ----------------------- | ------------------- |
| S (4px)    | ![](static/size-s.png) | `--rounded-medium`  | Use in widgets inside reports/products.                               |
| M (8px)    | ![](static/size-m.png) | `--rounded-medium`  | Use inside the product.                                               |
| L (12px)    | ![](static/size-l.png) | `--rounded-medium` | Use in modal windows or the start screen. |

@## Themes

ProgressBar offers two themes: `dark` and `invert`, which are suitable for light and dark/colored backgrounds respectively. Both themes use the `--progress-bar-value` token for color with a gradient pattern to indicate progress.

@table-caption ProgressBar themes

| Theme  | Appearance example       | Background token            |
| ------ | ------------------------ | --------------------------- |
| Invert | ![](static/size-l.png)   | `--progress-bar-bg`         |
| Dark   | ![](static/dark-theme.png) | `--progress-bar-bg-invert`|

@## ProgressBar with counter

A counter can be added next to the ProgressBar to indicate the number of loaded data. If the exact number of the data is unknown, the counter should not be displayed. **Place the counter above or near the ProgressBar, ensuring that the margins between the counter and the ProgressBar are multiples of 4.**

![](static/progressbar-counter.png)

![](static/progressbar-counter-above.png)

@## Interaction

### States

The ProgressBar has three states:

@table-caption ProgressBar states

| State | Appearance example  |
| ----- | ------------------- |
| 0% – The progress bar is colored in gray and animated. | ![](static/loading-gray.png) |
| 1-99% – The progress bar is partially filled and the pattern is animated. | ![](static/size-l.png) |
| 100% – The progress bar is static and green. | ![](static/loaded.png) |

The progress bar should not remain in the 100% state. Once the process is completed, either a success message should be displayed, or the user should be provided with further actions.

> If it isn’t possible to perform the action immediately, display the success status and instruct the user on what to do next.

### Animation

The progress value is always animated with `ease-in`.

@## Usage in UX/UI

### When to use ProgressBar

- To visualize a long process that does not block working with data.
- When you need to visualize a short process, but it is essential to show how much is left until the end of the process, such as uploading multiple files.
- If the process is long and blocks working with data, but the user needs to know when the process will end.

> In certain cases, you can use an animation without the green bar instead of the progress bar when launching the product. This can be done when you don't know how long the data collection will take or to create the illusion of the user approaching the end of the process.

### Pinned ProgressBar

When scrolling, the progress bar can be pinned, remaining visible above all components, including filters and table headers.

![](static/progressbar-sticky.png)

### Avoid Using ProgressBar

- For short actions that take less than 5 seconds, consider using [Spin](/components/spin/) instead.
- To display steps, such as when filling out a form.

### Specific cases

- If the download process is too long and we know about it in advance, the progress shall be visualized immediately.
- If the exact or approximate loading time isn’t known, wait for 3 seconds and display the fake progress.
- In cases when loading is very fast, set the minimum time for displaying the progress bar – 3 seconds. This is necessary to avoid "blinking" of the interface.
  
- If the download process is expected to be long, visualize the progress immediately.
- If the exact or approximate loading time is unknown, wait for 3 seconds and display the fake progress.
- For very fast loading, set the minimum time for displaying the progress bar to 3 seconds to avoid interface "blinking."

@page progress-bar-a11y
@page progress-bar-api
@page progress-bar-code
@page progress-bar-changelog
