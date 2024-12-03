---
title: InputNumber & InputRange
fileSource: input-number
tabs: Design('input-number'), A11y('input-number-a11y'), API('input-number-api'), Example('input-number-code'), Changelog('input-number-changelog')
---

## Range of values

Use [InputNumber](/components/input-number/input-number) and [NeighborLocation](/utils/neighbor-location/neighbor-location) components. In this case, InputNumber is always used as a controlled component.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/input-number/docs/examples/range_of_values.tsx';
</script>

:::

## Appearance customization

You have the ability to customize the component's appearance. To ensure the step calculation is accurate, utilize the internal API's native input.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/input-number/docs/examples/appearance_customization.tsx';
</script>

:::
