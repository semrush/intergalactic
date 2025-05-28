---
title: Design tokens
fileSource: utils
tabs: Tokens('design-tokens'), Usage in design('design-tokens-usage'), Usage in development('design-tokens-usage-development'), Changelog('design-tokens-changelog')
---

::: info
Design tokens are available for use from **intergalactic@13.5.0** version.
:::

## Description

Design tokens are variables that store visual design choices (colors, fonts, spaces, opacity, box-shadows, etc.). The most important thing is that tokens ensure the same style names and values are used in design files and code.

Intergalactic Design System has:

- set of base tokens that define a base palette;
- set of semantic tokens which are applied across all components and even the chart library.

These sets form the default theme of the design system.

::: tip
For the complete JSON with all the token sets, refer to the [GitHub repository](https://github.com/semrush/intergalactic/tree/master/semcore/utils/theme).
:::

## Stylelint plugin

The stylelint plugin help developers avoid mistakes in design token names. It's part of [intergalactic npm package](https://www.npmjs.com/package/intergalactic) but also might be installed as [a separate package](https://www.npmjs.com/package/@semcore/stylelint-plugin).

```json
// .stylelintrc.json
{
  "extends": ["stylelint-config-standard"],
  "plugins": ["@semcore/stylelint-plugin"],
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

To learn more about the tokens names see [Token naming structure section](/style/design-tokens/design-tokens-usage#token-naming-structure).

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

If you need to build a product that differs in style from our default theme, you can create a custom theme for it.

Theme is a set of tokens represented in CSS variables that has different from the default sets values. Values can be changed for base, semantic, or both sets. You can redefine them globally or only for a specific subtree of React app. Refer to [Usage in development](/style/design-tokens/design-tokens-usage-development).

## Creating new theme

### Step one. Design new theme

Creating a theme usually starts with design. In fact, this is the most time-consuming part.

**We recommend you using the native Figma variables (tokens) functionality**. But if you need more functionality that Figma doesn't have at the moment, use [Tokens Studio plugin for Figma](https://www.figma.com/community/plugin/843461159747178978). It's one of the most powerful tools for managing tokens, linking styles between the code and Figma files.

Refer to the following tutorials, for the detailed process for creating a new theme:

- Semrush designers and developers can use two tutorials, [tutorial for Figma tokens](https://www.figma.com/design/1TV7YbEL3FaV0znCkQtsrC/Themes'-playground-%26-tutorial-%F0%9F%8E%93?node-id=13125-73031&node-type=canvas&t=qOTf0DSn0M8p63of-11) and [tutorial for Tokens Studio](https://www.figma.com/design/K1s6wF8NTH3uNHvjkn6hjc/Themes'-playground-%26-tutorial-%F0%9F%8E%93?m=auto&t=jHrLhhOMB32IMklB-6)
- Other users can use the [tutorial for Tokens Studio](https://www.figma.com/community/file/1274028958101796491/semrush-design-tokens)

::: tip
**In cases where different styles are needed for just one component or a part of the design system:**

- Designer can create a new theme as described earlier, and apply it only to the necessary component
- Developer can use [ThemeProvider](/style/design-tokens/design-tokens-usage-development#themeprovider)
  :::

### Step two. Connect new theme to components in code

For this step, you need to export your token sets with the new values and process them into CSS styles in the way that suits you best. We recommend referring to the following links:

- [Usage in development](/style/design-tokens/design-tokens-usage-development);
- [Example for custom component](/style/design-tokens/design-tokens-usage-development);
- [CSS Injection guide](/style/css-injection/css-injection).
