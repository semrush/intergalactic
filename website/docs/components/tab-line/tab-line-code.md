---
title: Example
fileSource: tab-line
---

@## Basic example

Try changing the page size to observe how the tabs are compressed. If the text inside a tab is too long, it will be truncated with an `ellipsis`. You can also place the `<TabLine.Item />` within other components.

@example base

@## Custom indents and occupying the entire space

As you might have noticed, the TabLine component does not have default margins at the edges. To make the TabLine span the entire width of its parent block (which might have its own margins), you can set the desired `padding` and `margin` for the TabLine component.

```typescript
<Box p={5}>
  <TabLine px={5} mx="-20px" />
</Box>
```

@## Example of accessible TabLine

@example a11y
