---
title: Breadcrumbs
fileSource: breadcrumbs
tabs: Design('breadcrumbs'), A11y('breadcrumbs-a11y'), API('breadcrumbs-api'), Example('breadcrumbs-code'), Changelog('breadcrumbs-changelog')
---

<Playground for="Breadcrumbs" />

## Description

**Breadcrumbs** is a component for displaying the "user's path" on the website. It's usually used as an additional navigation element.

**Why breadcrumbs are useful**:

- they unobtrusively show the users which page they're on;
- they help you link to other pages on the site (useful for SEO);
- they allow you to move between higher/lower nesting navigation levels without clicking the forward/backward buttons in the browser.

Don’t use breadcrumbs on the main pages.

## Appearance

Links inside this component have custom styles.

::: tip
The last item in the breadcrumbs is always non-clickable.
:::

![](static/breadcrumbs.png)

Table: Breadcrumbs styles

| Element             | Styles                                                                                                      |
| ------------------- | ----------------------------------------------------------------------------------------------------------- |
| Link                | `font-size: var(--fs-200)`, `line-height: var(--lh-200)`, `color: var(--text-secondary)`, `cursor: pointer` |
| `ChevronRight` icon | `color: var(--icon-secondary-neutral)`                                                                      |

### Margins

Margins between the links inside the breadcrumbs is 8px.

![](static/margins.png)

## Truncating long items

If there isn’t enough space for the breadcrumbs (viewport is too small or the text is too long), items are truncated with an `ellipsis`.

![](static/ellipsis.png)

::: tip
Don't forget to check that the full text is displayed in a hint. [Refer to our example](./breadcrumbs-code#truncating-long-items).
:::

## Interaction

![](static/hover.png)

Table: Breadcrumbs states

| State  | Styles                                                                                                      |
| ------ | ----------------------------------------------------------------------------------------------------------- |
| Normal | `font-size: var(--fs-200)`, `line-height: var(--lh-200)`, `color: var(--text-secondary)`, `cursor: pointer` |
| Hover  | `color: var(--text-primary)`, `text-decoration: underline`  |
| Active | `color: var(--text-primary)`                                |

## Usage in UX/UI

The recommended order of the navigation levels in the breadcrumbs:

1. The first link is the **product's Projects and/or the product's home page**.
2. The second link is the **Name of the project**.
3. The third link is the **Name of the product**.
