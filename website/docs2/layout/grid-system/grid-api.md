---
title: API
fileSource: grid
tabs: Grid and page layout('grid-system'), API('grid-api'), Grid system('grid-code'), Changelog('grid-changelog')
---

## Row

```jsx
import { Row } from '@semcore/ui/grid';
<Row />;
```

<script setup>
  import { data as types } from '../../../builder/typings/types.data.ts'
</script>

<TypesView type="RowProps" :types={...types} />

## Col

```jsx
import { Col } from '@semcore/ui/grid';
<Col />;
```

<TypesView type="ColProps" :types={...types} />
