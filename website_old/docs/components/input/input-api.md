---
title: API
---

@## Input

Wrap over the input elements.

```jsx
import Input from '@semcore/input';
<Input />;
```

@interface IInputProps

@## Input.Value

This component represents the native `tag` `input` and accepts all its properties, such as `value` and `onChange`.

```jsx
import Input from '@semcore/input';
<Input.Value />;
```

@interface IInputValueProps

@## Input.Addon

The addon inside the input (most often it is an icon) places the correct indent units depending on the size. The addon can be `interactive`.

When you click on Addon, the focus shifts to the input. You can cancel this by returning the `return false` in the `onClick` handler.

```jsx
import Input from '@semcore/input';
<Input.Addon />;
```

@interface IInputAddonProps
