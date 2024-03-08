import React from 'react';
import Tooltip, { Hint, InformationDropdown } from 'intergalactic/tooltip';
import { Box, Flex } from 'intergalactic/flex-box';
import { Text } from 'intergalactic/typography';
import Link from 'intergalactic/link';

const Demo = () => (
  <Flex gap={4} flexWrap>
    <Hint title='Hint may contain short text only.' tag={Link}>
      Hint
    </Hint>
    <Tooltip>
      <Tooltip.Trigger tag={Link}>Tooltip</Tooltip.Trigger>
      <Tooltip.Popper>
        Tooltip may contain icons, <Link href='https://semrush.com'>links</Link> and other elements.
        Be brief, add only one sentence for its content.
      </Tooltip.Popper>
    </Tooltip>
    <InformationDropdown>
      <InformationDropdown.Trigger tag={Link}>Information dropdown</InformationDropdown.Trigger>
      <InformationDropdown.Popper>
        <Text size={200} bold>
          Information dropdown
        </Text>
        <Box my={2}>Use it to show a lot of content.</Box>
        <Box mb={2}>It may contain several paragraphs, and interactive elements.</Box>
        <Box>
          Use this tooltip type for elements that already have a visible name, but need to tell the
          user additional information.
        </Box>
      </InformationDropdown.Popper>
    </InformationDropdown>
    <input />
  </Flex>
);

export default Demo;
