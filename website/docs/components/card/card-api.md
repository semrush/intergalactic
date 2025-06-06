---
title: Card
tabs: Design('card'), A11y('card-a11y'), API('card-api'), Example('card-code'), Changelog('card-changelog')
---

## Card

It's just a [Box](../../layout/box-system/box-api#box) with predefined styles.

```jsx
import Card from '@semcore/ui/card';
<Card />;
```

## Card.Header

It's just a [Box](../../layout/box-system/box-api#box) with predefined paddings. Contains `Card.Title` and `Card.Description`.

```jsx
import Card from '@semcore/ui/card';
<Card.Header />;
```

## Card.Body

It's just a [Box](../../layout/box-system/box-api#box) with predefined paddings.

```jsx
import Card from '@semcore/ui/card';
<Card.Body />;
```

## Card.Title

The card title is able to display the tip.

```jsx
import Card from '@semcore/ui/card';
<Card.Title />;
```

<TypesView type="TitleProps" :types={...types} />

## Card.Description

Has all properties of [Text](/style/typography/typography-api#text).

```jsx
import Card from '@semcore/ui/card';
<Card.Description />;
```

<script setup>import { data as types } from '@types.data.ts';</script>
