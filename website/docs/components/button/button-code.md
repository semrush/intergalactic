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

## Button with Icon

To use a button with a single icon, you need to wrap it in the `<Button.Addon/>`.

::: sandbox

<script lang="tsx">
  export Demo from './examples/button_with_icon.tsx';
</script>

:::

## Button with no visible text

If there is no visible text in the button, it is necessary to add an `aria-label` with a short description of an action this button performs.

::: sandbox

<script lang="tsx">
  export Demo from './examples/button_accessibility.tsx';
</script>

:::
