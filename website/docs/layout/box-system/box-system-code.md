---
title: Flex-box
fileSource: flex-box
tabs: Spacing system('box-system-spacing'), API('box-system-api'), Example('box-system-code'), Changelog('box-system-changelog')
---

**Flex-box** is a component for managing arrangement and alignment of other components and elements in the interface.

## Box

**Box** is a component for changing sizes of the elements or components and arranging indents between the them. By using it, you can set paddings and margins.

Example below shows how to implement equal margins between form components.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/flex-box/docs/examples/box.tsx';
</script>

:::

Example below shows how a component creates indents using dynamically generated classes. Thus, you can get this class generated into the component by passing it to `tag`.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/flex-box/docs/examples/box.tsx';
</script>

:::

## Flex

**Flex** is a component for aligning the components. It is a wrapper over CSS-flex.

Example below shows how Flex component takes all properties of a Box component.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/flex-box/docs/examples/flex.tsx';
</script>

:::
