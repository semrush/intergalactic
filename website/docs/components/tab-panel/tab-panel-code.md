---
title: TabPanel
fileSource: tab-panel
tabs: Design('tab-panel'), A11y('tab-panel-a11y'), API('tab-panel-api'), Examples('tab-panel-code'), Changelog('tab-panel-changelog')
---

## TabPanel item with addons

You can add icons, badges, and counters as addons to the left or right of the text in the item.

<!-- vale DevDocs.Inclusive = NO -->
Try resizing the page to see how the tabs adjust. If the text in a tab is too long, it will be truncated with [ellipsis](../../utils/ellipsis/ellipsis) and a [hint](../../utils/hint/hint) will be shown on hover and focus.
<!-- vale DevDocs.Inclusive = YES -->

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/tab-panel/docs/examples/tab_panel_item_addons.tsx';
</script>

:::

## Disabled TabPanel item

Use `disabled` property to make `<TabPanel.Item />` disabled. Always add `Tooltip` to explain why this item is disabled.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/tab-panel/docs/examples/disabled_tab_panel_item.tsx';
</script>

:::

## Automatic tab activation

By default, when using keyboard interaction, user has to confirm tab selection by pressing `Enter` or `Space`.

You can set `behavior='auto'` to change this behavior, so that tabs are activated immediately when selected.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/tab-panel/docs/examples/automatic_tab_activation.tsx';
</script>

:::

## Custom indents

Since the TabPanel component doesn't have default margins at the edges, to make it fill the entire width of its parent block (which may have its own margins), you can set the desired `padding` and `margin` for the TabPanel component like this:

```typescript
<Box p={5}>
  <TabPanel px={5} mx="-20px" />
</Box>
```
