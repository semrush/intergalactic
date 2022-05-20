---
title: Examples
---

> See core principles, concept description, API and changelog in the [Chart principles](/data-display/d3-chart/).

@## Stacked area

If you need to display a part-to-whole ratio — use the `<StackedArea/>` and `<StackedArea.Area/>` components.

@example stacked-area

@## Edge cases

- If a part of the chart has no data — use a dashed line to draw that period.
- If the data has only one value — display it as a dot.
- Two consecutively known values will automatically be displayed as the `StackedArea` component.

@example stacked-area-without-data
