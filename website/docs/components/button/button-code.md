---
title: Button
tabs: Design('button'), A11y('button-a11y'), API('button-api'), Example('button-code'), Changelog('button-changelog')
---

## Addons

Addons can be added:

- By passing the required `tag` to the `addonLeft`/`addonRight` property.
- By nesting `Button.Addon`/`Button.Text` into the component body.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/button/__stories__/docs-examples/addons.tsx';
</script>

:::

## Icon-only button

To use a button with a single icon, you need to wrap it in the `<Button.Addon/>`.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/button/__stories__/docs-examples/button_with_icon.tsx';
</script>

:::

## Button looking like Link

In case you need to render a Button that looks like a Link, use the `ButtonLink` component.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/button/__stories__/docs-examples/button_link.tsx';
</script>

:::

## Link looking like Button

To create a button that acts like a link, refer to the [Link as button example](/components/link/link-code#link-as-button).

## Button with no visible text

If there is no visible text in the button, it is necessary to add an `aria-label` with a short description of an action this button performs.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/button/__stories__/docs-examples/button_accessibility.tsx';
</script>

:::

## Button with loading state

You could add a `loading` prop to the `Button` or manually add an `Addon` with `Spin` if you need the button text to remain visible.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/button/__stories__/docs-examples/button_with_loading.tsx';
</script>

:::
