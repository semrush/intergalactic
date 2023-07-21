---
title: Typography
fileSource: typography
tabName: Design
---

@## Font

We use the [Inter](https://fonts.google.com/specimen/Inter?query=inter) font family in the design system.

@## Basic text colors

For the main text color use `--text-primary` token.

For the secondary text color use `--text-secondary` token.

Besides, both paragraphs headings and text can be colored in our main semantic colors. Depending on the situation, they are green, red, and orange.

> Use this opportunity thoughtfully, and don’t abuse the text coloring, as it can reduce it's readability. **Don't forget to check the text for contrast against its background**.

@## Font size and line height

| px   | em      | Font size tokens | Line height tokens |
| ---- | ------- | ---------------- | ------------------ |
| 48px | 3em     | `--fs-800`       | `--lh-800`         |
| 36px | 2.25em  | `--fs-700`      | `--lh-700`        |
| 32px | 2em     | `--fs-600`      | `--lh-600`        |
| 24px | 1.5em   | `--fs-500`      | `--lh-500`        |
| 20px | 1.25em  | `--fs-400`      | `--lh-400`        |
| 16px | 1em     | `--fs-300`      | `--lh-300`        |
| 14px | 0.875em | `--fs-200`      | `--lh-200`        |
| 12px | 0.75em  | `--fs-100`      | `--lh-100`        |

@example text-sizes

@## Heading

There are 6 sizes of headings in the design system.

The first 4 headings are usually used in hero blocks, large advertising screens, banners and landing pages. Use `semibold` font-weight (`--semi-bold` token) for the big headings.

|     | Appearance           | Styles                                                   | Tokens                 |
| --- | -------------------- | -------------------------------------------------------- | ---------------------- |
| h1  | ![](static/h1.png) | `font-size: 48px`, `line-height: 1.17`, `font-weight: semibold` | `--fs-800`, `--lh-800` |
| h2  | ![](static/h2.png) | `font-size: 36px`, `line-height: 1.11`, `font-weight: semibold` | `--fs-700`, `--lh-700`  |
| h3  | ![](static/h3.png) | `font-size: 32px`, `line-height: 1.25`, `font-weight: semibold` | `--fs-600`, `--lh-600`  |
| h4  | ![](static/h4.png) | `font-size: 24px`, `line-height: 1.17`, `font-weight: semibold` | `--fs-500`, `--lh-500`  |

The remaining headings are used for the content part of products and landing pages. For the headings with 16px size and smaller use `bold` font-weight (`--bold` token).

|     | Appearance           | Styles                                                  | Tokens                |
| --- | -------------------- | ------------------------------------------------------- | --------------------- |
| h5  | ![](static/h5.png) | `font-size: 20px`, `line-height: 1.2`, `font-weight: semibold` | `--fs-400`, `--lh-400` |
| h6  | ![](static/h6.png) | `font-size: 16px`, `line-height: 1.5`, `font-weight: bold` | `--fs-300`, `--lh-300` |

@## Heading with counter

A heading can contain additional information, such as a counter of results found, and so on. They can be found in table headings. In these cases, the additional information is presented by secondary text (`--text-secondary` token) and `regular` font-weight (`--regular` token).

![](static/secondary-info.png)

@## Heading for mobile devices

To improve readability on different screens, change the size of the headings, depending on the [breakpoint](/layout/grid-system/).

> Change only font styles, not the markup.

| 0px – 768px                        | 768px – ∞                           |
| ---------------------------------- | ----------------------------------- |
| H1 (36/40) – `--fs-700`, `--lh-700` | H1 (48/56) – `--fs-800`, `--lh-800` |
| H2 (32/40) – `--fs-600`, `--lh-600` | H2 (36/40) – `--fs-700`, `--lh-700`  |
| H3 (24/28) – `--fs-500`, `--lh-500` | H3 (32/40) – `--fs-600`, `--lh-600`  |
| H4 (20/24) – `--fs-400`, `--lh-400` | H4 (24/28) – `--fs-500`, `--lh-500`  |
| H5 (16/24) – `--fs-300`, `--lh-300` | H5 (20/24) – `--fs-400`, `--lh-400`  |
| H6 (14/20) – `--fs-200`, `--lh-200` | H6 (16/24) – `--fs-300`, `--lh-300`  |

@## Paragraph

There are three text sizes we use in our products.

### 16px text

![Paragraph with 16px text has 16px margin-bottom.](static/p-16.png)

### 14px text

![Paragraph with 14px text has 12px margin-bottom.](static/p-14.png)

### 12px text

![Paragraph with 12px text has 8px margin-bottom.](static/p-12.png)

@example paragraph

@## Paragraph margins

Paragraphs have a margin-bottom, and each of the three paragraph sizes has its own margin. A paragraph of 16px has a margin-bottom of 16px, a paragraph of 14px – 12px, a paragraph of 12px text – 8px.

You can also use these margins when a paragraph is followed by a paragraph of smaller font size.

![](static/paragraph_margins.png)

@## Metric

Use these styles for highlighting metrics in your interface.

| px   | Tokens                | Appearance                           |
| ---- | --------------------- | ------------------------------------ |
| 32px | `--fs-600`, `--lh-600` | ![](static/metric-600.png) |
| 24px | `--fs-500`, `--lh-500` | ![](static/metric-500.png) |
| 20px | `--fs-400`, `--lh-400` | ![](static/metric-400.png) |
| 16px | `--fs-300`, `--lh-300` | ![](static/metric-300.png) |
| 14px | `--fs-200`, `--lh-200` | ![](static/metric-200.png) |

@example metric

@## Text styles

You can change text's style: make it `bold`, `italic`, a [link](/components/link/), a hint, or even `strikethrough`.

@example text-emphasis

@## List

| px  | Tokens | Styles | Numbered list | Unordered list | Check list |
| --- | ------ | ------ | ------------- | -------------- | ---------- |
| 16px | `--fs-300`, `--lh-300` | `margin-bottom: 8px`, `padding-right: 8px` | ![](static/ol-16.png) | ![](static/ul-16.png) | ![](static/checklist-16.png) |
| 14px | `--fs-200`, `--lh-200` | `margin-bottom: 8px`, `padding-right: 8px` | ![](static/ol-14.png) | ![](static/ul-14.png) | ![](static/checklist-14.png) |
| 12px | `--fs-100`, `--lh-100` | `margin-bottom: 8px`, `padding-right: 8px` | ![](static/ol-12.png) | ![](static/ul-12.png) | ![](static/checklist-12.png) |

@## Nested list

Each next level of the nested list is always indented to the left. **Indents between the list levels for all font sizes are 8px**.

| px   | Tokens                | Margins                                          |
| ---- | --------------------- | ------------------------------------------------ |
| 16px | `--fs-300`, `--lh-300` | ![](static/second-level-16.png) |
| 14px | `--fs-200`, `--lh-200` | ![](static/second-level-14.png) |
| 12px | `--fs-100`, `--lh-100` | ![](static/second-level-12.png) |

@## Quote

We have special styles for highlighting quotes in paragraphs.

![](static/blockquote-paddings.png)

@## Hints (hint links)

The text can be wrapped in a **hint link (pseudo-link)**. In this case, it becomes an inactive control that triggers events on the page without its reloading. Use a pseudo-link for hints.

![](static/hint-link.png)

### Hint link states

| State        | Appearance                            | Styles and tokens                                                                                                                                  | Cursor                                                          |
| ------------ | ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| Normal       | ![](static/hint-default.png)    | `--text-hint` and underlined with dashed border-bottom.                                                                                            | `help` or `pointer`, if clickable                               |
| Active/hover | ![](static/hint-hover.png)       | `--text-hint-hover-active` and underlined with dashed border-bottom. If link is used with an icon, the icon changes its color along with the text. | `help`, `default` or `pointer` (depending on the usage context) |
| Disabled     | ![](static/hint-disabled.png) | `--disabled-opacity`. Use this state as the last resort and be sure to label the disabled link with an explanatory tooltip.                        | `default`                                                       |
| visited      |                                       | This link does not have `visited` state.                                                                                                           |                                                                 |

@## Which heading with which paragraph size shall be used?

**Use 16px paragraph with the following headings:**

![](static/h1-p.png)

![](static/h2-p.png)

![](static/h3-p.png)

**Use 14px paragraph with the following heading:**

![](static/h4-p.png)

![](static/h5-p.png)

![](static/h6-p.png)

@page typography-a11y
@page typography-api
@page typography-code
@page typography-changelog
