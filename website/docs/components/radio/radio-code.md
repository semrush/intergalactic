---
title: Radio
fileSource: radio
tabs: Design('radio'), A11y('radio-a11y'), API('radio-api'), Example('radio-code'), Changelog('radio-changelog')
---

## RadioGroup example

RadioGroup acts as a controlling component and doesn't have an actual HTML element beneath it.

::: sandbox

<script lang="tsx">
  export Demo from './examples/radiogroup_example.tsx';
</script>

:::

## Additional props for input

Radio.Value conceals a stylistic div and a real, hidden input. When you pass props to Radio.Value, it passes specific set of them to input props and all others goes to check-mark div.

If you need more control over input-tag, you can pass props to Radio.Value.Control.

::: warning
:rotating_light: `Radio.Value.RadioMark` should always be the next element after `Radio.Value.Control` in DOM.
:::

::: sandbox

<script lang="tsx">
  export Demo from './examples/additional_props_for_input.tsx';
</script>

:::
