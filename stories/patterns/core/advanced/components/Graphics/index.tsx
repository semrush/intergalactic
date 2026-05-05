import { Box, Flex } from '@semcore/ui/flex-box';
import Card from '@semcore/ui/card';
import React from 'react';

import IconWithAllColorsExample from '../../../../../components/icon/advanced/examples/icon-all-colors';
import IllustrationCustomColorExample from '../../../../../components/illustration/docs/examples/custom-color';

export function Graphics() {
  return (
    <Flex mt={8} gap={4} alignItems='stretch' w='100%' flexWrap>
      <Box flex='1 1 0' wMin={280}>
        <Card tag='section' w='100%'>
          <Card.Header>
            <Card.Title tag='h3'>Icons</Card.Title>
          </Card.Header>
          <Card.Body>
            <IconWithAllColorsExample />
          </Card.Body>
        </Card>
      </Box>
      <Box flex='1 1 0' wMin={280}>
        <Card tag='section' w='100%'>
          <Card.Header>
            <Card.Title tag='h3'>Illustrations</Card.Title>
          </Card.Header>
          <Card.Body>
            <IllustrationCustomColorExample />
          </Card.Body>
        </Card>
      </Box>
    </Flex>
  );
}
