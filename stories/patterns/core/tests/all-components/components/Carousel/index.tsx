import { Flex } from '@semcore/ui/base-components';
import Card from '@semcore/ui/card';
import { Text } from '@semcore/ui/typography';
import React from 'react';

import CarouselStory from '../../../../../../components/carousel/docs/examples/carousel_with_default_indicators';

export function Carousel() {
  return (
    <Card mt={8}>
      <Card.Body>
        <Flex>
          <CarouselStory />

          <Text>
            Description of carousel...
          </Text>
        </Flex>
      </Card.Body>
    </Card>
  );
}
