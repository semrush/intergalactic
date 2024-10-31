import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import Carousel from '@semcore/carousel';
import { Box, Flex } from '@semcore/flex-box';

const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel',
  component: Carousel,
  parameters: {},
};

export default meta;
type Story = StoryObj<typeof Carousel>;

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

export const CarouselWithDefaultIndicators: Story = {
  render: (props) => {
    return (
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
  },
};

export const CarouselWithPreviewIndicators: Story = {
  render: () => {
    return (
      <Carousel
        w={width}
        aria-roledescription='carousel'
        aria-label='Beauty of Nature'
        zoom={true}
        zoomWidth={1000}
        indicators='preview'
      >
        {images.map((url, index) => (
          <Carousel.Item key={url} w={imageWidth}>
            <img
              // biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole:
              role='button'
              src={url}
              alt={altTexts[index]}
              aria-label={`Open in fullscreen ${altTexts[index]}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    );
  },
};

export const CarouselWithoutModalWindow: Story = {
  render: () => {
    return (
      <Carousel
        w={width}
        aria-roledescription='carousel'
        aria-label='Beauty of Nature'
        indicators='preview'
      >
        {images.map((url, index) => (
          <Carousel.Item key={url} w={imageWidth}>
            <img
              // biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole:
              role='button'
              src={url}
              alt={altTexts[index]}
              aria-label={`Open in fullscreen ${altTexts[index]}`}
              style={{ height: '100%', objectFit: 'cover' }}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    );
  },
};

export const CarouselWithoutPrevNextButtons: Story = {
  render: () => {
    return (
      <Carousel w={width} aria-roledescription='carousel' aria-label='Beauty of Nature'>
        <>
          <Flex>
            <Box style={{ overflow: 'hidden', borderRadius: 6 }}>
              <Carousel.Container>
                {images.map((url, index) => (
                  <Carousel.Item key={url} w={imageWidth}>
                    <img
                      // biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole:
                      role='button'
                      src={url}
                      alt={altTexts[index]}
                      aria-label={`Open in fullscreen ${altTexts[index]}`}
                      style={{ width: '100%' }}
                    />
                  </Carousel.Item>
                ))}
              </Carousel.Container>
            </Box>
          </Flex>
          <Carousel.Indicators />
        </>
      </Carousel>
    );
  },
};

// export const HidingNestedElementsOnHiddenSlides: Story = {
//   render: () => {
//     return (

//     );
//   },
// };
