---
title: API
tabs: DataTable code and API('data-table'), API('data-table-api'), Changelog('data-table-changelog')
---

## DataTable

```jsx
import DataTable from '@semcore/ui/data-table';
<DataTable />;
```

<script setup>
  import { data as types } from '../../../builder/typings/types.data.ts'
</script>

<TypesView type="DataTableProps" :types={...types} />

## DataTable.Head

```jsx
import DataTable from '@semcore/ui/data-table';
<DataTable.Head />;
```

<TypesView type="DataTableHeadProps" :types={...types} />

## DataTable.Column

```jsx
import DataTable from '@semcore/ui/data-table';
<DataTable.Column />;
```

<TypesView type="DataTableColumnProps" :types={...types} />

## DataTable.Body

```jsx
import DataTable from '@semcore/ui/data-table';
<DataTable.Body />;
```

It's a wrapper over a [Box](/layout/box-system/box-api/#a3cfce) component.

## DataTable.Row

```jsx
import DataTable from '@semcore/ui/data-table';
<DataTable.Row />;
```

<TypesView type="DataTableRowProps" :types={...types} />

## DataTable.Cell

```jsx
import DataTable from '@semcore/ui/data-table';
<DataTable.Cell />;
```

<TypesView type="DataTableCellProps" :types={...types} />
