---
title: Error message
tabs: Design('global-errors'), A11y('global-errors-a11y'), API('global-errors-api'), Example('global-errors-code'), Changelog('global-errors-changelog')
---

## Error templates

Both graphics and localized texts are already included in ready-to-use templates. Read more about localization in [i18n](../../utils/i18n/i18n.md).

::: sandbox

<script lang="tsx">
  export Demo from 'stories/patterns/ux-patterns/global-errors/examples/templates.tsx';
</script>

:::

## Custom error

You can create a custom error message. In the `Error` package, you will find the `getIconPath` feature, which will allow you to get the latest versions of illustrations. The full list of illustrations can be found in [Illustration](../../style/illustration/illustration.md).

::: sandbox

<script lang="tsx">
  export Demo from 'stories/patterns/ux-patterns/global-errors/examples/custom-error.tsx';
</script>

:::
