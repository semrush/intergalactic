---
title: FilterTrigger
fileSource: base-trigger
tabs: Design('filter-trigger'), A11y('filter-trigger-a11y'), API('filter-trigger-api'), Example('filter-trigger-code'), Changelog('filter-trigger-changelog')
---

The component is used as an active state of a trigger in filters.

## Usage with Select

Use `FilterTrigger` as a `tag` for `Select.Trigger`.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/filter-trigger/docs/examples/usage_with_select.tsx';
</script>

:::

## Accessible name

If your `FilterTrigger` doesn't have a `<label>` element, use `aria-labelledby` or `aria-label`.

If the filter name is included in the trigger alongside the value, hide it from the assistive technology to avoid redundant reading.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/filter-trigger/docs/examples/accessible_name.tsx';
</script>

:::

## Advanced filters with counter

For an example of using `FilterTrigger` with [Dropdown](/components/dropdown/dropdown) and graphic counter, refer to [Advanced filters](../../filter-group/advanced-filters/advanced-filters-code.md).

![](static/filter-active-counter-m.png)

## Programmatic focus

`FilterTrigger` contains two elements in the wrapper: the button that opens the dropdown (the inner trigger) and the **Clear** button. If you want to focus the inner trigger, use the `triggerRef` prop to access the inner trigger node.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/filter-trigger/docs/examples/programmatic_focus.tsx';
</script>

:::
