---
title: Design tokens
fileSource: utils
tabName: Tokens
tabs: Design tokens('design-tokens'), Usage in design('design-tokens-usage'), Usage in development('design-tokens-usage-development'), Example('design-tokens-code')
---

::: tip
Design tokens are available for use from **@semcore/ui@13.5.0** version.
:::

## Description

Design tokens are variables that store visual design choices (colors, fonts, spaces, opacity, box-shadows, etc.). The most important thing is that tokens ensure the same style names and values are used in design files and code.


Intergalactic design system has:

- set of base tokens that define a base palette;
- set of semantic tokens which are applied across all components and even the chart library.

These sets form the default theme of the design system.

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

To learn more about the tokens names see [Token naming structure section](/style/design-tokens/design-tokens-usage/#token_naming_structure).

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

Theme is a set of design tokens represented in CSS variables that differs from the default sets (base or semantic, or both). You can redefine them globally or only for a specific subtree of React app. Check [Usage in development](/style/design-tokens/design-tokens-usage-development/).

- [Usage in development](/style/design-tokens/design-tokens-usage-development/);
- [Example for custom component](/style/design-tokens/design-tokens-code/);
- [CSS Injection guide](/style/css-injection/).

