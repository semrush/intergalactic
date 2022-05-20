---
title: Example
---

@## Links inside the content

By default, the link is `inline-block` and `no-wrap`. This means that if it is inserted into the text, no expected result will be obtained. In order for the link to be properly wrapped and underlined, set `noWrap=false` and `inline=true`.

You can combine these properties to get the desired effect.

@example inline

@## Addon for the link

Addons can be set either by passing the desired tag to the `addonLeft`/`addonRight` property or by rendering the `Link.Addon`/`Link.Text` in the component body. The examples below are the same.

@example addon

@## Color links

Sometimes links need to be colored. For example, when they are used as a trigger for a select (when it is no longer valid and painted in the warning color `$orange`). Since links are inherited from typography, you can pass `color` to them.

@example color
