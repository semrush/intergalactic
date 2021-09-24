---
title: Example
---

@## Basic use

Try to reduce the page and see how tabs are compressed. You can also wrap the `<TabPanel.Item />` in other components.

> 💡 Be sure to put the full text tooltip on the tabs with the text shortened into the `ellipsis`.

@example base

@## TabPanel occupying the entire space of a block with indents

As you may notice, the TabPanel does not have indents at the edges. To make the TabPanel occupy the entire width of the parent block (which has indents), you need to set the desired `padding` and `margin` for it.

```typescript
<Box p={5}>
  <TabPanel px={5} mx="-20px" />
</Box>
```

@## Example accessibility

@example a11y
