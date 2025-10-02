---
title: InlineEdit
tabs: Design('inline-edit'), A11y('inline-edit-a11y'), API('inline-edit-api'), Example('inline-edit-code'), Changelog('inline-edit-changelog')
---

## InlineEdit

Wrap over the inline edit elements.

```jsx
import InlineEdit from '@semcore/ui/inline-edit';
<InlineEdit />;
```

<TypesView type="InlineEditProps" :types={...types} />

## InlineEdit.View

All children of `InlineEdit.View` is displayed when `editable` property of `InlineEdit` is set to `false`. When `editable` property is set to `true`, children elements still persist in DOM, but hidden via CSS opacity.

```jsx
import InlineEdit from '@semcore/ui/inline-edit';
<InlineEdit.View />;
```

## InlineEdit.Edit

All children of `InlineEdit.Edit` is displayed when `editable` property of `InlineEdit` is set to `true`.

```jsx
import InlineEdit from '@semcore/ui/inline-edit';
<InlineEdit.Edit />;
```

<script setup>import { data as types } from '@types.data.ts';</script>
