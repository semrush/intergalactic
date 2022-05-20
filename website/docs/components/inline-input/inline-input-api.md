---
title: API
---

@## InlineInput

Wrap over the inline-input elements.

```jsx
import InlineInput from '@semcore/inline-input';
<InlineInput />;
```

@interface IInlineInputProps

@## InlineInput.Value

This component represents the native `tag` `input` and accepts all its properties, such as `value` and `onChange`.

```jsx
import InlineInput from '@semcore/inline-input';
<InlineInput.Value />;
```

@interface IInlineInputValueProps

@## InlineInput.Addon

The addon inside the container (most often it is an icon or short text) places the correct indent units depending on the size.

When you click on Addon, the focus shifts to the input. You can cancel this by returning the `return false` in the `onClick` handler.

```jsx
import InlineInput from '@semcore/inline-input';
<InlineInput.Addon />;
```

@## InlineInput.ConfirmControl

The addon with hint tooltip and icon. By default is displayed with middle-size Check icon. Addon click triggers `InlineInput` `onConfirm` callback.

When `loading` property is provided to `InlineInput`, `InlineInput.ConfirmControl` icon replaced with spinner.

```jsx
import InlineInput from '@semcore/inline-input';
<InlineInput.ConfirmControl />;
```

@interface IInlineInputConfirmControlProps

@## InlineInput.CancelControl

The addon with hint tooltip and icon. By default is displayed with middle-size Close icon. Addon click triggers `InlineInput` `onCancel` callback.

```jsx
import InlineInput from '@semcore/inline-input';
<InlineInput.CancelControl />;
```

@interface IInlineInputCancelControlProps
