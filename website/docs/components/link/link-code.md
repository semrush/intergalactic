---
title: Link
tabs: Design('link'), A11y('link-a11y'), API('link-api'), Example('link-code'), Changelog('link-changelog')
---

## Link in text

By default, links are displayed as `inline-block` and don’t wrap properly within the text. To achieve proper wrapping and underlining of links, set `noWrap=false` and `inline=true`.

::: sandbox

<script lang="tsx">
  export Demo from './examples/link_inside_the_content.tsx';
</script>

:::

## Link addon

You can add addons to link either by specifying the desired tag in the `addonLeft`/`addonRight` property or by rendering the `Link.Addon`/`Link.Text` in the component body. Both methods achieve the same result.

::: sandbox

<script lang="tsx">
  export Demo from './examples/link_addon.tsx';
</script>

:::

## Color links

Links can be colored for specific purposes. You can apply a specific color to links by passing the `color` property to them.

::: sandbox

<script lang="tsx">
  export Demo from './examples/color_links.tsx';
</script>

:::

## Button as link

Refer to [Button as link example](/components/button/button-code#button-as-link).

## Link as button

Links can be displayed as buttons.

::: tip
If you need to display disabled link as a `Button` you should remove `href` prop by yourself.
:::

::: sandbox

<script lang="tsx">
  export Demo from './examples/link_as_button.tsx';
</script>

:::

## Link with ellipsis

There are two moments you need to consider when using link with addons and ellipsis:

- To properly display a link with ellipsis inside a flex block, you need to use a hack with `min-width: 0px`.
- When the text has an `overflow:hidden` property, it may overlap with a vertical addon. To avoid this, wrap the content in a flex container with vertical alignment.

::: sandbox

<script lang="tsx">
  export Demo from './examples/links_with_ellipsis.tsx';
</script>

:::

## Link without visible text

If a link has no visible text, it is important to add [Tooltip](/components/tooltip/tooltip-code) and an `aria-label` attribute with a description of the link for accessibility purposes.

::: sandbox

<script lang="tsx">
  export Demo from './examples/link_without_text.tsx';
</script>

:::

## Disabled link

<!-- Guys, don't forgat to update the example and add short description for this case. -->

::: sandbox

<script lang="tsx">
  export Demo from './examples/link_disabled.tsx';
</script>

:::
