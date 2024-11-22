---
title: Checkbox
tabs: Design('checkbox'), A11y('checkbox-a11y'), API('checkbox-api'), Example('checkbox-code'), Changelog('checkbox-changelog')
---

## Checkbox

Wrapper over the checkbox with the `label` tag.

```jsx
import Checkbox from '@semcore/ui/checkbox';
<Checkbox />;
```

<TypesView type="CheckboxProps" :types={...types} />

## Checkbox.Value

Represents `input[type=checkbox]` and `span` with an icon.

```jsx
import Checkbox from '@semcore/ui/checkbox';
<Checkbox.Value />;
```

## Checkbox.Value.Control

Represents `input[type=checkbox]` 

```jsx
import Checkbox from '@semcore/ui/checkbox';
<Checkbox.Value.Control />;
```

<TypesView type="CheckboxValueControlProps" :types={...types} />

Represents `span` in `Checkbox.Value`.

```jsx
import Checkbox from '@semcore/ui/checkbox';
<Checkbox.Value.CheckMark />;
```

<TypesView type="CheckboxValueCheckMarkProps" :types={...types} />

## Checkbox.Text

It is the customized `Text` from `intergalactic/typography`, depending on the size.

```jsx
import Checkbox from '@semcore/ui/checkbox';
<Checkbox.Text />;
```

<TypesView type="CheckboxTextProps" :types={...types} />

<script setup>import { data as types } from '@types.data.ts';</script>
