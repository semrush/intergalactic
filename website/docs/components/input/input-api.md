---
title: API
fileSource: input
---

@## Input

Wrap over the input elements.

```jsx
import Input from '@semcore/ui/input';
<Input />;
```

@typescript IInputProps

@## Input.Value

This component represents the native `tag` `input` and accepts all its properties, such as `value` and `onChange`.

```jsx
import Input from '@semcore/ui/input';
<Input.Value />;
```

@typescript IInputValueProps

@## Input.Addon

The addon inside the input (most often it is an icon) places the correct indent units depending on the size. The addon can be `interactive`.

When you click on Addon, the focus shifts to the input. You can cancel this by returning the `return false` in the `onMouseDown` handler.

```jsx
import Input from '@semcore/ui/input';
<Input.Addon />;
```

@typescript IInputAddonProps
