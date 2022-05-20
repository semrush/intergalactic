---
title: API
---

@## NoticeBubbleManager

```js
import NoticeBubbleManager from '@semcore/notice-bubble';
```

Manager is a storage of all notice instances, it is able to add, delete and update notices by calling the appropriate methods.

@interface INoticeBubbleManager

@## NoticeBubbleContainer

```js
import { NoticeBubbleContainer } from '@semcore/notice-bubble';
```

Container - div in the body via the portal (`React.Portal`). It is inserted once in any part of the application and subscribes to Manager updates (`NoticeBubbleManager`). Later, notices will be rendered to it.

@interface INoticeBubbleContainerProps

@## NoticeBubble

`import { NoticeBubble } from '@semcore/notice-bubble';`

JSX-view of the notice; it subscribes to the component lifespan and calls the corresponding methods of the Manager (`NoticeBubbleManager`).

@interface INoticeBubbleInfoProps

@## NoticeBubbleWarning

`import { NoticeBubbleWarning } from '@semcore/notice-bubble';`

JSX-view of the notice; it subscribes to the component lifespan and calls the corresponding methods of the Manager (`NoticeBubbleManager`).

@interface INoticeBubbleWarningProps
