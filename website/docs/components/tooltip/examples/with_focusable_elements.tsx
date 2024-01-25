import React from 'react';
import Tooltip from '@semcore/ui/tooltip';
import { Box, Flex } from '@semcore/ui/flex-box';
import Link from '@semcore/ui/link';

const Demo = () => (
  <Flex gap={10} flexWrap>
    <Link>Normal link before tooltip</Link>
    <Tooltip>
      <Tooltip.Trigger>
        <Link>Link with tooltip</Link>
      </Tooltip.Trigger>
      <Tooltip.Popper>
        For more information, see the <Link href='#'>link</Link>
      </Tooltip.Popper>
    </Tooltip>
    <Link>Normal link after tooltip</Link>
  </Flex>
);

export default Demo;
