---
title: Examples
---

> See core principles, concept description, API and changelog in the [Chart principles](/data-display/d3-chart/).

@## Radial Tree

@example radial-tree

@## Multicolor

Pass color in data to specify radians color.

@example radial-tree-multicolor

@## Custom svg in center

Any svg elements may be used in the center of radial tree.

@example radial-tree-custom-center

@## Multiline text

Multiline text implementation is not trivial in svg. Text on the leafs of tree is split into lines by `\n` symbol automatically. Text in the chart center should be split into lines manually.

@example radial-tree-multiline-text

@## Edge cases

- If there is no data — show an empty gray chart.

@example radial-tree-without-data

- If data is not ready yet — show chart skeleton.

@example radial-tree-loading
