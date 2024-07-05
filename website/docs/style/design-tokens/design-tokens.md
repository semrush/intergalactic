---
title: Design tokens
fileSource: utils
tabs: Tokens('design-tokens'), Usage in design('design-tokens-usage'), Usage in development('design-tokens-usage-development'), Example('design-tokens-code'), Changelog('design-tokens-changelog')
---

::: tip
Design tokens are available for use from **intergalactic@13.5.0** version.
:::

## Description

Design tokens are variables that store visual design choices (colors, fonts, spaces, opacity, box-shadows, etc.). The most important thing is that tokens ensure the same style names and values are used in design files and code.

Intergalactic Design System has:

- set of base tokens that define a base palette;
- set of semantic tokens which are applied across all components and even the chart library.

These sets form the default theme of the design system.

## Stylelint plugin

The stylelint plugin help developers avoid mistakes in design token names. It's part of [intergalactic npm package](https://www.npmjs.com/package/intergalactic) but also might be installed as [a separate package](https://www.npmjs.com/package/@semcore/stylelint-plugin).

```json
// .stylelintrc.json
{
  "extends": ["stylelint-config-standard"],
  "plugins": ["intergalactic/stylelint-plugin"],
  "rules": {
		"intergalactic/design-tokens": true
	}
}
```

### Available options

- `include` - adds custom design tokens to the list of allowed tokens.
- `exclude` - removes design tokens from the list of allowed tokens.
- `tokensSource` - path to the file with design tokens. Default is `intergalactic/utils/lib/themes/default.json`.
- `tokensPrefix` - design tokens (default is `--intergalactic-`). Only CSS variables with this prefix are considered as design tokens.

## Base tokens (palette)

The list of base tokens is our palette. It was built with [Huetone tool](https://huetone.ardov.me/) (learn more about the tool in the [Twitter thread](https://twitter.com/ardovalexey/status/1447329411678806023)).

Shades of the same color have a value ranging from 50 to 800, depending on its tone. Each shade has recommendations for use based on [Huetone's contrast ratio calculation](https://huetone.ardov.me/).

::: react-view

<script lang="tsx">
import React from 'react';
import tokens from './base-tokens.json';
import BaseTokensTable from '@components/BaseTokens';

const BaseTokens = () => <BaseTokensTable tokens={tokens} />;

const App = BaseTokens;
</script>

:::

## Semantic tokens

It is a list of tokens for components and charts for the default Intergalactic theme.

Semantic tokens include tokens for:

- colors;
- typography;
- sizing;
- spacings;
- box-shadows;
- border-radius.

To learn more about the tokens names see [Token naming structure section](/style/design-tokens/design-tokens-usage#token_naming_structure).

::: react-view

<script lang="tsx">
import React from 'react';
import tokens from './design-tokens.json';
import DesignTokensTable from '@components/DesignTokens';

const DesignTokens = () => <DesignTokensTable tokens={tokens} />;

const App = DesignTokens;
</script>

:::

## Themes

If you are creating a product that differs in style from other products of Semrush, apply a custom theme for your branding.

### What is a theme?

Theme is a set of design tokens represented in CSS variables that differs from the default sets (base or semantic, or both). You can redefine them globally or only for a specific subtree of React app. Refer to [Usage in development](/style/design-tokens/design-tokens-usage-development).

## Creating your own theme

**First of all, answer these questions for your case:**

1. Do you want to use the components of the Intergalactic Design System and need a completely different look and feel for them?
2. Is your product not a Semrush core product?

If the answer to all the questions above is yes, then you definitely need a theme that is different from the default one.

### Step one. Design new theme

Creating a theme usually starts with design. In fact, this is the most time-consuming part.

There are several ways (and, of course, there are more than the two that we offer next!). You can choose the one that suits you best based on your case.

Let's take a look at the two main theme creation situations: local and global.

#### **Local theme: you need to try on other tokens or a new theme for a component or part of the design system**

In this case we recommend you using [Tokens Studio plugin for Figma](https://www.figma.com/community/plugin/843461159747178978). It's one of the most powerful tools for managing tokens, linking styles between the code and Figma files, and it can help you save time trying new values for tokens of your new theme.

::: tip
There, you can find the detailed process for creating a new theme for our design system explained: [internal](https://www.figma.com/file/K1s6wF8NTH3uNHvjkn6hjc/Themes-playground-%26-tutorial-%F0%9F%8E%93?node-id=24%3A90461&t=uZCoQy8xPBjC1ctm-11), [public](https://www.figma.com/community/file/1274028958101796491/semrush-design-tokens).
:::

#### **Global theme: you need to develop a theme for the entire design system**

In this case, you need to take more steps.

1. Duplicate [the library with tokens and three main libraries with components](/get-started-guide/work-figma/work-figma#core_libraries).
2. Using the [Tokens Studio plugin for Figma](https://www.figma.com/community/plugin/843461159747178978), you connect the tokens of the default theme with your dublicated file. How to use it to create your own set of tokens for the new theme, check the playground: [internal](https://www.figma.com/file/K1s6wF8NTH3uNHvjkn6hjc/Themes-playground-%26-tutorial-%F0%9F%8E%93?node-id=24%3A90461&t=uZCoQy8xPBjC1ctm-11), [public](https://www.figma.com/community/file/1274028958101796491/semrush-design-tokens).
3. Test and try on the theme for all components of the library in the theme playground.
4. Save the JSON of the theme, and either give it to the developers, or commit it yourself.
5. Voila! You are awesome!

### Step two. Connect the new theme to the components in code

This is where the magic of converting the JSON file with tokens into a new theme for the design system components begins.

We recommend you to check:

- [Usage in development](/style/design-tokens/design-tokens-usage-development);
- [Example for custom component](/style/design-tokens/design-tokens-code);
- [CSS Injection guide](/style/css-injection/css-injection).

