---
title: Counter
tabs: Design('counter'), A11y('counter-a11y'), API('counter-api'), Example('counter-code'), Changelog('counter-changelog')
---

## Counter in filters
[FilterTrigger](/components/filter-trigger/filter-trigger) is normally used together with [Select](/components/select/select) or [Dropdown](/components/dropdown/dropdown). Go to [the guide](/components/filter-trigger/filter-trigger) for more information.

::: sandbox

<script lang="tsx" src="examples/counter_in_filters.tsx"></script>

:::

## Counter in Button

::: tip
Don't forget to place counters inside the `Addon` to create correct margins.
:::

::: sandbox

<script lang="tsx" src="examples/counter_in_button.tsx"></script>

:::

## Counter in forms

::: tip
As design guide recommends, the counter changes color to orange and then red when the limit is reached and exceeded, respectively. This rule isn’t implemented in the example.
:::

::: sandbox

<script lang="tsx" src="examples/counter_in_forms.tsx"></script>

:::

## Counter and typography

The text counters shall be implemented using [Typography](/style/typography/typography) without using the `Counter` component.

::: sandbox

<script lang="tsx" src="examples/counter_and_typography.tsx"></script>

:::

## Counter in Pills

As you can see, there are text counters inside [Pills](/components/pills/pills). Implement them via [Typography](/style/typography/typography), as well, without using the `Counter` component.

::: sandbox

<script lang="tsx" src="examples/counter_in_pills.tsx"></script>

:::

## Counter in limits

Implement the text counters in limits using [Typography](/style/typography/typography) without using the `Counter` component.

::: sandbox

<script lang="tsx" src="examples/counter_in_limits.tsx"></script>

:::

## Counter in Dot

The `Dot` component can also contain a text counter. For more information, see the [Dot](/components/dot/dot).

::: sandbox

<script lang="tsx" src="examples/counter_in_dot.tsx"></script>

:::
