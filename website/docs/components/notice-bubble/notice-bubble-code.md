---
title: NoticeBubble
tabs: Design('notice-bubble'), A11y('notice-bubble-a11y'), API('notice-bubble-api'), Example('notice-bubble-code'), Changelog('notice-bubble-changelog')
---

::: tip
Each example uses its own instance of `NoticeBubbleManager`, which is why notices from different examples can overlay each other.
:::

## Basic notice

::: sandbox

<script lang="tsx">
  export Demo from './examples/basic_notice.tsx';
</script>

:::

## NoticeBubble not in portal

If NoticeBubbleContainer has `disablePortal` it will add `position: sticky` to `Bubbles`.

Parent should have `position: relative` and `overflow` with scroll.

::: sandbox

<script lang="tsx">
  export Demo from './examples/noticebubble_not_in_portal.tsx';
</script>

:::

## Undo action

::: sandbox

<script lang="tsx">
  export Demo from './examples/undo_action.tsx';
</script>

:::

## Reload action

::: sandbox

<script lang="tsx">
  export Demo from './examples/reload_action.tsx';
</script>

:::

## Completion state

::: sandbox

<script lang="tsx">
  export Demo from './examples/completion_state.tsx';
</script>

:::

## Success notice

::: sandbox

<script lang="tsx">
  export Demo from './examples/success_notice.tsx';
</script>

:::

## Failure notice

::: sandbox

<script lang="tsx">
  export Demo from './examples/failure_notice.tsx';
</script>

:::

## Notice with loading state

::: sandbox

<script lang="tsx">
  export Demo from './examples/dynamic_notice.tsx';
</script>

:::

## Special events notice

::: sandbox

<script lang="tsx">
  export Demo from './examples/special_events_notice.tsx';
</script>

:::

## No connection notice

Use `type="warning"` for this case.

::: sandbox

<script lang="tsx">
  export Demo from './examples/no_connection_notice.tsx';
</script>

:::

## No connection notice with action

Use `type="warning"` for this case.

::: sandbox

<script lang="tsx">
  export Demo from './examples/no_connection_notice_with_action.tsx';
</script>

:::
