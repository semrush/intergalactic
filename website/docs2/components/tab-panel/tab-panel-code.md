---
title: Example
fileSource: tab-panel
---

## Basic usage

Try changing the page size to observe how the tabs are compressed. Additionally, you have the flexibility to wrap the `<TabPanel.Item />` in other components.

> Make sure to provide a tooltip with full text for tabs with text truncated with an `ellipsis`.

@example base

## Custom indents and occupying the entire space

As you may have noticed, the TabPanel doesn't have default margins at the edges. To make the TabPanel span the entire width of its parent block (which may have its own margins), you need to set the desired `padding` and `margin` for it.

```typescript
<Box p={5}>
  <TabPanel px={5} mx="-20px" />
</Box>
```

## Example of accessible TabPanel

@example a11y
