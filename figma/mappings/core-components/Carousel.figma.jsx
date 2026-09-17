import figma from '@figma/code-connect/react';
import Carousel from '@semcore/ui/carousel';
import { Flex } from '@semcore/ui/flex-box';

figma.connect(
  Carousel,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=56115-292306&t=7CEXrbu9XEfMUFlr-11',
  {
    variant: { 'screen width': '>480px' },
    props: {
      zoom: figma.boolean('zoom'),
      indicators: figma.enum('indicators', {
        default: 'default',
        hide: 'hide',
        preview: 'preview',
      }),
    },

    example: ({ zoom, indicators }) => (
      <Carousel
        w={/* Set width */}
        aria-roledescription='carousel'
        aria-label={/* Set aria-label for the Carousel */}
        zoom={zoom}
        zoomWidth={/* Set zoom width */}
        indicators={indicators}
      >
        {/* Add items here */}
      </Carousel>
    ),
  },
);

figma.connect(
  Carousel,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=56115-292306&t=7CEXrbu9XEfMUFlr-11',
  {
    variant: { 'screen width': '≤480px' },
    props: {
      zoom: figma.boolean('zoom'),
    },

    example: () => (
      <Carousel>
        <Carousel.Container>

          {/* Add items here */}
        </Carousel.Container>
        <Flex gap={2}>
          <Carousel.Prev />
          <Carousel.Next />
        </Flex>
      </Carousel>
    ),
  },
);
