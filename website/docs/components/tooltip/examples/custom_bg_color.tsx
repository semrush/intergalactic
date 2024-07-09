import React from 'react';
import Tooltip from 'intergalactic/tooltip';
import { Flex, Box } from 'intergalactic/flex-box';
import Link from 'intergalactic/link';

const Demo = () => (
  <Flex gap={4} direction='column'>
    <Flex gap={4} alignItems='center'>
      Tooltip:
      <Tooltip>
        <Tooltip.Trigger tag={Link} href='https://google.com'>
          Keywords
        </Tooltip.Trigger>
        <Tooltip.Popper arrowBgColor={'red'} arrowShadowColor={'blue'} p={0}>
          <Box style={{ background: 'red' }} p={3}>
            Default tooltip contains short text explaining something about the trigger.
          </Box>
        </Tooltip.Popper>
      </Tooltip>
    </Flex>
  </Flex>
);

export default Demo;
