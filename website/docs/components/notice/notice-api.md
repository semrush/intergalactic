---
title: Notice
tabs: Design('notice'), A11y('notice-a11y'), API('notice-api'), Example('notice-code'), Changelog('notice-changelog')
---

## Notice

```jsx
import Notice from 'intergalactic/notice';
<Notice />;
```

<TypesView type="NoticeProps" :types={...types} />

## Notice.Label

The component is inherited from `Box` and is used to insert a label in the left part of the notification, usually it is an icon.

```jsx
import Notice from 'intergalactic/notice';
<Notice.label />;
```

## Notice.Actions

The component is inherited from `Box` and is used to insert control components in the lower part of the notification, usually it is a button or a group of buttons.

```jsx
import Notice from 'intergalactic/notice';
<Notice.Actions />;
```

## Notice.Content

The component is inherited from `Box` and is used to insert content in the notification.

```jsx
import Notice from 'intergalactic/notice';
<Notice.Content />;
```

## Notice.CloseIcon

The component is inherited from `Box` and is used to insert the close cross.

```jsx
import Notice from 'intergalactic/notice';
<Notice.CloseIcon />;
```

## NoticeSmart

This is the component version for simplified operation; for more details, see demo examples.

```jsx
import { NoticeSmart } from 'intergalactic/notice';
<NoticeSmart />;
```

<TypesView type="NoticeSmartProps" :types={...types} />

<script setup>import { data as types } from '@types.data.ts';</script>