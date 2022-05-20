---
title: Themes
---

@## Description

If you are creating a product that differs in style from other products of Semrush, use the tools for theming.

@## What is a theme?

Themes are just CSS. You can use our set of tools to change the default style of components or extend it.

@## How does it work?

There are 2 ways to redefine styles of our components:

- Local for one specific component
- Global for all components at once

@## Local specific

Styles composition helps us to extend basic styles of our components, and sometimes even supplement API. In fact, you write styles using `css-in-js` approach and transfer them to our components.

Advantages:

- An opportunity to "extend" API components with new properties responsible for appearance

Disadvantages:

- Styles shall be applied every time you use our component
- Styles are applied in runtime
- No style de-duplication
- It is difficult to reuse the styles

Read more about [how to apply styles composition in practice](/style/themes/themes-local/).

@## Global specific

This helps you to rewrite or to add styles to all our components by redefining their appearance. **It looks like this: you write CSS, while babel-plugin combines it with our default styles and applies it to all the components**.

Using this approach, you can publish themes to `npm` and reuse them later.

Advantages:

- Styles are applied to all the components automatically
- The theme is applied during assembly
- Easiness of reuse
- De-duplication of styles
- Versioning availability

Disadvantages:

- Strict structure and naming
- Need to configure webpack 🙄

You can write "themes" for our components this way [global](/style/themes/themes-global/) use.

@page themes-local
@page themes-global
