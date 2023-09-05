---
title: API
tabs: Checkbox('index'), A11y('checkbox-a11y'), API('checkbox-api'), Example('checkbox-code'), Changelog('checkbox-changelog')
---

## Checkbox

Wrapper over the checkbox with the `label` tag.

```jsx
import Checkbox from '@semcore/ui/checkbox';
<Checkbox />;
```

<TypesView type="CheckboxProps" :types={...types} />

## Checkbox.Value

Represents `input[type=checkbox]` and `span` with an icon. Properties apply to the icon, except for those specified in `includeInputProps`.

```jsx
import Checkbox from '@semcore/ui/checkbox';
<Checkbox.Value />;
```

<TypesView type="CheckboxValueProps" :types={...types} />

## Checkbox.Text

It is the customized `Text` from `@semcore/ui/typography`, depending on the size.

```jsx
import Checkbox from '@semcore/ui/checkbox';
<Checkbox.Text />;
```

<TypesView type="CheckboxTextProps" :types={...types} />

<script setup>import { data as types } from '@types.data.ts';</script>