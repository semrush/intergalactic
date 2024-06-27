---
title: Typography
fileSource: typography
tabs: Design('typography'), A11y('typography-a11y'), API('typography-api'), Example('typography-code'), Changelog('typography-changelog')
---

## Font

In our design system, we use the [Inter](https://fonts.google.com/specimen/Inter?query=inter) font family.

## Basic text colors

To specify the main text color, use the `--text-primary` token.

For the secondary text color, utilize the `--text-secondary` token.

Additionally, both paragraphs, headings, and text can be colored with our main semantic colors, which include `--text-success`, `--text-critical` and others.

Please use text coloring thoughtfully and avoid excessive use, as it may reduce readability. Always ensure text contrast against its background.

## Font size and line height

Table: Font size and line height

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

::: sandbox

<script lang="tsx">
  export Demo from './examples/font-size-and-line-height.tsx';
</script>

:::

## Headings

Our design system offers six heading sizes.

The first four headings are typically used for hero blocks, large advertising screens, banners, and landing pages. Use the `semibold` font-weight (`--semi-bold` token) with these headings.

Table: Heading from 48px to 24px styles

| Appearance           | Styles                     | Tokens                 |
| -------------------- | -------------------------- | ---------------------- |
| ![](static/h1.png) | `font-size: 48px`, `line-height: 1.17`, `font-weight: semibold` | `--fs-800`, `--lh-800` |
| ![](static/h2.png) | `font-size: 36px`, `line-height: 1.11`, `font-weight: semibold` | `--fs-700`, `--lh-700`  |
| ![](static/h3.png) | `font-size: 32px`, `line-height: 1.25`, `font-weight: semibold` | `--fs-600`, `--lh-600`  |
| ![](static/h4.png) | `font-size: 24px`, `line-height: 1.17`, `font-weight: semibold` | `--fs-500`, `--lh-500`  |

The remaining headings are used for the content part of products and landing pages. For headings with a size of 16px and smaller, use the `bold` font-weight (`--bold` token).

Table: Heading from 20px to 16px styles

| Appearance           | Styles                                                  | Tokens                |
| -------------------- | ------------------------------------------------------- | --------------------- |
| ![](static/h5.png) | `font-size: 20px`, `line-height: 1.2`, `font-weight: semibold` | `--fs-400`, `--lh-400` |
| ![](static/h6.png) | `font-size: 16px`, `line-height: 1.5`, `font-weight: bold` | `--fs-300`, `--lh-300` |

## Heading with counter

In certain cases, headings can include additional information, such as a counter of results found. These are often used in table headings. In such cases, the additional information is presented using the secondary text (`--text-secondary` token) and `regular` font-weight (`--regular` token).

![](static/secondary-info.png)

## Headings for mobile devices

To improve readability on different screens, adjust the size of headings based on the [breakpoints](/layout/grid-system/grid-system).

::: tip
Only change font styles, not the markup.
:::

Table: Heading styles for mobile devices

| 0px – 768px                    | 768px – ∞                       |
| ------------------------------ | ------------------------------- |
| 36/40 – `--fs-700`, `--lh-700` | 48/56 – `--fs-800`, `--lh-800`  |
| 32/40 – `--fs-600`, `--lh-600` | 36/40 – `--fs-700`, `--lh-700`  |
| 24/28 – `--fs-500`, `--lh-500` | 32/40 – `--fs-600`, `--lh-600`  |
| 20/24 – `--fs-400`, `--lh-400` | 24/28 – `--fs-500`, `--lh-500`  |
| 16/24 – `--fs-300`, `--lh-300` | 20/24 – `--fs-400`, `--lh-400`  |
| 14/20 – `--fs-200`, `--lh-200` | 16/24 – `--fs-300`, `--lh-300`  |

## Paragraph

There are three text sizes commonly used in our products:

### 16px text

![Paragraph with 16px text has 16px margin-bottom.](static/p-16.png)

### 14px text

![Paragraph with 14px text has 12px margin-bottom.](static/p-14.png)

### 12px text

![Paragraph with 12px text has 8px margin-bottom.](static/p-12.png)

::: sandbox

<script lang="tsx">
  export Demo from './examples/12px-text.tsx';
</script>

:::

## Paragraph margins

Paragraphs have a `margin-bottom`, and each paragraph size has its own specific `margin`. For instance, a paragraph with a 16px font size has a `margin-bottom: 14px`, a paragraph with a 14px font size has a `margin-bottom: 12px`, and a paragraph with a 12px font size has a `margin-bottom: 8px`.

These margins can also be applied when a paragraph is followed by a paragraph with a smaller font size.

![](static/paragraph_margins.png)

## Metric

For highlighting metrics in your interface, use the following styles:

Table: Font styles for metrics

| px   | Tokens                | Appearance                  |
| ---- | --------------------- | --------------------------- |
| 32px | `--fs-600`, `--lh-600` | ![](static/metric-600.png) |
| 24px | `--fs-500`, `--lh-500` | ![](static/metric-500.png) |
| 20px | `--fs-400`, `--lh-400` | ![](static/metric-400.png) |
| 16px | `--fs-300`, `--lh-300` | ![](static/metric-300.png) |
| 14px | `--fs-200`, `--lh-200` | ![](static/metric-200.png) |

::: sandbox

<script lang="tsx">
  export Demo from './examples/metric.tsx';
</script>

:::

## Text styles

You have the flexibility to change the style of text by making it `bold`, `italic`, adding a [link component](/components/link/link), a [hint component](/style/typography/typography#hints_hint_links), or applying `strikethrough`.

::: sandbox

<script lang="tsx">
  export Demo from './examples/text-styles.tsx';
</script>

:::

## List

Table: Font styles for lists

| px  | Tokens | Styles | Numbered list | Unordered list | Check list |
| --- | ------ | ------ | ------------- | -------------- | ---------- |
| 16px | `--fs-300`, `--lh-300` | `margin-bottom: 8px`, `padding-right: 8px` | ![](static/ol-16.png) | ![](static/ul-16.png) | ![](static/checklist-16.png) |
| 14px | `--fs-200`, `--lh-200` | `margin-bottom: 8px`, `padding-right: 8px` | ![](static/ol-14.png) | ![](static/ul-14.png) | ![](static/checklist-14.png) |
| 12px | `--fs-100`, `--lh-100` | `margin-bottom: 8px`, `padding-right: 8px` | ![](static/ol-12.png) | ![](static/ul-12.png) | ![](static/checklist-12.png) |

## Nested list

Each subsequent level of the nested list is indented to the left. The `margin` between list levels for all font sizes are 8px.

Table: Font styles for nested lists

| px   | Tokens                | Margins                                          |
| ---- | --------------------- | ------------------------------------------------ |
| 16px | `--fs-300`, `--lh-300` | ![](static/second-level-16.png) |
| 14px | `--fs-200`, `--lh-200` | ![](static/second-level-14.png) |
| 12px | `--fs-100`, `--lh-100` | ![](static/second-level-12.png) |

## Quote

We have specific styles for highlighting quotes in paragraphs.

![](static/blockquote-paddings.png)

## Hints (hint links)

Text can be wrapped in a hint link (pseudo-link) component, creating a control that triggers events on the page without reloading it. This pseudo-link is usually used to show and hide [tooltips](../../components/tooltip/tooltip) or parts of the UI.

![](static/hint-link.png)

### Hint link states

Table: Hint link states

| State        | Appearance example  | Styles and tokens      | Cursor          |
| ------------ | ------------------- | ---------------------- | --------------- |
| Normal       | ![](static/hint-default.png)    | `--text-hint` and underlined with dashed border-bottom.     | `help` or `pointer`, if clickable   |
| Active/hover | ![](static/hint-hover.png)       | `--text-hint-hover-active` and underlined with dashed border-bottom. If used with an icon, the icon changes color along with the text. | `help`, `default` or `pointer` (depending on the usage context) |
| Disabled     | ![](static/hint-disabled.png) | `--disabled-opacity`. Use this state as a last resort and be sure to label the disabled link with an explanatory tooltip.     | `default`       |
| visited      |             | This link does not have `visited` state.  |                   |

## Which heading with which paragraph size shall be used

**Use a 16px paragraph with the following headings:**

![](static/h1-p.png)

![](static/h2-p.png)

![](static/h3-p.png)

**Use a 14px paragraph with the following headings:**

![](static/h4-p.png)

![](static/h5-p.png)

![](static/h6-p.png)

