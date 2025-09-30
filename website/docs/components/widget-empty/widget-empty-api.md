---
title: Widget empty state
fileSource: widget-empty
tabs: Design('widget-empty'), A11y('widget-empty-a11y'), API('widget-empty-api'), Example('widget-empty-code'), Changelog('widget-empty-changelog')
---

## NoData

Use this state to display "No data" (including "Nothing found") empty states.

```jsx
import { NoData } from '@semcore/ui/widget-empty';
<NoData />;
```

<TypesView type="WidgetNoDataProps" :types={...types} />

## Error

Use this state to display error messages.

```jsx
import { Error } from '@semcore/ui/widget-empty';
<Error />;
```

<TypesView type="WidgetErrorProps" :types={...types} />

## WidgetEmpty

Use this component to display customized empty states.

```jsx
import WidgetEmpty from '@semcore/ui/widget-empty';
<WidgetEmpty />;
```

<TypesView type="WidgetEmptyProps" :types={...types} />

## Images

You can find all the possible images for the component in the [Illustration](/style/illustration/illustration-api#getillustrationpath) component. To obtain any illustration, you can use the `getIllustrationPath` function, which returns the URL in the format `https://static.semrush.com/ui-kit/illustration/${version}/${name}.svg`.

<script setup>import { data as types } from '@types.data.ts';</script>
