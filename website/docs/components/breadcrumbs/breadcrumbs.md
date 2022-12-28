---
title: Breadcrumbs
fileSource: breadcrumbs
tabName: Design
---

@import playground

@## Description

**Breadcrumbs** is a component for displaying the "user's path" on the website. It's usually used as an additional navigation element.

**Why breadcrumbs are useful**:

- they unobtrusively show the users which page they are on;
- they help you link to other pages on the site (useful for SEO);
- they allow you to move between higher/lower nesting navigation levels without clicking the forward/backward buttons in the browser.

Do not use breadcrumbs on the main pages.

@## Appearance

Links inside this component have custom styles.

> The last item in the breadcrumbs is always non-clickable.

![breadcrumbs style](static/breadcrumbs.png)

| Element                  | Styles                                                                            |
| ------------------------ | --------------------------------------------------------------------------------- |
| [Link](/components/link) | `font-size: 14px; color: --gray-500; cursor: pointer;`, there is no `line-height` |
| `ChevronRight` icon      | `color: --gray-300`; `cursor: default;`                                           |

### Margins

Margins between the links inside the breadcrumbs is 8px.

![breadcrumbs margins](static/margins.png)

@## Long links truncation

If there is not enough place for the breadcrumbs (screen is too small or the text is too long), the last item is collapsed into `ellipsis`.

![breadcrumbs ellipsis](static/ellipsis.png)

@## Interaction

![breadcrumbs hover](static/hover.png)

| State  | Styles                                                                            |
| ------ | --------------------------------------------------------------------------------- |
| normal | `font-size: 14px; color: --gray-500; cursor: pointer;`, there is no `line-height` |
| hover  | `color: --gray-600;` + underline                                                  |
| active | `color: --gray-800; cursor: default;`                                             |

@## Use in UX/UI

The recommended order of the navigation levels in the breadcrumbs:

1. The first link is **Dashboard**. It leads to the screen with widgets for various products.
2. The second link is the **product's Projects and/or the product's home page**.
3. The third link is the **Name of the project**.
4. The fourth link is the **Name of the product**.

@page breadcrumbs-a11y
@page breadcrumbs-api
@page breadcrumbs-code
@page breadcrumbs-changelog
