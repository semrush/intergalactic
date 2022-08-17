---
title: Example
fileSource: tab-line
---

@## Basic example

Try to reduce the page and see how tabs are compressed. If the text inside a tab is very long, it will be added to `ellipsis`. You can also wrap the `<TabLine.Item />` in other components.

@example base

@## Custom indents and occupying the entire space

As you may notice, the **TabLine** does not have indents at the edges. To make the **TabLine** occupy the entire width of the parent block (which has indents), you need to set the desired `padding` and `margin` for it.

```typescript
<Box p={5}>
  <TabLine px={5} mx="-20px" />
</Box>
```

@## Example of accessible TabLine

@example a11y
