---
title: Radio
fileSource: radio
tabs: Design('radio'), A11y('radio-a11y'), API('radio-api'), Example('radio-code'), Changelog('radio-changelog')
---

## RadioGroup

`RadioGroup` works as a controlling component and doesn't have an actual HTML element beneath it.

::: sandbox

<script lang="tsx">
  export Demo from './examples/radiogroup_example.tsx';
</script>

:::

## Additional input props

`Radio.Value` contains a styled div and a hidden input. When you pass props to `Radio.Value`, a specific set of them is passed to the input props, while all others go to the `Radio.Value.RadioMark` div.

For more control over the input, you can pass props to `Radio.Value.Control`.

::: warning
:rotating_light: `Radio.Value.RadioMark` should always be the next element after `Radio.Value.Control` in DOM.
:::

::: sandbox

<script lang="tsx">
  export Demo from './examples/additional_props_for_input.tsx';
</script>

:::
