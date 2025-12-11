import { Box, Flex } from '@semcore/ui/base-components';
import Carousel from '@semcore/ui/carousel';
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

const Demo = () => (
  <Carousel w={width} aria-label='Beauty of Nature'>
    <>
      <Flex>
        <Carousel.ContentBox>
          <Carousel.Container>
            {images.map((url, index) => (
              <Carousel.Item key={url} w={imageWidth}>
                <img

                  role='button'
                  src={url}
                  alt={altTexts[index]}
                  aria-label={`Open in fullscreen ${altTexts[index]}`}
                  style={{ width: '100%' }}
                />
              </Carousel.Item>
            ))}
          </Carousel.Container>
        </Carousel.ContentBox>
      </Flex>
      <Carousel.Indicators />
    </>
  </Carousel>
);

export default Demo;
