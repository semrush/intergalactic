import { Box } from '@semcore/ui/base-components';
import Carousel from '@semcore/ui/carousel';
import type { NSCarousel } from '@semcore/ui/carousel';
import React from 'react';

const images = [
  'https://placehold.co/600x400/8000FF/FFFF00?text=Image+1',
  'https://placehold.co/600x400/8000FF/FFFF00?text=Image+2',
  'https://placehold.co/600x400/8000FF/FFFF00?text=Image+3',
];
const altTexts = [
  'A cyclist performing stunts in the forest',
  'A vulture flies with its wings spread wide',
  'A pug wrapped in a blanket sits on the road in the forest',
];
const width = 600;
const imageWidth = width - 75;

const Demo = (props: NSCarousel.Props) => (
  <Box w={width}>
    <Carousel
      w={width}
      aria-label='Beauty of Nature'
      zoom={props.zoom}
      zoomWidth={props.zoomWidth}
      indicators={props.indicators}
      bounded={props.bounded}
      duration={props.duration}
      step={props.step}
      defaultIndex={props.defaultIndex}
      index={props.index}
    >
      {images.map((url, index) => (
        <Carousel.Item key={url} w={imageWidth}>
          <img

            role='button'
            src={url}
            aria-label={`Open in fullscreen ${altTexts[index]}`}
            style={{ height: '100%', width: '100%', objectFit: 'cover' }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  </Box>
);
export const defaultProps: NSCarousel.Props = {
  bounded: undefined,
  zoom: true,
  zoomWidth: 1000,
  indicators: 'default',
  duration: undefined,
  step: undefined,
  defaultIndex: undefined,
  index: undefined,
};

Demo.defaultProps = defaultProps;

export default Demo;
