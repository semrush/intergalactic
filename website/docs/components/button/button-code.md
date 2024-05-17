---
title: Button
tabs: Design('button'), A11y('button-a11y'), API('button-api'), Example('button-code'), Changelog('button-changelog')
---

## Addons

Addons can be installed either by passing the required `tag` to the `addonLeft`/`addonRight` property or by unrending `Button.Addon`/`Button.Text` into the component body. The examples below are the same.

::: sandbox

<script lang="tsx">
  export Demo from './examples/addons.tsx';
</script>

:::

## Button with icon

To use a button with a single icon, you need to wrap it in an `<Button.Addon/>`.

::: sandbox

<script lang="tsx">
  export Demo from './examples/button_with_icon.tsx';
</script>

:::

## Button as link

<!-- Guys, don't forgat to add example and short description for this case. -->

## Link as button

Refer to [Link as button example](/components/link/link-code#link-as-button).

## Button accessibility

If there is no visible text in the button, it is necessary to add an `aria-label` with a short description of an action this button performs.

::: sandbox

<script lang="tsx">
  export Demo from './examples/button_accessibility.tsx';
</script>

:::
