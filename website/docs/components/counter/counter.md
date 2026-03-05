---
title: Counter
fileSource: counter
tabs: Design('counter'), A11y('counter-a11y'), API('counter-api'), Example('counter-code'), Changelog('counter-changelog')
---

<Playground for="Counter" />

## Description

**Counter** is a component that displays the quantity.

It's used in various components such as:

- controls,
- limit progress bars,
- widget titles,
- table headers,
- etc.

::: tip
Counter is a static component and shouldn't be clickable.
:::

## Appearance

### Themes

The appropriate theme for a counter depends on the context and the element the counter is related to.

Table: Counter themes

| Theme     | Appearance examples      | Styles    | Usage           |
| --------- | ------------------------ | --------- | --------------- |
| default        | ![](static/secondary.png) ![](static/textarea.png) | `background-color: var(--bg-primary-neutral)`, `border: 1px solid var(--border-primary)`, `color: var(--text-secondary)` | Use inside secondary controls and next to various types of inputs. |                                                                    |
| `light-blue`     | ![](static/filter.png) | `background-color: var(--bg-primary-info)`, `color: var(--text-invert)`                                                   | Use in filters to indicate the number of selected values.                    |
| `orange`         | ![](static/orange.png)     | `background-color: var(--bg-primary-warning)`, `color: var(--text-invert)`                                                | Use to display a reached or almost reached limit.                                  |
| `red`            | ![](static/red.png)           | `background-color: var(--bg-primary-critical)`, `color: var(--text-invert)`                                               | Use to display an exceeded limit.                                     |
| `white` (invert) | ![](static/invert.png)     | `background-color: var(--bg-primary-neutral)`, `color: var(--text-primary)`                                               | Use inside primary controls with a bright/dark background color.   |

## Text counters

The size of text counters is determined by the typography used in the element where the numeric value is being displayed. Typically, these counters are positioned near widget or table titles, within text, and other relevant locations. Additional examples can be found on the [Example page](/components/counter/counter-code).

_For example, the counter in the table title has the same text size as the title itself._

![](static/heading.png)

![](static/widget-heading.png)

![](static/pills.png)

![](static/limit.png)

![](static/dot.png)

## Counter location

The counter should always be positioned to the right of other interface elements, because it's an additional data.

## Usage in UX/UI

Use a counter to display an element that changes numerically.

Table: Counter usage examples

| Counter type             | Usage                            |
| ------------------------ | -------------------------------- |
| Output data counter      | Usually it shows the total results. Use it next to the title of a table or widget. <br/><br/> ![](static/table.png){width=150px} |
| Entered data counter     | The counter typically displays the limit of characters allowed, commonly used in [Input](/components/input/input) and [Textarea](/components/textarea/textarea). When the limit is reached or surpassed, the color of the counter changes. <br/><br/> ![](static/textarea.png){width=150px} |
| Limits                   | The counter changes color to indicate when the limit has been exceeded. <br/><br/> ![](static/limit-counter.png){width=150px} |

In primary controls, use a counter with the `white` (invert) theme. Otherwise, it won't be readable on a bright/dark background.

![](static/button-counter.png)

For notifications, use the [Dot](/components/dot/dot) component with a counter inside.

![](static/notification-yes-no.png)

In a table, a text counter can be used inside a tag to mark or group the data.

