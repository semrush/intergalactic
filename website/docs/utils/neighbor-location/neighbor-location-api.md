---
title: neighborLocation
fileSource: neighbor-location
tabs: Design('neighbor-location'), API('neighbor-location-api'), Changelog('neighbor-location-changelog')
---

::: warning
:rotating_light: `NeighborLocation` wrapper component is deprecated and will be removed in the next releases, due to the unreliability of the API and the unpredictability of neighbor detection, especially in React 18's parallel render.

Use the `neighborLocation` component property instead.
:::

## NeighborLocation

Root wrapper-component doesn't create a node but provides a context for defining neighbors.

```jsx
import NeighborLocation from '@semcore/ui/base-components';

<NeighborLocation />;
```

<TypesView type="NSNeighborLocation.Props" :types={...types} />

## NeighborLocation.Detect

Component for detect neighbors.

```jsx
import NeighborLocation from '@semcore/ui/base-components';

<NeighborLocation.Detect />;
```

<TypesView type="NSNeighborLocation.Detect.Props" :types={...types} />

<script setup>import { data as types } from '@types.data.ts';</script>
