---
title: API
---

@## InlineEdit

Wrap over the inline edit elements.

```jsx
import InlineEdit from '@semcore/inline-edit';
<InlineEdit />;
```

@interface IInlineEditProps

@## InlineEdit.View

All children of `InlineEdit.View` is displayed when `editable` property of `InlineEdit` is set to `false`. When `editable` property is set to `true`, children elements still persist in DOM, but hidden via css opacity.

```jsx
import InlineEdit from '@semcore/inline-edit';
<InlineEdit.View />;
```

@## InlineEdit.Edit

All children of `InlineEdit.Edit` is displayed when `editable` property of `InlineEdit` is set to `true`.

```jsx
import InlineEdit from '@semcore/inline-edit';
<InlineEdit.Edit />;
```
