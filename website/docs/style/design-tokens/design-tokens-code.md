---
title: Example
---

@## Tokens with custom component

Design tokens are recommended when creating a custom component to ensure a consistent look and reducing the time and effort spent on manual updates.

@example custom-component

@## Process for frontend usage

Design token files [produced by Figma plugins](/style/design-tokens/design-tokens-usage/#how_to_make_a_new_theme) can't be used as is in Frontend application. Use widget below to transform output of figma plugins to [ready to import css file](/style/design-tokens/design-tokens-usage-development/#global_theme) or [ready to use json files](/style/design-tokens/design-tokens-usage-development/#global_theme).

@import processor
