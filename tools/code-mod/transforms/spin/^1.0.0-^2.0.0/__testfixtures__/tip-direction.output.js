import React from 'react';
import Spin from '@semcore/spin';

import { Flex } from "@semcore/flex-box";
import { Text } from "@semcore/typography";

export default () => [
  <Flex inline alignItems="center" justifyContent="center"><Spin size="xxs" /><Text size={200} color="gray60" tag="p" ml={1}>Loading...</Text></Flex>,
  <Flex inline alignItems="center" justifyContent="center"><Spin size="l" /><Text size={200} color="gray60" tag="p" ml={2}>Loading...</Text></Flex>,
  <Flex inline alignItems="center" justifyContent="center"><Spin size="xl" /><Text size={200} color="gray60" tag="p" ml={4}>Loading...</Text></Flex>,
  <Flex inline alignItems="center" justifyContent="center" direction="column"><Spin size="xxs" /><Text size={200} color="gray60" tag="p" mt={1}>Loading...</Text></Flex>,
  <Flex inline alignItems="center" justifyContent="center" direction="column"><Spin size="l" /><Text size={200} color="gray60" tag="p" mt={2}>Loading...</Text></Flex>,
  <Flex inline alignItems="center" justifyContent="center" direction="column"><Spin size="xl" /><Text size={200} color="gray60" tag="p" mt={2}>Loading...</Text></Flex>,
];
