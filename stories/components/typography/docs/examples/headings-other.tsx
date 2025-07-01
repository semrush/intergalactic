import { Flex } from '@semcore/base-components';
import { Text } from '@semcore/typography';
import React from 'react';

const Demo = () => (
  <Flex direction='column'>
    <Text size={400} mb={2} mt={0} semibold>
      20px / --fs-400,--lh-400
    </Text>
    <Text size={300} mb={1} mt={0} bold>
      16px / --fs-300,--lh-300
    </Text>
    <Text size={200} mb={1} mt={0} bold>
      14px / --fs-200,--lh-200
    </Text>
  </Flex>
);

export default Demo;
