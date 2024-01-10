---
title: TabLine
fileSource: tab-line
tabs: Design('tab-line'), A11y('tab-line-a11y'), API('tab-line-api'), Example('tab-line-code'), Changelog('tab-line-changelog')
---

## Automatic tab activation

Try changing the page size to observe how the tabs are compressed. If the text inside a tab is too long, it will be truncated with an `ellipsis`. You can also place the `<TabLine.Item />` within other components.

::: sandbox

<script lang="tsx">
  export Demo from './examples/automatic_tab_activation.tsx';
</script>

:::

## Manual tab activation

::: sandbox

<script lang="tsx">
  export Demo from './examples/manual_tab_activation.tsx';
</script>

:::


## Custom indents and occupying the entire space

As you might have noticed, the TabLine component doesn't have default margins at the edges. To make the TabLine span the entire width of its parent block (which might have its own margins), you can set the desired `padding` and `margin` for the TabLine component.

```typescript
<Box p={5}>
  <TabLine px={5} mx="-20px" />
</Box>
```

