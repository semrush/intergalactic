import React from 'react';
import { Box, Flex } from '@semcore/flex-box';
import Carousel from '@semcore/carousel';

const images = [
  `https://picsum.photos/id/1023/600/400`,
  `https://picsum.photos/id/1024/600/400`,
  `https://picsum.photos/id/1025/600/400`,
];
const width = 600;
const imageWidth = width - 75;

const Demo = () => (
  <Carousel w={width} defaultIndex={1}>
    <Flex alignItems="center">
      <Carousel.Prev />
      <Box style={{ overflow: 'hidden' }}>
        <Carousel.Container>
          {images.map((url) => (
            <Carousel.Item tag="img" key={url} src={url} w={imageWidth} />
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
            tag="img"
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

export default Demo;
