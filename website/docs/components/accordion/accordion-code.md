---
title: Accordion
tabs: Design('accordion'), A11y('accordion-a11y'), API('accordion-api'), Example('accordion-code'), Changelog('accordion-changelog')
---

::: tip
Don't specify `padding` and `margin` for `Accordion.Item.Collapse`, this will break the animation.
:::

## Basic usage

By default, the accordion has the `secondary` theme (`use` property).

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

## Heading tag

By default, `Accordion.Item.Toggle` is set to an `h3` heading level, but you can change it if needed.

::: sandbox

<script lang="tsx">
  export Demo from './examples/heading_tag.tsx';
</script>

:::

## Primary theme

Pass `use='primary'` to enable the primary theme for the accordion.

::: sandbox

<script lang="tsx">
  export Demo from './examples/non_compact.tsx';
</script>

:::

## Custom styles for selected toggle

You can customize accordion styles if needed.

For example, to find out whether an element is selected and to highlight it, pass the function into the body of the element.

::: sandbox

<script lang="tsx">
  export Demo from './examples/custom_styles.tsx';
</script>

:::

## SEO friendly accordion

By default, collapsed sections aren't rendered in the DOM. If you need to render all sections, pass `preserveNode` to the `Accordion.Item.Collapse` component.

::: sandbox

<script lang="tsx">
  export Demo from './examples/seo.tsx';
</script>

:::
