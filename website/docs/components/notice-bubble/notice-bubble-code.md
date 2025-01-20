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
  export Demo from 'stories/components/notice-bubble/docs/examples/basic_notice.tsx';
</script>

:::

## NoticeBubble not in portal

If NoticeBubbleContainer has `disablePortal` it will add `position: sticky` to `Bubbles`.

Parent should have `position: relative` and `overflow` with scroll.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/notice-bubble/docs/examples/noticebubble_not_in_portal.tsx';
</script>

:::

## Undo action

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/notice-bubble/docs/examples/undo_action.tsx';
</script>

:::

## Reload action

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/notice-bubble/docs/examples/reload_action.tsx';
</script>

:::

## Completion state

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/notice-bubble/docs/examples/completion_state.tsx';
</script>

:::

## Success notice

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/notice-bubble/docs/examples/success_notice.tsx';
</script>

:::

## Failure notice

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/notice-bubble/docs/examples/failure_notice.tsx';
</script>

:::

## Loading state

Activate the **Try again** button in the notice to see the loading state.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/notice-bubble/docs/examples/dynamic_notice.tsx';
</script>

:::

## Special event notice

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/notice-bubble/docs/examples/special_events_notice.tsx';
</script>

:::

## No connection

Use `type="warning"` for this case.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/notice-bubble/docs/examples/no_connection_notice.tsx';
</script>

:::

## No connection with action

Use `type="warning"` for this case.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/notice-bubble/docs/examples/no_connection_notice_with_action.tsx';
</script>

:::

## Replace previous notice

::: warning
Use this API only if there's enough time between events, so that all notices have enough time to appear and be read by the user, or if missing some notices isn't critical.
:::

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/notice-bubble/docs/examples/replace_last_notice.tsx';
</script>

:::
