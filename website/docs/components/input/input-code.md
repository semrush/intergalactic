---
title: Input
fileSource: input
tabs: Design('input'), A11y('input-a11y'), API('input-api'), Example('input-code'), Changelog('input-changelog')
---

## Password input

Button with the `ShowYes` button enables the password display. `ShowNo` hides the password and shows bullets, respectively.

::: sandbox

<script lang="tsx">
  export Demo from './examples/password_input.tsx';
</script>

:::

## Loading state

If the input is in a loading state while searching, sending, or entering data dynamically, add our [Spin](/components/spin/spin) to the right addon. 

<!-- During this time, the input may also be `disabled`. -->

::: sandbox

<script lang="tsx">
  export Demo from './examples/loading_state_in_the_input.tsx';
</script>

:::

## Input with clearing ability

The input field may have a clickable `Close` icon inside it to clear the entered value. This icon is only visible when there is some typed text or values in the input field, regardless of its status.

::: sandbox

<script lang="tsx">
  export Demo from './examples/input_with_the_clearing_ability.tsx';
</script>

:::

## Input with submit button inside

You can place submit button inside the input as the right addon. It is only visible when the input has `focused` state.

::: sandbox

<script lang="tsx">
  export Demo from './examples/input_with_a_submit_icon.tsx';
</script>

:::

## Input with text addon

You can add text to the input as an addon that the user cannot modify. This can be useful when you need a fixed placeholder text in the input.

::: sandbox

<script lang="tsx">
  export Demo from './examples/input_with_a_text_addon.tsx';
</script>

:::

## Input with multiple addons

When stacking two addons, the indents of the adjacent addons should be divided in half. This ensures that there is enough space around them for normal interaction.

::: sandbox

<script lang="tsx">
  export Demo from './examples/input_with_multiple_addons.tsx';
</script>

:::

## Input with other component inside

You can also place a [Badge](/components/badge/badge) or a [Tag](/components/tag/tag) inside the input.

::: sandbox

<script lang="tsx">
  export Demo from './examples/input_with_other_component_inside.tsx';
</script>

:::
