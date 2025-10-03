---
title: NoticeGlobal
tabs: Design('notice-global'), A11y('notice-global-a11y'), API('notice-global-api'), Example('notice-global-code'), Changelog('notice-global-changelog')
---

## Notice

```jsx
import NoticeGlobal from '@semcore/ui/notice-global';
<NoticeGlobal />;
```

<TypesView type="NoticeGlobalProps" :types={...types} />

## NoticeGlobal.Content

The component is inherited from `Box` and is used to insert content in the notification.

```jsx
import NoticeGlobal from '@semcore/ui/notice';
<NoticeGlobal.Content />;
```

## NoticeGlobal.CloseIcon

The component is inherited from `Button` and is used to insert the **Close** button.

```jsx
import NoticeGlobal from '@semcore/ui/notice';
<NoticeGlobal.CloseIcon />;
```

<script setup>import { data as types } from '@types.data.ts';</script>
