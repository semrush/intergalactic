---
title: Notice
tabs: Design('notice'), A11y('notice-a11y'), API('notice-api'), Example('notice-code'), Changelog('notice-changelog')
---

## Notice

```jsx
import Notice from '@semcore/ui/notice';
<Notice />;
```

<TypesView type="NoticeProps" :types={...types} />

## Notice.Label

The component is inherited from `Box` and is used to insert a label in the left part of the notice (usually, an icon).

```jsx
import Notice from '@semcore/ui/notice';
<Notice.label />;
```

## Notice.Actions

The component is inherited from `Box` and is used to insert control components in the lower part of the notice. Usually, it's a button or a group of buttons.

```jsx
import Notice from '@semcore/ui/notice';
<Notice.Actions />;
```

## Notice.Content

The component is inherited from `Box` and is used to insert content in the notice.

```jsx
import Notice from '@semcore/ui/notice';
<Notice.Content />;
```

## Notice.Close

The component is inherited from `Button` and is used to insert the **Close** button.

```jsx
import Notice from '@semcore/ui/notice';
<Notice.Close />;
```

## Notice.Text

The text content of the notice. Inherited from `Text`.

```jsx
import Notice from '@semcore/ui/notice';
<Notice.Text />;
```

## Notice.Title

The title of the notice. Inherited from `Text`.

```jsx
import Notice from '@semcore/ui/notice';
<Notice.Title />;
```

## NoticeSmart

A more convenient component version with posibility to define features through props. For more details, [refer to the example](./notice-code#noticesmart).

```jsx
import { NoticeSmart } from '@semcore/ui/notice';
<NoticeSmart />;
```

<TypesView type="NoticeSmartProps" :types={...types} />

<script setup>import { data as types } from '@types.data.ts';</script>
