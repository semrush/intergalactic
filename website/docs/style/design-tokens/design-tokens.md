---
title: Design tokens
fileSource: utils
tabName: Tokens
---

@## Description

Design tokens are variables that store visual design choices (colors, fonts, spaces, opacity, box-shadows, etc.). The most important thing is that tokens ensure the same style names and values are used in design files and code.

<!-- With design tokens, designers and developers can quickly access and apply a range of visual attributes for any given element in a UI. -->

Intergalactic design system has:

- set of base tokens that define a base palette;
- set of semantic tokens which are applied across all components and even the chart library.

@## Base tokens (palette)

A list of base tokens is our palette. It was built with [Huetone tool](https://huetone.ardov.me/) (you can learn more about the tool in the [Twitter thread](https://twitter.com/ardovalexey/status/1447329411678806023)).

Shades of the same color have a value ranging from 50 to 800, depending on its tone. Each shade has recommendations for use based on [Huetone's contrast ratio calculation](https://huetone.ardov.me/).

@import base-tokens

@## Semantic tokens

There is a list of tokens for components and charts for the default Intergalactic theme.

@import design-tokens

@page design-tokens-usage
