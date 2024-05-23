---
title: Card
tabs: Design('card'), A11y('card-a11y'), API('card-api'), Example('card-code'), Changelog('card-changelog')
---

## Card

It's just a [Box](../../layout/box-system/box-api#box).

```jsx
import Card from 'intergalactic/card';
<Card />;
```

## Card.Header

It's just a [Box](../../layout/box-system/box-api#box), with pre-installed paddings. Contains `Card.Title` and `Card.Description`.

```jsx
import Card from 'intergalactic/card';
<Card.Header />;
```

## Card.Body

It's just a [Box](../../layout/box-system/box-api#box), with pre-installed paddings.

```jsx
import Card from 'intergalactic/card';
<Card.Body />;
```

## Card.Title

The card title is able to display the tip.

```jsx
import Card from 'intergalactic/card';
<Card.Title />;
```

<TypesView type="TitleProps" :types={...types} />

## Card.Description

Has all properties as the [Text](/style/typography/typography-api#a9dffb).

```jsx
import Card from 'intergalactic/card';
<Card.Description />;
```

<script setup>import { data as types } from '@types.data.ts';</script>