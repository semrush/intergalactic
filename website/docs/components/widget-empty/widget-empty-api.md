---
title: API
fileSource: widget-empty
---

@## WidgetEmpty

This component is used for displaying message for "empty" states in the widgets.

```jsx
import WidgetEmpty from '@semcore/ui/widget-empty';
<WidgetEmpty />;
```

@typescript IWidgetEmptyProps

@## NoData

Use this state to display "No data" message.

```jsx
import { NoData } from '@semcore/ui/widget-empty';
<NoData />;
```

@typescript IWidgetNoDataProps

@## Error

Use this state to display error message.

```jsx
import { Error } from '@semcore/ui/widget-empty';
<Error />;
```

@typescript IWidgetErrorProps

@## Images

You can find all the possible images for the component in the [Illustration](/style/illustration/illustration-api/#getillustrationpath) component. To obtain any illustration, you can use the `getIllustrationPath` function, which returns the URL in the format `https://static.semrush.com/ui-kit/illustration/${version}/${name}.svg`.
