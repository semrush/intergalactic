---
title: InputMask
fileSource: input-mask
tabs: Design('input-mask'), A11y('input-mask-a11y'), API('input-mask-api'), Example('input-mask-code'), Changelog('input-mask-changelog')
---

## InputMask

This component is a wrapper that allows you to set the format for the input value.

## Mask

This is an example of a basic input with a `mask` feature. The mask is defined using the mask property, which specifies the input format and validates the entered value.

::: tip
Remember to set the placeholder for the input field to match the mask. Typically, the placeholder should be the same as the mask itself.
:::

::: sandbox

<script lang="tsx" src="examples/inputmask.tsx"></script>

:::

## Aliases

`aliases` is the object that defines how characters in the mask are validated. By default, they are configured as follows:

- `9` - numbers
- `a` - Latin and Cyrillic letters in any case
- `*` - numbers and Latin and Cyrillic letters in any case

::: sandbox

<script lang="tsx" src="examples/aliases.tsx"></script>

:::

## Pipe

`pipe` is a function that processes and changes the `InputMask` value after user input.

In the example below, it is used for formatting and validating the card's expire date input. The focus is switched to the next input by the `onSucces` event. It is called when the entered value fully matches the input mask.

::: sandbox

<script lang="tsx" src="examples/pipe.tsx"></script>

:::
