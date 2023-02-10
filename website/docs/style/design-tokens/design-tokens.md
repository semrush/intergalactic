---
title: Design tokens
fileSource: utils
tabName: Tokens
---

> Design tokens are available for use from @semcore/ui@13.5.0 version

@## Description

Design tokens are variables that store visual design choices (colors, fonts, spaces, opacity, box-shadows, etc.). The most important thing is that tokens ensure the same style names and values are used in design files and code.

<!-- With design tokens, designers and developers can quickly access and apply a range of visual attributes for any given element in a UI. -->

Intergalactic design system has:

- set of base tokens that define a base palette;
- set of semantic tokens which are applied across all components and even the chart library.

@## Base tokens (palette)

The list of base tokens is our palette. It was built with [Huetone tool](https://huetone.ardov.me/) (you can learn more about the tool in the [Twitter thread](https://twitter.com/ardovalexey/status/1447329411678806023)).

Shades of the same color have a value ranging from 50 to 800, depending on its tone. Each shade has recommendations for use based on [Huetone's contrast ratio calculation](https://huetone.ardov.me/).

@import base-tokens

@## Semantic tokens

It is a list of tokens for components and charts for the default Intergalactic theme.

Semantic tokens include tokens for:

- colors;
- typography;
- sizing;
- spacings;
- box-shadows;
- border-radius.

To learn more about the tokens names see [Token naming structure section](/style/design-tokens/design-tokens-usage/#token_naming_structure).

@import design-tokens

@## Themes

If you are creating a product that differs in style from other products of Semrush, apply a custom theme for your branding.

### What is a theme?

Each theme is a set of design tokens represented in CSS variables that differs from the default ones. You can redefine them globally on only for a specific subtree of React app.

### Global theme

Global themes should be preferred over local ones until multiple themes appear on the same page.

To apply a global theme, define CSS variables on the `:root` via CSS or JS. For example, following CSS will make all main backgrounds black and all primary texts white.

```css
:root {
  --intergalactic-bg-primary-neutral: #000;
  --intergalactic-text-primary: #fff;
}
```

Any design token from the [tokens list](/style/design-tokens/#semantic_tokens) may be applied.

### Local theme

Theme for React components subtree may be applied via `<ThemeProvider />`.

`<ThemeProvider />` applies provided tokens on DOM node and handles passing them into React Portal created with `@semcore/portal`.

@example theme-provider

@page design-tokens-usage
@page design-tokens-usage-development
@page design-tokens-code
