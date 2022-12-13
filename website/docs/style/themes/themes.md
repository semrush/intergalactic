---
title: Themes
---

@## Description

If you are creating a product that differs in style from other products of Semrush, apply a custom theme for your brending.

@## What is a theme?

Each theme is a set of design tokens represented in css variables that differs from the default ones. You can redefine them globally on only for specific subtree of React app.

@## Global theme

Global themes should be preferred over local ones until multiple themes appear on same page.

To apply a global theme, define css variables on `:root` via css or js. For example, following css will make all main backgrounds black and all primary texts white.

```css
:root {
  --intergalactic-bg-primary-neutral: #000;
  --intergalactic-text-primary: #fff;
}
```

Any design token from the table bellow may be applied.

@## Local theme

Theme for React components subtree may be applied via `<ThemeProvider />`.

@example theme-provider

`<ThemeProvider />` applies provided tokens on DOM node and handles passing them into React Portal created with `@semcore/portal`.

@## Design tokens

All available design tokens are provided in the table bellow.

@import design-tokens

@## Base tokens

@import base-tokens
