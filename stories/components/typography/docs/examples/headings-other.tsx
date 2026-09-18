import { Flex } from '@semcore/ui/base-components';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => (
  <Flex direction='column'>
    <Text size={400} mb={2} mt={0} semibold>
      20px / --fs-400,--lh-400
    </Text>
    <Text size={350} mb={3} mt={0} semibold>
      18px / --fs-350,--lh-350
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
