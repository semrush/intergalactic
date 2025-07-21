---
title: Feature highlight
tabs: Design('feature-highlight'), Changelog('feature-highlight-changelog')
---

## Description

You can promote certain features in your UI by using special styles from the `FeatureHighlight` package.

All components from the `FeatureHighlight` package are wrappers over our standard components, such as [Button](../../components/button/button) or [Notice](../../components/notice/notice), and you can use all their standard properties.

## General principles

* Make sure there's no more than 1–2 highlighted features on the page at the same time.
* Replace the highlighted control with its standard version after approximately a month of promotion.
* For controls with animation on click, consider turning off the animation after several clicks if the control is likely to be clicked multiple times.
* If the control's text doesn't mention the promotion, add an accessible description. Refer to the examples in the following sections.

## Badge

To add more accent to [Input](#input), [TabLine](#tabline), or other components, use the `BadgeFH` component.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/patterns/ux-patterns/feature-highlight/docs/examples/badge.tsx';
</script>

:::

## Button

To highlight a [Button](../../components/button/button), use the `ButtonFH` component.

For the primary button, use the standard addon.

For the secondary button, use the special icon addon (`ButtonFH.Addon` component), which has a built-in click animation.

You can change the number of animated sparkles (`animatedSparkleCount` prop) or disable the animation (set `animatedSparkleCount` to `0` or `undefined`).

If the control's text doesn't mention the promotion, add an accessible description with `aria-describedby` and `ScreenReaderOnly`.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/patterns/ux-patterns/feature-highlight/docs/examples/button.tsx';
</script>

:::

## Checkbox

To highlight a [Checkbox](../../components/checkbox/checkbox), use the `CheckboxFH` component.

You can enable animation on click (`AnimatedSparkles` component). It's possible to change the number of animated sparkles (`count` prop).

You can add more accent by displaying the `SummaryAI` icon with the `--intergalactic-icon-primary-feature-highlight` color after the text label.

If the control's label doesn't mention the promotion, add an accessible description with `aria-describedby` and `ScreenReaderOnly`.

::: tip
When using the `feature-highlight` tokens in the `color` property of icons and other components, the `--intergalactic` prefix is required.
:::

::: sandbox

<script lang="tsx">
  export Demo from 'stories/patterns/ux-patterns/feature-highlight/docs/examples/checkbox.tsx';
</script>

:::

## DataTable

To highlight a [table column](../../table-group/data-table/data-table), display the `SummaryAI` icon with the `--intergalactic-icon-primary-feature-highlight` color in the column header.

If the column title doesn't mention the promotion, add a `ScreenReaderOnly` text to the column header.

::: tip
When using the `feature-highlight` tokens in the `color` property of icons and other components, the `--intergalactic` prefix is required.
:::

::: sandbox

<script lang="tsx">
  export Demo from 'stories/patterns/ux-patterns/feature-highlight/docs/examples/data-table.tsx';
</script>

:::

## Input

To highlight an [Input](../../components/input/input), use the `InputFH` component.

You can add more accent by using the special icon addon (`InputFH.Addon` component) and/or the special badge (`BadgeFH` component).

If the control's label doesn't mention the promotion, add an accessible description by connecting the control with the badge or the `ScreenReaderOnly` text via `aria-describedby`.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/patterns/ux-patterns/feature-highlight/docs/examples/input.tsx';
</script>

:::

## Notice

To highlight a [Notice](../../components/notice/notice), use the `NoticeFH` component.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/patterns/ux-patterns/feature-highlight/docs/examples/notice.tsx';
</script>

:::

## Pills

To highlight a [Pills.Item](../../components/pills/pills), use the `PillsFH` component for the entire pill group, and the `HighlightedItem` component for the highlighted item.

You can add more accent by using the special icon addon (`HighlightedItem.Addon` component), which has a built-in click animation.

It's possible to change the number of animated sparkles (`animatedSparkleCount` prop) or disable the animation (set `animatedSparkleCount` to `0` or `undefined`).

If the control's text or badge doesn't mention the promotion, add an accessible description with `aria-describedby` and `ScreenReaderOnly`.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/patterns/ux-patterns/feature-highlight/docs/examples/pills.tsx';
</script>

:::

## Radio

To highlight a [Radio button](../../components/radio/radio), use the `RadioFH` component.

You can enable animation on click (`AnimatedSparkles` component). It's possible to change the number of animated sparkles (`count` prop).

You can add more accent by displaying the `SummaryAI` icon with the `--intergalactic-icon-primary-feature-highlight` color after the text label.

If the control's label doesn't mention the promotion, add an accessible description with `aria-describedby` and `ScreenReaderOnly`.

::: tip
When using the `feature-highlight` tokens in the `color` property of icons and other components, the `--intergalactic` prefix is required.
:::

::: sandbox

<script lang="tsx">
  export Demo from 'stories/patterns/ux-patterns/feature-highlight/docs/examples/radio.tsx';
</script>

:::

## Select

To highlight a [Select](../../components/select/select), use the `SelectFH` component.

You can add more accent by using the special icon addon (`SelectFH.Trigger.Addon` component).

If the control's text or badge doesn't mention the promotion, add an accessible description with `aria-describedby` and `ScreenReaderOnly`.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/patterns/ux-patterns/feature-highlight/docs/examples/select.tsx';
</script>

:::

## Switch

To highlight a [Switch](../../components/switch/switch), use the `SwitchFH` component.

You can enable animation on click (`AnimatedSparkles` component). It's possible to change the number of animated sparkles (`count` prop).

You can add more accent by displaying the `SummaryAI` icon with the `--intergalactic-icon-primary-feature-highlight` color after the text label.

If the control's label doesn't mention the promotion, add an accessible description with `aria-describedby` and `ScreenReaderOnly`.

::: tip
When using the `feature-highlight` tokens in the `color` property of icons and other components, the `--intergalactic` prefix is required.
:::

::: sandbox

<script lang="tsx">
  export Demo from 'stories/patterns/ux-patterns/feature-highlight/docs/examples/switch.tsx';
</script>

:::

## TabLine

To highlight a [TabLine.Item](../../components/tab-line/tab-line), use the `TabLineFH` component for the entire tab group, and the `HighlightedItem` component for the highlighted item.

You can add more accent by using the special icon addon (`HighlightedItem.Addon` component) before the text, and/or the special badge (`BadgeFH` component) after the text.

The icon addon has a built-in animation. You can change the number of animated sparkles (`animatedSparkleCount` prop) or disable the animation (set `animatedSparkleCount` to `0` or `undefined`).

If the control's text or badge doesn't mention the promotion, add an accessible description with `aria-describedby` and `ScreenReaderOnly`.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/patterns/ux-patterns/feature-highlight/docs/examples/tabline.tsx';
</script>

:::
