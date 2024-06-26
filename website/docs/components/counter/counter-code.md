---
title: Counter
tabs: Design('counter'), A11y('counter-a11y'), API('counter-api'), Example('counter-code'), Changelog('counter-changelog')
---

## Counter in filters
[FilterTrigger](/components/filter-trigger/filter-trigger) is normally used together with [Select](/components/select/select) or [Dropdown](/components/dropdown/dropdown). Go to [the guide](/components/filter-trigger/filter-trigger) for more information.

::: sandbox

<script lang="tsx">
  export Demo from './examples/counter_in_filters.tsx';
</script>

:::

## Counter in Button

::: tip
Don't forget to place counters inside the `Addon` to create correct margins.
:::

::: sandbox

<script lang="tsx">
  export Demo from './examples/counter_in_button.tsx';
</script>

:::

## Counter in forms

As the [design guide recommends](./counter#usage-in-ux-ui), the counter changes color to orange shortly before the limit is reached, and then to red when the limit is exceeded.

::: sandbox

<script lang="tsx">
  export Demo from './examples/counter_in_forms.tsx';
</script>

:::

## Counter and typography

Plain text counters should be implemented using [Typography](/style/typography/typography), without the `Counter` component.

::: sandbox

<script lang="tsx">
  export Demo from './examples/counter_and_typography.tsx';
</script>

:::

## Counter in Pills

Counters inside [Pills](/components/pills/pills) are implemented using [Typography](/style/typography/typography), without the `Counter` component.

::: sandbox

<script lang="tsx">
  export Demo from './examples/counter_in_pills.tsx';
</script>

:::

## Counter in limits

Displaying limits is done using [Typography](/style/typography/typography), without the `Counter` component.

::: sandbox

<script lang="tsx">
  export Demo from './examples/counter_in_limits.tsx';
</script>

:::

## Counter in Dot

The `Dot` component also contains a text counter. For more information, refer to [Dot](/components/dot/dot).

::: sandbox

<script lang="tsx">
  export Demo from './examples/counter_in_dot.tsx';
</script>

:::

## Animated number

The `AnimatedNumber` component allows showing numeric value changes with animation.

::: sandbox

<script lang="tsx">
  export Demo from './examples/animated_number.tsx';
</script>

:::
