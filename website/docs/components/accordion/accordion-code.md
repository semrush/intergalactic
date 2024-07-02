---
title: Accordion
tabs: Design('accordion'), A11y('accordion-a11y'), API('accordion-api'), Example('accordion-code'), Changelog('accordion-changelog')
---

## Basic usage

::: tip
Don't specify `padding` and `margin` for `Accordion.Item.Collapse`, this will break the animation.
:::

::: sandbox

<script lang="tsx">
  export Demo from './examples/basic_usage.tsx';
</script>

:::

## One section opening

`value` can take both values: single and array of values. By changing it, you change the behavior of the component.

::: sandbox

<script lang="tsx">
  export Demo from './examples/one_section_opening.tsx';
</script>

:::

## Primary

Pass `use='primary'` to enable the primary view.

::: sandbox

<script lang="tsx">
  export Demo from './examples/non_compact.tsx';
</script>

:::

## Selected element styles

To find out whether an element is selected or not, pass the function into the body of the element.

::: sandbox

<script lang="tsx">
  export Demo from './examples/selected_element_styles.tsx';
</script>

:::
