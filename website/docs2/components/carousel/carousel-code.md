---
title: Example
tabs: Carousel('carousel'), A11y('carousel-a11y'), API('carousel-api'), Example('carousel-code'), Changelog('carousel-changelog')
---

## Image & video galleries

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
  <Carousel w={width} defaultIndex={0}>
    <Flex>
      <Carousel.Prev />
      <Box style={{ overflow: 'hidden', borderRadius: 6 }}>
        <Carousel.Container>
          {images.map((url, index) => (
            <Carousel.Item tag='img' key={url} src={url} w={imageWidth} alt={altTexts[index]} />
          ))}
        </Carousel.Container>
      </Box>
      <Carousel.Next />
    </Flex>
    <Carousel.Indicators>
      {({ items }) =>
        items.map((indicatorProps, index) => (
          <Carousel.Indicator
            {...indicatorProps}
            tag='img'
            alt={`Thumbnail of image with ${altTexts[index]}`}
            key={images[index]}
            src={images[index]}
            w={100}
            h={100}
          />
        ))
      }
    </Carousel.Indicators>
  </Carousel>
);


</script>

:::

## Item indicators

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
  <Carousel w={width} defaultIndex={0}>
    <Flex>
      <Carousel.Prev />
      <Box style={{ overflow: 'hidden', borderRadius: 6 }}>
        <Carousel.Container>
          {images.map((url, index) => (
            <Carousel.Item tag='img' key={url} src={url} w={imageWidth} alt={altTexts[index]} />
          ))}
        </Carousel.Container>
      </Box>
      <Carousel.Next />
    </Flex>
    <Carousel.Indicators />
  </Carousel>
);


</script>

:::

## Content galleries inside the modal window

::: sandbox

<script lang="tsx">
import React, { useState } from 'react';
import { Text } from '@semcore/ui/typography';
import Carousel from '@semcore/ui/carousel';
import Button from '@semcore/ui/button';
import Modal from '@semcore/ui/modal';

const Demo = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button onClick={() => setVisible(!visible)}>Open Carousel</Button>
      <Modal visible={visible} onClose={() => setVisible(false)} w={664}>
        <Carousel tabIndex={0}>
          <Carousel.Container>
            {[1, 2].map((_, ind) => (
              <Carousel.Item key={ind}>
                <Text size={500} mb={4} bold tag='h4'>
                  Heading
                </Text>
                <Text>
                  Gregor Samsa wakes up one morning to find himself transformed into a "monstrous
                  vermin". He initially considers the transformation to be temporary and slowly
                  ponders the consequences of this metamorphosis. Unable to get up and leave the
                  bed, Gregor reflects on his job as a traveling salesman and cloth merchant, which
                  he characterizes as being full of "temporary and constantly changing human
                  relationships, which never come from the heart". He sees his employer as a despot
                  and would quickly quit his job had he not been his family's sole breadwinner and
                  working off his bankrupt father's debts. While trying to move, Gregor finds that
                  his office manager, the chief clerk, has shown up to check on him, indignant about
                  Gregor's unexcused absence. Gregor attempts to communicate with both the manager
                  and his family, but all they can hear from behind the door is incomprehensible
                  vocalizations. Gregor laboriously drags himself across the floor and opens the
                  door. The manager, upon seeing the transformed Gregor, flees the apartment.
                  Gregor's family is horrified, and his father drives him back into his room under
                  the threat of violence.
                </Text>
              </Carousel.Item>
            ))}
          </Carousel.Container>
          <Carousel.Prev position='absolute' h='100%' w={48} left='-48px' />
          <Carousel.Next position='absolute' h='100%' w={48} right='-48px' />
        </Carousel>
      </Modal>
    </>
  );
};


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
