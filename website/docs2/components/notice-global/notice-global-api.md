---
title: API
tabs: NoticeGlobal('notice-global'), A11y('notice-global-a11y'), API('notice-global-api'), Example('notice-global-code'), Changelog('notice-global-changelog')
---

## Notice

```jsx
import NoticeGlobal from '@semcore/ui/notice-global';
<NoticeGlobal />;
```

<script setup>
  import { data as types } from '../../../builder/typings/types.data.ts'
</script>

<TypesView type="NoticeGlobalProps" :types={...types} />

## NoticeGlobal.Content

The component is inherited from `Box` and is used to insert content in the notification.

```jsx
import NoticeGlobal from '@semcore/ui/notice';
<NoticeGlobal.Content />;
```

## NoticeGlobal.CloseIcon

The component is inherited from `Box` and is used to insert the close cross.

```jsx
import NoticeGlobal from '@semcore/ui/notice';
<NoticeGlobal.CloseIcon />;
```
