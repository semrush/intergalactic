---
title: Carousel
tabs: Design('carousel'), A11y('carousel-a11y'), API('carousel-api'), Example('carousel-code'), Changelog('carousel-changelog')
---

## Carousel

```jsx
import Carousel from '@semcore/ui/carousel';
<Carousel />;
```

<TypesView type="CarouselProps" :types={...types} />

## Carousel.Container

`Carousel.Container` is a wrap over `Carousel.Item`. `Carousel.Item` doesn't have own API, extends to [Box](/layout/box-system/box-api#box).

```jsx
import Carousel from '@semcore/ui/carousel';
<Carousel.Container />;
```

## Carousel.Item

`Carousel.Item` doesn't have own API, extends to [Box](/layout/box-system/box-api#box).

```jsx
import Carousel from '@semcore/ui/carousel';
<Carousel.Item />;
```

## Carousel.Indicators

Component view for default dots. It doesn't have own API, extends to [Box](/layout/box-system/box-api#box).

```jsx
import Carousel from '@semcore/ui/carousel';
<Carousel.Indicators />;
```

## Carousel.Prev, Carousel.Next

Component view for default Chevron icons. It doesn't have own API, extends to [Box](/layout/box-system/box-api#box).

```jsx
import Carousel from '@semcore/ui/carousel';
<Carousel.Prev />
<Carousel.Next />
```

<script setup>import { data as types } from '@types.data.ts';</script>
