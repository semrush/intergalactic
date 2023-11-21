---
title: Carousel
tabs: Design('carousel'), A11y('carousel-a11y'), API('carousel-api'), Example('carousel-code'), Changelog('carousel-changelog')
---

## Carousel with default indicators

::: sandbox

<script lang="tsx">
import React from 'react';
import { Box, Flex } from '@semcore/ui/flex-box';
import Carousel from '@semcore/ui/carousel';

const images = [
  'https://picsum.photos/id/1023/600/400',
  'https://picsum.photos/id/1024/600/400',
  'https://picsum.photos/id/1025/600/400',
];
const altTexts = [
  'A cyclist performing stunts in the forest',
  'A vulture flies with its wings spread wide',
  'A pug wrapped in a blanket sits on the road in the forest',
];
const width = 600;
const imageWidth = width - 75;

const Demo = () => (
  <Carousel
    w={width}
    aria-roledescription='image carousel'
    aria-label='Beauty of Nature'
    zoom={true}
    zoomWidth={1000}
    indicators="default"
  >
      {images.map((url, index) => (
        <Carousel.Item tag='img' key={url} src={url} w={imageWidth} alt={altTexts[index]} />
      ))}
  </Carousel>
);


</script>

:::

## Carousel with preview indicators

::: sandbox

<script lang="tsx">
import React from 'react';
import { Box, Flex } from '@semcore/ui/flex-box';
import Carousel from '@semcore/ui/carousel';

const images = [
  'https://picsum.photos/id/1023/600/400',
  'https://picsum.photos/id/1024/600/400',
  'https://picsum.photos/id/1025/600/400',
];
const altTexts = [
  'A cyclist performing stunts in the forest',
  'A vulture flies with its wings spread wide',
  'A pug wrapped in a blanket sits on the road in the forest',
];
const width = 600;
const imageWidth = width - 75;

const Demo = () => (
  <Carousel
    w={width}
    aria-roledescription='image carousel'
    aria-label='Beauty of Nature'
    zoom={true}
    zoomWidth={1000}
    indicators="preview"
  >
      {images.map((url, index) => (
        <Carousel.Item tag='img' key={url} src={url} w={imageWidth} alt={altTexts[index]} />
      ))}
  </Carousel>
);


</script>

:::

## Hidden controls to move focus in hidden block

- `ariaHidden` controls the visibility on the screens.
- `tabIndex` controls the visibility of the focus.

```jsx
<Carousel index={index} onIndexChange={handleChangeIndex}>
  <Carousel.Item key={ind} ariaHidden={ind === index}>
    <Image />
    <Button tabIndex={ind === index ? 1 : -1} />
  </Carousel.Item>
</Carousel>
```
