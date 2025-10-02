---
title: NoticeBubble
tabs: Design('notice-bubble'), A11y('notice-bubble-a11y'), API('notice-bubble-api'), Example('notice-bubble-code'), Changelog('notice-bubble-changelog')
---

## NoticeBubbleManager

```js
import { noticeBubbleDefaultManager } from '@semcore/ui/notice-bubble';
```

Manager is a storage of all notice instances, it is able to add, delete and update notices by calling the appropriate methods.

<TypesView type="NoticeBubbleManagerClass" :types={...types} />

## NoticeBubbleContainer

```js
import { NoticeBubbleContainer } from '@semcore/ui/notice-bubble';
```

Container is a `div` created in the `body` using `React.Portal`. It is inserted once in any part of the application and subscribes to Manager updates (`NoticeBubbleManager`). Later, notices will be rendered to it.

<TypesView type="NoticeBubbleContainerProps" :types={...types} />

<script setup>import { data as types } from '@types.data.ts';</script>
