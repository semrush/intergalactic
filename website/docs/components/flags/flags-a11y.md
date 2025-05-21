---
title: Flags
a11y: AA
tabs: Design('flags'), A11y('flags-a11y'), API('flags-api'), Changelog('flags-changelog')
---

## Considerations for developers

The `Flags` component doesn't have an `aria-label` by default to avoid double reading when it's accompanied by the country name.

If you use `Flags` without the full country name, you should set the following attributes to the component:

- `aria-label` with the full country name,
- `role="img"`.

If you use `Flags` with the short country code, do the same, and also hide the country code with `aria-hidden`.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/flags/docs/examples/aria-label.tsx';
</script>

:::

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/a11y).
