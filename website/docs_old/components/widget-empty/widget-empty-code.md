---
title: Example
fileSource: widget-empty
---

@## NoData example

The template already includes the title. You only need to provide the data type and description.

> The locale can be passed directly to the component or wrap your application in `I18nProvider` from the `@react-semocre/utils` package, as shown in the example below.

@example no-data

@## NothingFound example

@example nothing-found

@## Error example

The template already includes the `title` and the `icon`. You only need to provide the `description` and additional elements if necessary.

@example error

@## Custom examples

You can create custom messages, such as the "[Set up your tool](/components/widget-empty/#set_up_your_product)" message.

To get the link to the [illustration](/style/illustration/), use the function `getIconPath` from the package.

@example setup

You can find other examples of custom messages you can create with the WidgetEmpty component.

@example custom
