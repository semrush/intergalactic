---
title: API
---

@## Tag

@interface ITagProps

@## Tag.Addon

The addon inside the tag (most commonly an icon) sets the correct indents depending on the size.

It takes all the properties of the `Box`.

```jsx
import Tag from '@semcore/tag';
<Tag.Addon />;
```

@## Tag.Text

This ordinary text sets the appropriate indents depending on the size. If a simple text without addons is used in the Tag, it will turn into `Tag.Text` automatically.

It takes all the properties of the `Box`.

```jsx
import Tag from '@semcore/tag';
<Tag.Text />;
```

@## Tag.Close

Cross icon automatically adjusts to the selected theme and size.

It accepts all `Box` properties.

```jsx
import Tag from '@semcore/tag';
<Tag.Close />;
```

@## Tag.Circle

A special addon for round elements inside a tag (most often a picture) places the correct indents depending on the size.

It accepts all `Box` properties.

```jsx
import Tag from '@semcore/tag';
<Tag.Circle />;
```
