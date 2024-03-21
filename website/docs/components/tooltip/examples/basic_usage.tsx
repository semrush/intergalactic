import React from 'react';
import Tooltip, { Hint, DescriptionTooltip } from 'intergalactic/tooltip';
import { Box, Flex } from 'intergalactic/flex-box';
import { Text } from 'intergalactic/typography';
import Link from 'intergalactic/link';
import Button from 'intergalactic/button';

const Demo = () => (
  <Flex gap={4} flexWrap>
    <Hint title='Hint may contain short text only.' tag={Link}>
      Hint
    </Hint>
    <Tooltip>
      <Tooltip.Trigger tag={Link}>Tooltip</Tooltip.Trigger>
      <Tooltip.Popper>
        Default tooltip may contain formatted tex, icons,{' '}
        <Link href='https://semrush.com'>links</Link> and other elements. Be brief, add only one
        sentence for its content.
      </Tooltip.Popper>
    </Tooltip>
    <DescriptionTooltip>
      <DescriptionTooltip.Trigger tag={Button}>Additional information</DescriptionTooltip.Trigger>
      <DescriptionTooltip.Popper>
        <Text size={200} bold>
          Additional information
        </Text>
        <Box my={2}>
          Use this tooltip type for elements that already have a visible name, and you need to show
          a lot of additional information.
        </Box>
        <Box mb={2}>
          It may contain several paragraphs and interactive elements (for example,{' '}
          <Link href='https://semrush.com'>links</Link>).
        </Box>
      </DescriptionTooltip.Popper>
    </DescriptionTooltip>
    <input />
  </Flex>
);

export default Demo;
