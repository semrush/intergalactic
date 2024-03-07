import React from 'react';
import Tooltip, { Hint, InformationDropdown } from 'intergalactic/tooltip';
import { Box, Flex } from 'intergalactic/flex-box';
import { Text } from 'intergalactic/typography';
import Link from 'intergalactic/link';

const Demo = () => (
  <Flex gap={4} flexWrap>
    <Hint title='Hint may contain short text only' tag={Link}>
      Hint
    </Hint>
    <Tooltip>
      <Tooltip.Trigger tag={Link}>Tooltip</Tooltip.Trigger>
      <Tooltip.Popper>
        Tooltip may contain icons, <Link href='https://semrush.com'>links</Link> and other elements.
        On the other hand, it's content shouldn't be too long.
      </Tooltip.Popper>
    </Tooltip>
    <InformationDropdown>
      <InformationDropdown.Trigger tag={Link}>Information dropdown</InformationDropdown.Trigger>
      <InformationDropdown.Popper>
        <Text size={400}>Information dropdown</Text>
        <Box my={2}>
          Information dropdown should be used when a lot of content is needed to be displayed.
        </Box>
        <Box mb={2}>It may contain many paragraphs, and many interactive element</Box>
        <Box>
          Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing
          industries for previewing layouts and visual mockups.
        </Box>
      </InformationDropdown.Popper>
    </InformationDropdown>
    <input />
  </Flex>
);

export default Demo;
