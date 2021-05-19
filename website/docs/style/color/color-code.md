---
title: Code
---

@## Resolve color

We have a set of colors that's available as [CSS variables](https://github.com/semrush/intergalactic/blob/master/semcore/utils/style/var.css). To apply these colors in JS, use `resolveColor` utility, that converts color names to HEX format. If the trans color is not in the set, the transfered string will be returned.

```js
import resolveColor from '@semcore/utils/lib/color';
resolveColor('gray20'); // #333333
```

> 🦄 Components that you can transfer colors to, such as [Tag](/components/tag/) or [Badge](/components/badge/), pass through this utility.

Here is a simple example of using it.

@example paint
