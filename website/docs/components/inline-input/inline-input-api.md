---
title: InlineInput
tabs: Design('inline-input'), A11y('inline-input-a11y'), API('inline-input-api'), Example('inline-input-code'), Changelog('inline-input-changelog')
---

## InlineInput

Wrap over the inline-input elements.

```jsx
import InlineInput from '@semcore/ui/inline-input';
<InlineInput />;
```

<TypesView type="InlineInputProps" :types={...types} />

## InlineInput.Value

This component represents the native `tag` `input` and accepts all its properties, such as `value` and `onChange`.

```jsx
import InlineInput from '@semcore/ui/inline-input';
<InlineInput.Value />;
```

<TypesView type="InlineInputValueProps" :types={...types} />

## InlineInput.Addon

The addon inside the container (most often it is an icon or short text) places the correct indent units depending on the size.

When you click on Addon, the focus shifts to the input. You can cancel this by returning the `return false` in the `onClick` handler.

```jsx
import InlineInput from '@semcore/ui/inline-input';
<InlineInput.Addon />;
```

## InlineInput.ConfirmControl

The addon with hint tooltip and icon. By default is displayed with middle-size Check icon. Addon click triggers `InlineInput` `onConfirm` callback.

When `loading` property is provided to `InlineInput`, `InlineInput.ConfirmControl` icon replaced with spinner.

```jsx
import InlineInput from '@semcore/ui/inline-input';
<InlineInput.ConfirmControl />;
```

<TypesView type="InlineInputConfirmControlProps" :types={...types} />

## InlineInput.CancelControl

The addon with hint tooltip and icon. By default is displayed with middle-size Close icon. Addon click triggers `InlineInput` `onCancel` callback.

```jsx
import InlineInput from '@semcore/ui/inline-input';
<InlineInput.CancelControl />;
```

<TypesView type="InlineInputCancelControlProps" :types={...types} />

<script setup>import { data as types } from '@types.data.ts';</script>
