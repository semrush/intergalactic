---
title: Breadcrumbs
fileSource: breadcrumbs
tabs: Design('breadcrumbs'), A11y('breadcrumbs-a11y'), API('breadcrumbs-api'), Example('breadcrumbs-code'), Changelog('breadcrumbs-changelog')
---

::: react-view

<script lang="tsx">
import React from 'react';
import PlaygroundGeneration from '@components/PlaygroundGeneration';
import Breadcrumbs from '@semcore/ui/breadcrumbs';

const App = PlaygroundGeneration(() => {
  return (
    <Breadcrumbs>
      <Breadcrumbs.Item href='#'>Projects</Breadcrumbs.Item>
      <Breadcrumbs.Item href='#'>semrush.com</Breadcrumbs.Item>
      <Breadcrumbs.Item active>Position Tracking</Breadcrumbs.Item>
    </Breadcrumbs>
  );
});
</script>

:::

## Description

**Breadcrumbs** is a component for displaying the "user's path" on the website. It's usually used as an additional navigation element.

**Why breadcrumbs are useful**:

- they unobtrusively show the users which page they are on;
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

## Long links truncation

If there isn’t enough place for the breadcrumbs (screen is too small or the text is too long), items are truncated into `ellipsis`.

![](static/ellipsis.png)

::: tip
Don't forget to check whether the full text is displayed in a tooltip. [Refer to our example](/components/breadcrumbs/breadcrumbs-code#breadcrumbs-item-truncation).
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
