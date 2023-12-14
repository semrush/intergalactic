---
title: API
fileSource: product-head
---

@## ProductHead

The wrapping with paddings. Not responsive (so far), but can be dragged.

```jsx
import ProductHead from '@semcore/ui/product-head';
<ProductHead />;
```

@## ProductHead.Row

The header is divided into lines with components. They are divided from each other with equal paddings – `my={2}`.

```jsx
import ProductHead from '@semcore/ui/product-head';
<ProductHead.Row />;
```

@## ProductHead.Links

The component for setting the paddings between the links.

```jsx
import ProductHead from '@semcore/ui/product-head';
<ProductHead.Links />;
```

@## ProductHead.Buttons

The component for setting the paddings between the buttons.

```jsx
import ProductHead from '@semcore/ui/product-head';
<ProductHead.Buttons />;
```

@## Title

The header’ heading component

```jsx
import { Title } from '@semcore/ui/product-head';
<Title />;
```

@typescript HeaderTitleProps

@## Info

The component for output of the information on the project and the global filters of the report. The information is divided with a vertical line.

```jsx
import { Info } from '@semcore/ui/product-head';
<Info />;
```

@## Info.Item

One unit with the information on the project or global filter.

```jsx
import { Info } from '@semcore/ui/product-head';
<Info.Item />;
```

@typescript InfoItemProps
