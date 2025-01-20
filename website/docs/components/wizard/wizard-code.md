---
title: Wizard
tabs: Design('wizard'), A11y('wizard-a11y'), API('wizard-api'), Example('wizard-code'), Changelog('wizard-changelog')
---

The Wizard component inherits from the [Modal](/components/modal/modal-api) component, so you can use all of its properties.

## Basic usage

::: sandbox

<script lang="tsx">
  export Demo from './examples/basic_example.tsx';
</script>

:::

## Custom step

As the Wizard is typically a complex component, you have the flexibility to use your own components for the steps or pass a function inside to have more control.

::: sandbox

<script lang="tsx">
  export Demo from './examples/custom_step.tsx';
</script>

:::

## Custom stepper

The stepper can also be customized.

::: sandbox

<script lang="tsx">
  export Demo from './examples/custom_stepper.tsx';
</script>

:::
