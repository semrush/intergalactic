---
title: CSS Injection
---

::: warning
:rotating_light: If you are using CSS Injection for theming purpose, consider review [design tokens based theming](/style/design-tokens/#themes).
:::

## Description

If you are creating a product that differs in style from other products of Semrush, use the tools for theming.

## How does it work?

There are two ways to redefine styles of our components:

- Local for one specific component.
- Global for all components at once.

## Local specific

Styles composition helps us to extend basic styles of our components, and sometimes even supplement API. In fact, you write styles using `CSS-in-JS` approach and transfer them to our components.

**Advantages:**

- An opportunity to "extend" API components with new properties responsible for appearance.

**Disadvantages:**

- Styles shall be applied every time you use our component.
- Styles are applied in runtime.
- No style de-duplication.
- It is difficult to reuse the styles.

Read more about [how to apply styles composition in practice](/style/css-injection/css-injection-local/).

## Global specific

This helps you to rewrite or to add styles to all our components by redefining their appearance. **It looks like this: you write CSS, while babel-plugin combines it with our default styles and applies it to all the components**.

Using this approach, you can publish CSS injections to `NPM` and reuse them later.

**Advantages:**

- Styles are applied to all the components automatically.
- The CSS injection is applied during assembly.
- Easiness of reuse.
- De-duplication of styles.
- Versioning availability.

**Disadvantages:**

- Strict structure and naming.
- Need to configure webpack.

You can write CSS injections for our components this way with [global use](/style/css-injection/css-injection-global/).

@page css-injection-local
@page css-injection-global
