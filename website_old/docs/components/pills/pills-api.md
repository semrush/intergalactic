---
title: API
---

@## Pills

```jsx
import Pills from '@semcore/pills';
```

@interface IPillsProps

@## Pill.Item

```jsx
import Pills from '@semcore/pills';
<Pills.Item />;
```

@interface IPillProps

@## Pill.Item.Addon

The addon inside the pill (most often it is an icon) places the correct indent units depending on the size. Takes all properties of the `Box`.

```jsx
import Pills from '@semcore/pills';
<Pills.Item.Addon />;
```

@## Pill.Item.Text

Plain text, it sets correct indents depending on the size. If only text with no addons is used in the pill, it will be wrapped in `Pills.Item.Text` automatically. Takes all properties of the `Box`.

```jsx
import Pills from '@semcore/pills';
<Pills.Item.Text />;
```
