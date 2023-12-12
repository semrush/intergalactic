---
title: Button
tabs: Design('button'), A11y('button-a11y'), API('button-api'), Example('button-code'), Changelog('button-changelog')
---

## Addons

Addons can be installed either by passing the required `tag` to the `addonLeft`/`addonRight` property or by unrending `Button.Addon`/`Button.Text` into the component body. The examples below are the same.

::: sandbox

<script lang="tsx" src="examples/addons.tsx"></script>

:::

## Button with Icon

To use a button with a single icon, you need to wrap it in an `<Button.Addon/>`.

::: sandbox

<script lang="tsx" src="examples/button_with_icon.tsx"></script>

:::

## Button accessibility

If there is no text in the button, it is necessary to add aria-label with a button description.

::: sandbox

<script lang="tsx" src="examples/button_accessibility.tsx"></script>

:::
