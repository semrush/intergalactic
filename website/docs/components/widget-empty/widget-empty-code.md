---
title: Example
fileSource: widget-empty
---

@## NoData example

The template already has the title. You should only transfer the data type and description.

> 💡 The locale may be either transferred to the component itself, or wrap your application in `I18nProvider` from the `@react-semocre/utils` package, as in the example below.

@example no-data

@## Error example

The template already has the title and the image. You should only transfer the description and additional elements if necessary.

@example error

@## Setup Tool example

You can create custom messages. For example, "[Set up your tool](/components/widget-empty/#set_up_your_tool)" message.

To get the link to the image use the function `getIconPath` from the package.

@example setup
