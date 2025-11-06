import figma from '@figma/code-connect/react';
import Carousel from '@semcore/ui/carousel';
import { Flex } from '@semcore/ui/flex-box';

figma.connect(
  Carousel,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=55871-167&t=VrapxrPvWsgsOFY2-11',
  {
    variant: { 'screen width': '>480px' },
    props: {
      zoom: figma.boolean('zoom'),
      preview: figma.boolean('preview indicators'),
    },

    example: ( { zoom, preview } ) => (
        <Carousel
        w={/* Set width */}
        aria-roledescription='carousel'
        aria-label={/* Set aria-label for the Carousel */}
        zoom={zoom}
        zoomWidth={/* Set zoom width */}
        indicators={preview}
      >
          {/* Add items here */}
      </Carousel>
    ),
  },
);

figma.connect(
    Carousel,
    'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=55871-167&t=VrapxrPvWsgsOFY2-11',
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
        <Flex direction='row'>
          <Carousel.Prev  />
          <Carousel.Next />
        </Flex>
        </Carousel>
      ),
    },
  );