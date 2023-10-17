import React from 'react';
import { Text } from '@semcore/ui/typography';
import { Flex } from '@semcore/ui/flex-box';
import ProgressBar from '@semcore/ui/progress-bar';
import WarningM from '@semcore/ui/icon/Warning/m';

export default () => (
  <Flex direction='column' w={350}>
    <Flex mb={1} justifyContent='space-between'>
      <Text size={100}>SEO Ideas Units</Text>
      <Flex alignItems='center'>
        <WarningM color='--intergalactic-bg-primary-warning' />
        <Text size={100} ml={1} bold>
          10<Text color='--intergalactic-text-secondary'>/10</Text>
        </Text>
      </Flex>
    </Flex>
    <ProgressBar theme='--intergalactic-bg-primary-warning' size='s' />
  </Flex>
);
