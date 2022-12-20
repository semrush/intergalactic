---
title: Themes
---

@## Description

If you are creating a product that differs in style from other products of Semrush, apply a custom theme for your branding.

@## What is a theme?

Each theme is a set of design tokens represented in CSS variables that differs from the default ones. You can redefine them globally on only for a specific subtree of React app.

@## Global theme

Global themes should be preferred over local ones until multiple themes appear on the same page.

To apply a global theme, define CSS variables on the `:root` via CSS or JS. For example, following CSS will make all main backgrounds black and all primary texts white.

```css
:root {
  --intergalactic-bg-primary-neutral: #000;
  --intergalactic-text-primary: #fff;
}
```

Any design token from the [tokens list](/style/design-tokens/#semantic_tokens) may be applied.

@## Local theme

Theme for React components subtree may be applied via `<ThemeProvider />`.

`<ThemeProvider />` applies provided tokens on DOM node and handles passing them into React Portal created with `@semcore/portal`.

@example theme-provider
