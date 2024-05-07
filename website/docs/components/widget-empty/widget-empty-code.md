---
title: Widget empty state
fileSource: widget-empty
tabs: Design('widget-empty'), A11y('widget-empty-a11y'), API('widget-empty-api'), Example('widget-empty-code'), Changelog('widget-empty-changelog')
---

## NoData example

The template already includes a `title` and default `description`, you only need to specify the [illustration](/style/illustration/illustration) `type`. You can provide a custom `description` and additional elements, if you need.

::: tip
The locale can be passed directly to the component or wrap your application in `I18nProvider` from the `intergalactic/utils` package, as shown in the example below.
:::

::: sandbox

<script lang="tsx">
  export Demo from './examples/nodata_example.tsx';
</script>

:::

## Error example

The template already includes default `title`, `icon` and `description`. You can provide a custom `description` and additional elements if you need.

::: sandbox

<script lang="tsx">
  export Demo from './examples/error_example.tsx';
</script>

:::

## Custom examples

You can create custom messages, such as the "[Set up your tool](/components/widget-empty/widget-empty#set_up_your_product)" message.

To get the link to the [illustration](/style/illustration/illustration), use the function `getIconPath` from the package.

::: sandbox

<script lang="tsx">
  export Demo from './examples/custom_examples.tsx';
</script>

:::

You can find other examples of custom messages you can create with the WidgetEmpty component.

::: sandbox

<script lang="tsx">
  export Demo from './examples/custom-examples.tsx';
</script>

:::
