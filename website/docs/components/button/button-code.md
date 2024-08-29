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
  export Demo from './examples/addons.tsx';
</script>

:::

## Button with icon

To use a button with a single icon, you need to wrap it in the `<Button.Addon/>`.

::: sandbox

<script lang="tsx">
  export Demo from './examples/button_with_icon.tsx';
</script>

:::

## Link as button

To create a button that acts like a link, refer to the [Link as button example](/components/link/link-code#link-as-button).

## Button with no visible text

If there is no visible text in the button, it is necessary to add an `aria-label` with a short description of an action this button performs.

::: sandbox

<script lang="tsx">
  export Demo from './examples/button_accessibility.tsx';
</script>

:::

## Button with loading state

You could add a `loading` prop to the `Button` or manually add an `Addon` with `Spin` if you need the button text to remain visible.

::: sandbox

<script lang="tsx">
  export Demo from './examples/button_with_loading.tsx';
</script>

:::

## Button with link skin

If you need to render a Button which looks like a Link, you could use `ButtonLink`.

::: sandbox

<script lang="tsx">
  export Demo from './examples/button_link.tsx';
</script>

:::
