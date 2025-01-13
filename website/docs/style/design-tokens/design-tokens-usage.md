---
title: Design tokens
tabs: Tokens('design-tokens'), Usage in design('design-tokens-usage'), Usage in development('design-tokens-usage-development'), Example('design-tokens-code'), Changelog('design-tokens-changelog')
---

## What is design token?

Basically, design tokens are atoms of the design system's visual styles. Think of them as values stored as predefined styles for predefined purposes, elements, and components.

![](static/token-description.png)

::: tip
For the Semrush developers and designers we have a couple of onboarding files. Refer to the following links:

- [Themization workshop file](https://www.figma.com/design/7dJaaWaqoTKdeGU4Pq02rz/Themization-workshop?node-id=0-1&node-type=canvas&t=cC709O9aHUP7lTRL-11) which you can duplicate and play with the examples
- [Brief tokens explanation](https://www.figma.com/design/1TV7YbEL3FaV0znCkQtsrC/Themes'-playground-%26-tutorial-%F0%9F%8E%93?node-id=14802-111796&node-type=frame&t=qOTf0DSn0M8p63of-11) from our Theme's playground file
- [Big presentation on design tokens](https://www.figma.com/design/DfhEsCc7j9c1XTpi7mwHwt/Design-tokens-(for-designers)?node-id=0-1&node-type=canvas&t=2zFBWvB8qwRtpivO-11)
:::

## Token sets

There are base and semantic token sets in our design system.

**Base tokens** represent the theme's global palette. Changing their values will affect semantic tokens. Therefore, by changing the palette, you can create new themes. For creating new palette you can use tools like [Huetone](https://huetone.ardov.me/).

![](static/base-tokens.png)

**Semantic (alias) tokens** relate to a specific component or context of usage. They refer to the base tokens.

Semantic tokens include tokens for:

- colors
- typography
- sizing
- spacings
- box-shadows
- border-radius

![](static/semantic-tokens.png)

## Token naming structure

Token name is the same in both Figma and code, except for the theme/project name which is added to the token in the code.

For example, compare token for primary neutral background:

- in Figma: `bg/primary/neutral`
- in code: `--intergalactic-bg-primary-neutral`

![scheme of tokens naming structure: --{theme-name}-{category}-{priority}-{context}-{invert}-{state}](static/token-naming.png)

::: tip
The token name doesn't have to contain all the elements of the naming structure. The naming structure creates a system so you can name the new token, and it will fit into the design system.
:::

## Tokens usage

Semantic tokens are context-specific, so they're used according to the intentions implied by their names:

- `bg` token group for backgrounds
- `text` token group for text color
- `border` token group for strokes and borders
- `overlay` token group for overlays and faders
- `control` token group for all button-like controls
- `icon` token group for icons
- `chart` token group for chart components and grids
- `date-picker` token group for DatePicker
- `table` token group for tables
- `tag` token group for tags
- etc.

![](static/token-usage1.png)

![](static/token-usage2.png)

![](static/token-usage3.png)

Base tokens can be used for new elements and components which aren't in the Intergalactic Design System yet, but only if semantic tokens aren't suitable.

![](static/token-usage4.png)

## Creating new theme

Refer to [the section in the common guide](/style/design-tokens/design-tokens#creating-new-theme).
