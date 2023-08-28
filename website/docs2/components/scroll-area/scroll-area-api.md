---
title: API
fileSource: scroll-area
tabs: ScrollArea('scroll-area'), A11y('scroll-area-a11y'), API('scroll-area-api'), Example('scroll-area-code'), Changelog('scroll-area-changelog')
---

## ScrollArea

```jsx
import ScrollArea from '@semcore/ui/scroll-area';
<ScrollArea />;
```

<script setup>
  import { data as types } from '../../../builder/typings/types.data.ts'
</script>

<TypesView type="ScrollAreaProps" :types={...types} />

## ScrollArea.Container

This is a wrap over the content to calculate its size. It takes all properties of `Box`.

```jsx
import ScrollArea from '@semcore/ui/scroll-area';
<ScrollArea.Container />;
```

## ScrollArea.Bar

```jsx
import ScrollArea from '@semcore/ui/scroll-area';
<ScrollArea.Bar />;
```

<TypesView type="ScrollBarProps" :types={...types} />

## ScrollArea.Bar.Slider

Stylized div. It takes all properties of `Box`.

```jsx
import ScrollArea from '@semcore/ui/scroll-area';
<ScrollArea.Bar.Slider />;
```
