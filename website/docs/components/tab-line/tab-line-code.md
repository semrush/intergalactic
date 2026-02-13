---
title: TabLine
fileSource: tab-line
tabs: Design('tab-line'), A11y('tab-line-a11y'), API('tab-line-api'), Example('tab-line-code'), Changelog('tab-line-changelog')
---

Try resizing the page to see how the tabs adjust. If the text in a tab is too long, it will be truncated with an `ellipsis`. You can also place the `TabLine.Item` within other components.

::: info
Make sure to provide a tooltip with full text for tabs with text truncated with an `ellipsis`.
:::

## TabLine item with addons

You can add icons, badges, and counters as addons to the left or right of the text in the item.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/tab-line/docs/examples/tab_line_item_addons.tsx';
</script>

:::

## Disabled TabLine item

Use `disabled` property to make `<TabLine.Item />` disabled. Always add `Tooltip` to explain why this item is disabled.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/tab-line/docs/examples/disabled_tab_line_item.tsx';
</script>

:::

## Automatic tab activation

By default, tabs are switched automatically when selected.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/tab-line/docs/examples/automatic_tab_activation.tsx';
</script>

:::

## Manual tab activation

You can set `behavior='manual'` on TabLine to change the tab activation method to manual.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/tab-line/docs/examples/manual_tab_activation.tsx';
</script>

:::

## Custom indents

Since the TabLine component doesn't have default margins at the edges, to make it fill the entire width of its parent block (which may have its own margins), you can set the desired `padding` and `margin` for the TabLine component like this:

```typescript
<Box p={5}>
  <TabLine px={5} mx="-20px" />
</Box>
```
