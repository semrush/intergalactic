import React from 'react';
import Card from '@semcore/card';
import { Text } from '@semcore/typography';
import { Flex } from '@semcore/flex-box';
import SettingsS from '@semcore/icon/lib/Settings/s';
import Divider from '@semcore/divider';

const TooltipContent = `Hey! Don't forget to place some useful info here 😏`;

export default () => (
  <Card>
    <Flex mb={2} alignItems="center">
      <Card.Title hint={TooltipContent}>Card heading</Card.Title>
      <SettingsS color="stone" ml="auto" interactive />
    </Flex>
    <Card.Description>This is card additional information or insights.</Card.Description>
    <Divider orientation="horizontal" mb={5} ml={-5} w={`calc(100% + 40px)`} />
    <Text size={100}>Your awesome card content ✨</Text>
  </Card>
);
