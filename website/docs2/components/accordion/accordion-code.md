---
title: Accordion
tabs: Design('accordion'), A11y('accordion-a11y'), API('accordion-api'), Example('accordion-code'), Changelog('accordion-changelog')
---

## Basic usage

::: tip
Don't specify `padding` and `margin` for `Accordion.Item.Collapse`, this will break the animation.
:::

::: sandbox

<script lang="tsx" src="examples/basic_usage.tsx"></script>

:::

## Custom trigger

You can add your own styles to the trigger or change its `tag`.

::: sandbox

<script lang="tsx" src="examples/custom_trigger.tsx"></script>

:::

## Selected element styles

To find out whether an element is selected or not, pass the function into the body of the element.

::: sandbox

<script lang="tsx" src="examples/selected_element_styles.tsx"></script>

:::

## One section opening

`value` can take both values: single and array of values. By changing it, you change the behavior of the component.

::: sandbox

<script lang="tsx" src="examples/one_section_opening.tsx"></script>

:::
