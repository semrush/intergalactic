---
title: Tag
fileSource: tag
tabs: Design('tag'), A11y('tag-a11y'), API('tag-api'), Example('tag-code'), Changelog('tag-changelog')
---

## Tag, TagContainer

`TagContainer` is necessary for the correct appearance and behavior of the **Delete tag** button.

<TypesView type="TagProps" :types={...types} />

## TagContainer.Close

**Delete tag** button automatically adjusts to the selected theme and size.

Accepts all `Box` properties.

```jsx
import { TagContainer } from '@semcore/ui/tag';
<TagContainer.Close />;
```

## Tag.Addon

The addon inside the tag (most commonly an icon) sets the correct indents depending on the size.

It takes all the properties of the `Box`.

```jsx
import Tag from '@semcore/ui/tag';
<Tag.Addon />;
```

## Tag.Text

This ordinary text sets the appropriate indents depending on the size. If a simple text without addons is used in the Tag, it will turn into `Tag.Text` automatically.

It takes all the properties of the `Box`.

```jsx
import Tag from '@semcore/ui/tag';
<Tag.Text />;
```

## Tag.Circle

A special addon for round elements inside a tag (most often a picture) places the correct indents depending on the size.

It accepts all `Box` properties.

```jsx
import Tag from '@semcore/ui/tag';
<Tag.Circle />;
```

<script setup>import { data as types } from '@types.data.ts';</script>
