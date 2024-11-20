---
title: Table code and API
tabs: Example('table-old'), API('table-old-api'), Changelog('table-old-changelog')
---

## Table

```jsx
import Table from '@semcore/ui/table';
<Table />;
```

<TypesView type="TableProps" :types={...types} />

## Table.Row

```jsx
import Table from '@semcore/ui/table';
<Table.Row />;
```

<TypesView type="TableRowProps" :types={...types} />

## Table.Cell

```jsx
import Table from '@semcore/ui/table';
<Table.Cell />;
```

<TypesView type="TableCellRowProps" :types={...types} />

## Table.CellHead

```jsx
import Table from '@semcore/ui/table';
<Table.CellHead />;
```

<TypesView type="TableCellHeadProps" :types={...types} />

## Table.StickyHead

```jsx
import Table from '@semcore/ui/table';
<Table>
  <Table.StickyHead />
  <Table.Head />
</Table>;
```

<TypesView type="StickyHeadProps" :types={...types} />

<script setup>import { data as types } from '@types.data.ts';</script>
