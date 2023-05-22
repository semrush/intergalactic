---
title: Design tokens
fileSource: utils
tabName: Tokens
---

> Design tokens are available for use from **@semcore/ui@13.5.0** version.

@## Description

Design tokens are variables that store visual design choices (colors, fonts, spaces, opacity, box-shadows, etc.). The most important thing is that tokens ensure the same style names and values are used in design files and code.

<!-- With design tokens, designers and developers can quickly access and apply a range of visual attributes for any given element in a UI. -->

Intergalactic design system has:

- set of base tokens that define a base palette;
- set of semantic tokens which are applied across all components and even the chart library.

These sets form the default theme of the design system.

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

Theme is a set of design tokens represented in CSS variables that differs from the default sets (base or semantic, or both). You can redefine them globally or only for a specific subtree of React app. Check [Usage in development](/style/design-tokens/design-tokens-usage-development/).

<!-- ### Global theme

Global themes should be preferred over local ones until multiple themes appear on the same page.

To apply a global theme, define CSS variables on the `:root` via CSS or JS. For example, following CSS will make all main backgrounds black and all primary texts white.

```css
:root {
  --intergalactic-bg-primary-neutral: #000;
  --intergalactic-text-primary: #fff;
}
```

Any design token from the [tokens list](/style/design-tokens/#semantic_tokens) may be applied. -->

<!-- ### Local theme

Theme for React components subtree may be applied via `<ThemeProvider />`.

`<ThemeProvider />` applies provided tokens on DOM node and handles passing them into React Portal created with `@semcore/portal`.

@example theme-provider -->

@## Creating your own theme

**First of all, answer these questions for your case:**

1. Do you want to use the components of the Intergalactic design system and need a completely different look and feel for them?
2. Is your product not a Semrush core product?

If the answer to all the questions above is yes, then you definitely need a theme that is different from the default one.

### Step one. Design new theme

Creating a theme usually starts with design. In fact, this is the most time-consuming part.

There are several ways (and, of course, there are more than the two that we offer next!). You can choose the one that suits you best based on your case.

Let's take a look at the two main theme creation situations: local and global.

#### **Local theme: you need to try on other tokens or a new theme for a component or part of the design system**

In this case we recommend you using [Tokens Studio plugin for Figma](https://www.figma.com/community/plugin/843461159747178978). It's one of the most powerful tools for managing tokens, linking styles between the code and Figma files, and it can help you save time trying new values for tokens of your new theme.

> There, you can find the detailed process for creating a new theme for our design system explained: [internal](https://www.figma.com/file/K1s6wF8NTH3uNHvjkn6hjc/Themes-playground-%26-tutorial-%F0%9F%8E%93?node-id=24%3A90461&t=uZCoQy8xPBjC1ctm-11), public (link will be here soon).

#### **Global theme: you need to develop a theme for the entire design system**

In this case, you need to take more steps.

1. Duplicate [the library with tokens and three main libraries with components](/get-started-guide/work-figma/#core_libraries).
2. Using the [Tokens Studio plugin for Figma](https://www.figma.com/community/plugin/843461159747178978), you connect the tokens of the default theme with your dublicated file. How to use it to create your own set of tokens for the new theme, check the playground: [internal](https://www.figma.com/file/K1s6wF8NTH3uNHvjkn6hjc/Themes-playground-%26-tutorial-%F0%9F%8E%93?node-id=24%3A90461&t=uZCoQy8xPBjC1ctm-11), public (link will be here soon).
3. Test and try on the theme for all components of the library in the theme playground.
4. Save the JSON of the theme, and either give it to the developers, or commit it yourself.
5. Voila! You are awesome!

### Step two. Connect the new theme to the components in code

This is where the magic of converting the json file with tokens into a new theme for the design system components begins.

We recommend you to check:

<!-- - [Themes section](/style/design-tokens/#themes); -->
- [Usage in development](/style/design-tokens/design-tokens-usage-development/);
- [Example for custom component](/style/design-tokens/design-tokens-code/);
- [CSS Injection guide](/style/css-injection/).

@page design-tokens-usage
@page design-tokens-usage-development
@page design-tokens-code
