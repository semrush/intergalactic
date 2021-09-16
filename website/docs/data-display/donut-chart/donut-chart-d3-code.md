---
title: D3 code
---

> See core principles, concept description, API and changelog in the [Chart principles](/data-display/d3-chart/).

@## Donut

- You can draw donut and pie charts with the `Donut` component.
- `Pie` is a separate sector.
- `Label` is a text label inside the chart.

@example donut

@## Semi-Donut

To create a half-size chart, you need to specify the `halfsize` value and reduce the height of the chart by half.

@example semi-donut

@## Edge cases

- If any data is missing — don't display it on the chart.
- If only one value is known — display it with a small sector. Be sure to also specify the percentage or value of the unknown data.

@example semi-donut-with-one-data

- If there is no data — show an empty gray chart.

@example donut-without-data
