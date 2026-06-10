---
title: Tag
fileSource: tag
tabs: Design('tag'), A11y('tag-a11y'), API('tag-api'), Examples('tag-code'), Changelog('tag-changelog')
---

## Tag, TagContainer

`TagContainer` is necessary for the correct appearance and behavior of the **Delete tag** button.

<TypesView type="NSTag.Props" :types={...types} />

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

An instance of [`Text`](../../style/typography/typography-api#text) with the appropriate styles depending on the tag size.

Plain text without addons placed directly in `Tag` is wrapped in `Tag.Text` automatically.

```jsx
import Tag from '@semcore/ui/tag';
<Tag.Text />;
```

<TypesView type="NSTag.Text.Props" :types={...types} />

## Tag.Circle

A special addon for round elements inside a tag (most often a picture) places the correct indents depending on the size.

It accepts all `Box` properties.

```jsx
import Tag from '@semcore/ui/tag';
<Tag.Circle />;
```

<script setup>import { data as types } from '@types.data.ts';</script>
