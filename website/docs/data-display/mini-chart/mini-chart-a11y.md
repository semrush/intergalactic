---
title: Mini chart
tabs: Design('mini-chart'), A11y('mini-chart-a11y'), API('mini-chart-api'), Example('mini-chart-code'), Changelog('mini-chart-changelog')
---

For this component, follow these recommendations on the accessibility:

- If a text metric is present next to the mini chart, and it fully represents the mini chart data, hide the mini chart from assistive technology with `aria-hidden`.
- If there's no accompanying text metric, or it doesn't fully represent the data, add an `aria-label` with a data summary for the mini chart.
- If you intend to make the mini chart a clickable element or link, enclose it in the appropriate tags (`a` or `button`). This ensures better touch target control and allows the addition of elements like text within the hover area. For links and buttons, include an `aria-label` unless they contain visible text readable by assistive technology.
