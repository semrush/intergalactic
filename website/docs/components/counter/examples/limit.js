import React from 'react';
import { Text } from '@semcore/typography';
import { Box, Flex } from '@semcore/flex-box';
import ProgressBar from '@semcore/progress-bar';
import WarningXS from '@semcore/icon/Warning/m';

export default () => (
  <Flex direction="column" w={350}>
    <Flex mb={1} justifyContent="space-between">
      <Text size={100}>SEO Ideas Units</Text>
      <Flex alignItems="center">
        <WarningXS color="orange" />
        <Text size={100} ml={1} bold>
          10<Text color="gray60">/10</Text>
        </Text>
      </Flex>
    </Flex>
    <ProgressBar theme="orange" size="s" />
  </Flex>
);
