---
title: Button
tabs: Design('button'), A11y('button-a11y'), API('button-api'), Example('button-code'), Changelog('button-changelog')
---

## Button

Modified button component (`type=button` by default), it can do `loading` and add Addons to itself 💪

```jsx
import Button from '@semcore/ui/button';
<Button />;
```

<TypesView type="ButtonProps" :types={...types} />

## Button.Addon

The addon is inside the button (most often it is an icon), it sets the correct margins depending on the size. It takes all properties of the `Box`.

```jsx
import Button from '@semcore/ui/button';
<Button.Addon />;
```

## Button.Text

Plain text with predefined paddings depending on the size. Accepts all properties of [Text](../../style/typography/typography-api#text).

If only text with no addons is used, it will be wrapped in `Button.Text` automatically.

```jsx
import Button from '@semcore/ui/button';
<Button.Text />;
```

## ButtonLink

Modified button component (`type=button` by default) with display as link.

```jsx
import { ButtonLink } from '@semcore/ui/button';
<Button />;
```

<TypesView type="ButtonLinkProps" :types={...types} />

<script setup>import { data as types } from '@types.data.ts';</script>
