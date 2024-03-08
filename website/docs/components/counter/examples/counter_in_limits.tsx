import React from 'react';
import { Text } from 'intergalactic/typography';
import { Flex } from 'intergalactic/flex-box';
import ProgressBar from 'intergalactic/progress-bar';
import WarningM from 'intergalactic/icon/Warning/m';

const Demo = () => (
  <Flex direction='column' w={350}>
    <Flex mb={1} justifyContent='space-between'>
      <Text size={200}>SEO Ideas Units</Text>
      <Flex alignItems='center'>
        <WarningM color='icon-primary-warning' />
        <Text size={200} ml={1} bold>
          10<Text color='text-secondary'>/10</Text>
        </Text>
      </Flex>
    </Flex>
    <ProgressBar theme='bg-primary-warning' size='s' />
  </Flex>
);

export default Demo;
