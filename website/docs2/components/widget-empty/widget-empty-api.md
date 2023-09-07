---
title: API
fileSource: widget-empty
tabs: Design('widget-empty'), A11y('widget-empty-a11y'), API('widget-empty-api'), Example('widget-empty-code'), Changelog('widget-empty-changelog')
---

## WidgetEmpty

This component is used for displaying message for "empty" states in the widgets.

```jsx
import WidgetEmpty from '@semcore/ui/widget-empty';
<WidgetEmpty />;
```

<TypesView type="WidgetEmptyProps" :types={...types} />

## NoData

Use this state to display "No data" message.

```jsx
import { NoData } from '@semcore/ui/widget-empty';
<NoData />;
```

<TypesView type="WidgetNoDataProps" :types={...types} />

## Error

Use this state to display error message.

```jsx
import { Error } from '@semcore/ui/widget-empty';
<Error />;
```

<TypesView type="WidgetErrorProps" :types={...types} />

## Images

You can find all the possible images for the component in the [Illustration](/style/illustration/illustration-api/#getillustrationpath) component. To obtain any illustration, you can use the `getIllustrationPath` function, which returns the URL in the format `https://static.semrush.com/ui-kit/illustration/${version}/${name}.svg`.

<script setup>import { data as types } from '@types.data.ts';</script>