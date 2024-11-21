---
title: Error message
tabs: Design('global-errors'), A11y('global-errors-a11y'), API('global-errors-api'), Example('global-errors-code'), Changelog('global-errors-changelog')
---

## Example of using templates

Both graphics and texts are already included in ready-to-use templates. The locale can be either got inside the component, or wrapped in an application `I18nProvider` from the `@semcore/utils` package, as in the example below.

::: sandbox

<script lang="tsx">
  export Demo from './examples/example-of-using-templates.tsx';
</script>

:::

## Example of using a custom error

You can create any error page. In the `Error` package, you will find the `getIconPath` feature, which will allow you to get the latest versions of icons. The list of potential icons is described in the [API](/patterns/global-errors/global-errors-api).

::: sandbox

<script lang="tsx">
  export Demo from './examples/example-of-using-a-custom-error.tsx';
</script>

:::
