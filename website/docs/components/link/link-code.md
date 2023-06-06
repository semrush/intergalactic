---
title: Example
---

@## Link inside the content

By default, links are displayed as `inline-block` and do not wrap properly within the text. To achieve proper wrapping and underlining of links, set `noWrap=false` and `inline=true`.

@example inline

@## Link addon

You can add addons to link either by specifying the desired tag in the `addonLeft`/`addonRight` property or by rendering the `Link.Addon`/`Link.Text` in the component body. Both methods achieve the same result.

@example addon

@## Color links

Links can be colored for specific purposes. You can apply a specific color to links by passing the `color` property to them.

@example color

@## Links with ellipsis

There are two moments you need to consider when using link with addons and ellipsis:

- To properly display a link with ellipsis inside a flex block, you need to use a hack with `min-width: 0px`.
- When the text has an `overflow:hidden` property, it may overlap with a vertical addon. To avoid this, wrap the content in a flex container with vertical alignment.

@example ellipsis

@## Accessibility

If a link has no visible text, it is important to add an aria-label attribute with a description of the link for accessibility purposes.

@example a11y
