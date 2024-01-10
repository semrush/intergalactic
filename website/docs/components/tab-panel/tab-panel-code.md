---
title: TabPanel
fileSource: tab-panel
tabs: Design('tab-panel'), A11y('tab-panel-a11y'), API('tab-panel-api'), Example('tab-panel-code'), Changelog('tab-panel-changelog')
---

## Manual tab activation

Try changing the page size to observe how the tabs are compressed. Additionally, you have the flexibility to wrap the `<TabPanel.Item />` in other components.

::: tip
Make sure to provide a tooltip with full text for tabs with text truncated with an `ellipsis`.
:::

::: sandbox

<script lang="tsx">
  export Demo from './examples/manual_tab_activation.tsx';
</script>

:::

## Automatic tab activation

::: sandbox

<script lang="tsx">
  export Demo from './examples/automatic_tab_activation.tsx';
</script>

:::

## Custom indents and occupying the entire space

As you may have noticed, the TabPanel doesn't have default margins at the edges. To make the TabPanel span the entire width of its parent block (which may have its own margins), you need to set the desired `padding` and `margin` for it.

```typescript
<Box p={5}>
  <TabPanel px={5} mx="-20px" />
</Box>
```

