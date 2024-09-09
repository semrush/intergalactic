---
title: ProductHead
fileSource: product-head
tabs: Design('product-head'), A11y('product-head-a11y'), API('product-head-api'), Example('product-head-code'), Changelog('product-head-changelog')
---

## Description

**ProductHead** is a comprehensive composed component that contains all common controls, CTAs, and filters for data filtering in the product's reports.

It's always positioned below the main Semrush header and searchbar.

## Component composition

![](static/product-head-composition.png)

**The report header includes the following:**

1. `ProductHead.Row`: The header is divided into rows with components, and they're separated from each other by equal paddings.
2. `ProductHead.Links`: They're usually placed at the top right of the header, refer to [Additional links pattern](/patterns/links-order/links-order).
3. `ProductHead.Buttons`.
4. `Title`: It's a name of the product and the project. Can have additional controls for customizing the product or performing additional actions.
5. `Info`: It's a row with global filters and/or additional information.
6. `Info.Item`: An item with the information on the project or global filter.

## Margins and paddings

![product-head paddings](static/padding-left-right.png)

![product-head margins](static/margins.png)

If there is a [Notice](/components/notice/notice) in the header, it has an 8px margin-bottom to the elements in ProductHead.

![product-head notice-margins](static/notice-margins.png)

### Margins between elements

![product-head element sizes](static/elements-margins.png)

## Styles

### Breadcrumbs and additional links

::: tip
Use the [ButtonLink](../../components/button/button.md#button-with-link-styles) component if the element acts as a button, that's opens a dialog or changes the page.
:::

- [Breadcrumbs](/components/breadcrumbs/breadcrumbs) and [additional links](/patterns/links-order/links-order) are center-aligned.
- [Links](/components/link/link) have a size of 14px.
- The margin between the links is 20px.

### Heading and main controls

- The heading, buttons, and labels are center-aligned with respect to each other.
- For the title, use text with a size of 20px (use `--fs-400`, `--lh-400` tokens).
- Use `--text-primary` token for the text color, and for the project's name, use `--text-secondary` token.
- The size of nearby icons should be M. For icon color, use the `--icon-secondary-neutral` token.
- The icons are aligned with the title's baseline.
- [Button](/components/button/button) has a size of M.

### Filters and/or additional information

- All elements are center-aligned.
- For text, use a size of 14px (use `--fs-200`, `--lh-200` tokens) and `--text-primary` token for the color.
- Icons have a size of M.

## ProductHead variants

### Maximum set of elements inside

![max element product-head](static/max-info.png)

::: tip
When the domain and/or project names are too long and don't fit in the intended place, collapse them into an `ellipsis`. If you have controls on the right, add a “protective” left margin of 24px.
:::

![title in ellipsis and controls margin](static/ellipsis-and-margin.png)

### Global filters or additional information

![short product-head](static/short-info.png)

### No global filters, additional information or tabs

In these cases, the margin between the row with the product's title and the TabLine/Divider is 16px.

![product-head without filters](static/without-filters.png)

![product-head without filters](static/min-info.png)
