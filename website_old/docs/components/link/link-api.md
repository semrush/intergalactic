---
title: API
---

@## Link

A modified link component that can `disabled` and add Addons to itself. By default, the link is `inline-block` and `no-wrap` – that is, in most cases it is used as a stand-alone component.

```jsx
import Link from '@semcore/link';
<Link />;
```

@interface ILinkProps

@## Link.Addon

The addon inside the link (most often it is an icon) places the correct padding units depending on the size. Takes all properties of the `Box`.

```jsx
import Link from '@semcore/link';
<Link.Addon />;
```

@## Link.Text

Plain text, it sets correct paddings depending on the size. If only text with no addons is used in the link, it will be wrapped in `Link.Text` automatically. Takes all properties of the `Box`.

```jsx
import Link from '@semcore/link';
<Link.Text />;
```
