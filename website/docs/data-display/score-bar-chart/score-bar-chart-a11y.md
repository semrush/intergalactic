---
title: Score bar chart
tabs: Design('score-bar-chart'), A11y('score-bar-chart-a11y'), API('score-bar-chart-api'), Examples('score-bar-chart-code'), Changelog('score-bar-chart-changelog')
---

The component is implemented as a structured list to ensure clear and predictable navigation for assistive technology users.

### Semantic Structure

Items are grouped using list roles (role="list" / role="listitem"), allowing screen readers to announce the total number of items and the user's current position within the dataset.

### Text Content

Each row sequentially exposes the category name, percentage share, and absolute count to screen readers.

### Visual Progress Bar

The bar serves an exclusively decorative role. It is hidden from assistive technologies (aria-hidden="true") to prevent redundant announcements, as all underlying values are already conveyed via text.
