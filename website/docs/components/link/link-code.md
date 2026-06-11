---
title: Link
tabs: Design('link'), A11y('link-a11y'), API('link-api'), Examples('link-code'), Changelog('link-changelog')
---

## Link in text

By default, links are displayed as `inline` element and don’t need some extra settings.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/link/docs/examples/link_in_content.tsx';
</script>

:::

## Link addon

You can add addons to link either by specifying the desired tag in the `addonLeft`/`addonRight` property or by rendering the `Link.Addon`/`Link.Text` in the component body. Both methods achieve the same result.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/link/docs/examples/link_addon.tsx';
</script>

:::

## Color links

Links can be colored for specific purposes. You can apply a specific color to links by passing the `color` property to them.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/link/docs/examples/color_links.tsx';
</script>

:::

## Link as button

In case you need to render a Link that looks like a Button, use the [Button component](/components/button/button-code) with `tag={'a'}`.

::: tip
If you need to display disabled link as a `Button` you should remove `href` prop by yourself.
:::

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/link/docs/examples/link_as_button.tsx';
</script>

:::

## Link with ellipsis

Link can be cropped with ellipsis by setting the width and using the `ellipsis` property in `Link.Text`. Hint with the full text will appear automatically on hover on the link, including addons. Learn more about ellipsis in [Utils/Ellipsis](../../utils/ellipsis/ellipsis-code).

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/link/docs/examples/links_with_ellipsis.tsx';
</script>

:::

## Link without visible text

If a link has no visible text, it's important to add a [hint](../../utils/hint/hint-code) explaining where the link leads to. This can be done using either `title` or `aria-label`. Both will enable a visible hint on hover and an `aria-label` for assistive technology.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/link/docs/examples/link_without_text.tsx';
</script>

:::

## Disabled link

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/link/docs/examples/link_disabled.tsx';
</script>

:::
