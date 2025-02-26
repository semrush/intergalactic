import React from 'react';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

const Demo = () => (
  <Flex direction='column'>
    <Text size={800} mb={6} mt={0} semibold>
      48px / --fs-800,--lh-800
    </Text>
    <Text size={700} mb={4} mt={0} semibold>
      36px / --fs-700,--lh-700
    </Text>
    <Text size={600} mb={4} mt={0} semibold>
      32px / --fs-600,--lh-600
    </Text>
    <Text size={500} mb={3} mt={0} semibold>
      24px / --fs-500,--lh-500
    </Text>
  </Flex>
);

export default Demo;
