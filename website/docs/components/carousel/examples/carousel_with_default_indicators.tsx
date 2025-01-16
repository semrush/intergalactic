import React from 'react';
import Carousel from '@semcore/carousel';

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
    aria-roledescription='carousel'
    aria-label='Beauty of Nature'
    zoom={true}
    zoomWidth={1000}
    indicators='default'
  >
    {images.map((url, index) => (
      <Carousel.Item key={url} w={imageWidth}>
        <img
          // biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole:
          role='button'
          src={url}
          aria-label={`Open in fullscreen ${altTexts[index]}`}
          style={{ width: '100%' }}
        />
      </Carousel.Item>
    ))}
  </Carousel>
);

export default Demo;
