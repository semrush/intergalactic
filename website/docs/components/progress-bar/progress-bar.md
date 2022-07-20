---
title: ProgressBar
fileSource: progress-bar
tabName: Design
---

@import playground

> 💡 This component is one of the components that displays interface's reaction to user actions in the interface. For general rules on such components, see the [Loading patterns](/patterns/loading-states/).

@## Description

**ProgressBar** is a component for displaying the loading status of a long process, usually more than 5 seconds. _For example, collecting keywords or updating mentions._

As a rule, the progress bar does not block working with the product. The exception is the first launch of the product when the data is partially displayed or not displayed at all.

> 💡 This component is one of the components that displays the loading and response to user actions in the interface. For general recommendations for such components, see [Loading patterns](/patterns/loading-states/).

@## Component composition

ProgressBar consists from (surprise!) `ProgressBar` and `ProgressBar.Value`.

![progress bar scheme](static/progressbar-scheme.png)

@## Sizes

Our ProgressBar has three sizes.

| Size | Appearance                               | Styles                              | Where to use                                                          |
| ---- | ---------------------------------------- | ----------------------------------- | --------------------------------------------------------------------- |
| L    | ![L sise progressbar](static/size-l.png) | `height: 12px; border-radius: 6px;` | Use in modal windows, on the start screen when launching the product. |
| M    | ![M size progressbar](static/size-m.png) | `height: 8px; border-radius: 6px;`  | Use inside the product.                                               |
| S    | ![S size progressbar](static/size-s.png) | `height: 4px; border-radius: 6px;`  | Use in widgets inside reports/products.                               |

@## Themes and styles

ProgressBar has two themes: `dark` and `invert` — for using on light and dark/colored backgrounds, respectively.

Both themes use the color `--green-400` with a pattern to display progress value.

| Theme  | Appearance                                            | Styles                          |
| ------ | ----------------------------------------------------- | ------------------------------- |
| invert | ![progressbar with invert theme](static/size-l.png)   | `background: rgba(gray-100);`   |
| dark   | ![progressbar with dark theme](static/dark-theme.png) | `background: rgba(white, 0.2);` |

@## Interaction

### States

ProgressBar has three states:

- 0% – the progress bar is colored in gray and has animation.

![progressbar without progress](static/loading-gray.png)

- 11-99% – the progress bar is partially filled and the pattern is animated.

![progressbar with the "in progress" state](static/size-l.png)

- 100% – the progress bar is static, green.

![progressbar with the loaded state](static/loaded.png)

The progress bar shall not remain in the 100% state – once the process is completed, either a message about the success of the process shall be displayed, or offer the user further actions.

> 💡 If it is not possible to perform the action immediately, the success status shall be displayed and the user shall be told what to do next.

Display a counter next to the progress bar to show how many of the files were loaded. If there is no data on the exact number of files, then display nothing.

Depending on the usage context, place a counter above or near the progress bar.

**The margins between the counter and the progress bar shall be a multiple of 4**.

![progressbar with the counter](static/progressbar-counter.png)

![progressbar with the counter](static/progressbar-counter-above.png)

### Animation

Progress value is always animated with `ease-in`.

@## Use in UX/UI

### When to use ProgressBar

- If you need to visualize a long process and it doesn't block working with data.
- When you need to visualize a short process, but it is important to show how much is left until the end of the process. _For example, uploading multiple files._
- If the process is long and blocks working with data, but it is necessary to let the user know when this process will end.

> 💡 Sometimes you can use an animation without the green bar instead of the progress bar when launching the product. This can be done when you don't know how long the data collection will take. Or make a fake progress bar which will create the illusion of the user approaching the end of the process.

### Pinned ProgressBar

When scrolling, the progress bar can be pinned. In this case, pin it above all components, including filters, table headers, etc.

![progressbar sticky](static/progressbar-sticky.png)

### Don't use ProgressBar

- If you need to show some short action (no more than 5 seconds). It is better to use [Spin](/components/spin/) in this case.
- To display steps (for example, when filling out a form).

### Operation algorithm and time

- If the download process is too long and we know about it in advance, the progress shall be visualized immediately.
- If the exact or approximate loading time is not known, wait for 3 seconds and display the fake progress.
- In cases when loading is very fast, set the minimum time for displaying the progress bar – 3 seconds. This is necessary to avoid "blinking" of the interface.

> 💡 This component is one of the components that displays interface's reaction to user actions in the interface. For general rules on such components, see the [Loading patterns](/patterns/loading-states/).

@page progress-bar-api
@page progress-bar-code
@page progress-bar-changelog
