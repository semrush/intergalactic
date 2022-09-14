---
title: API
---

@## NoticeBubbleManager

```js
import NoticeBubbleManager from '@semcore/ui/notice-bubble';
```

Manager is a storage of all notice instances, it is able to add, delete and update notices by calling the appropriate methods.

@typescript INoticeBubbleManager

@## NoticeBubbleContainer

```js
import { NoticeBubbleContainer } from '@semcore/ui/notice-bubble';
```

Container - div in the body via the portal (`React.Portal`). It is inserted once in any part of the application and subscribes to Manager updates (`NoticeBubbleManager`). Later, notices will be rendered to it.

@typescript INoticeBubbleContainerProps

@## NoticeBubble

`import { NoticeBubble } from '@semcore/ui/notice-bubble';`

JSX-view of the notice; it subscribes to the component lifespan and calls the corresponding methods of the Manager (`NoticeBubbleManager`).

@typescript INoticeBubbleInfoProps

@## NoticeBubbleWarning

`import { NoticeBubbleWarning } from '@semcore/ui/notice-bubble';`

JSX-view of the notice; it subscribes to the component lifespan and calls the corresponding methods of the Manager (`NoticeBubbleManager`).

@typescript INoticeBubbleWarningProps
