---
title: Design tokens
tabs: Tokens('design-tokens'), Usage in design('design-tokens-usage'), Usage in development('design-tokens-usage-development'), Changelog('design-tokens-changelog')
---

::: warning
Use tokens from the **@semcore/theme** package instead of **@semcore/core**,
as they will be removed from the core package starting from **version 17**.
:::

## Description

Design tokens are variables that store visual design choices (colors, fonts, spaces, opacity, box-shadows, etc.). The most important thing is that tokens ensure the same style names and values are used in design files and code.

Intergalactic Design System has:

- **set of base tokens** that define a base palette;
- **set of semantic tokens** which are applied across all components and even the chart library.

## Base tokens

Base tokens include:

- our product palette;
- font size, line height, font weight, and letter spacing values;
- the base spacing and sizing scale;
- sizing;
- spacing;
- the base border radius scale;
- breakpoints.

<!-- Palette is built from a few OKLCH reference shades per hue. All steps 50–800 are filled by blending along lightness in OKLCH (then fitted to the display gamut).

Each shade has recommendations for use based on [Huetone's contrast ratio calculation](https://huetone.ardov.me/). -->

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

It's a list of tokens for components and charts for the default Intergalactic theme.

Semantic tokens include:

- colors;
- box shadows;
- border radius;
- form control heights;
- opacity;
- z-index;
- animation durations.

To learn more about the tokens names, see [Token naming structure section](/style/design-tokens/design-tokens-usage#token-naming-structure).

::: react-view

<script lang="tsx">
import React from 'react';
import tokens from './design-tokens.json';
import DesignTokensTable from '@components/DesignTokens';

const DesignTokens = () => <DesignTokensTable tokens={tokens} />;

const App = DesignTokens;
</script>

:::

## Stylelint plugin

The stylelint plugin helps developers to avoid mistakes in the design token names. It should be installed as [a separate package](https://www.npmjs.com/package/@semcore/stylelint-plugin).

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

- `include` — adds custom design tokens to the list of allowed tokens.
- `exclude` — removes design tokens from the list of allowed tokens.
- `tokensSource` — path to a JS module with the design token map (expects a default export). Use `node_modules/@semcore/theme/lib/light.js`.
- `prefix` — design tokens (default is `--intergalactic-`). Only CSS variables with this prefix are considered as design tokens.
