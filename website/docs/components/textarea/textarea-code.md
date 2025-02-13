---
title: Textarea
fileSource: textarea
tabs: Design('textarea'), A11y('textarea-a11y'), API('textarea-api'), Example('textarea-code'), Changelog('textarea-changelog')
---

## Auto height

The component can automatically adjust its height as the user types text.

To control the automatic stretching, you can set limits on the number of lines using `maxRows` and `minRows`. This way, the area will stretch until a scrollbar appears inside it.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/textarea/docs/examples/textarea_with_auto_height.tsx';
</script>

:::
