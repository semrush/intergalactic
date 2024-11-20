---
title: NeighborLocation
fileSource: neighbor-location
tabs: Design('neighbor-location'), API('neighbor-location-api'), Changelog('neighbor-location-changelog')
---

## NeighborLocation

Root wrapper-component doesn't create a node but provides a context for defining neighbors.

```jsx
import NeighborLocation from '@semcore/ui/neighbor-location';

<NeighborLocation />;
```

<TypesView type="NeighborLocationProps" :types={...types} />

## NeighborLocation.Detect

Component for detect neighbors.

```jsx
import NeighborLocation from '@semcore/ui/neighbor-location';

<NeighborLocation.Detect />;
```

<TypesView type="NeighborItemProps" :types={...types} />

<script setup>import { data as types } from '@types.data.ts';</script>
