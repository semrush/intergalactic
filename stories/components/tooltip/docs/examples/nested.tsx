import React from 'react';
import Tooltip from '@semcore/tooltip';
import { Box, Flex } from '@semcore/flex-box';
import { ButtonLink } from '@semcore/button';

const Demo = () => (
  <Flex>
    <Box m='auto' p={5}>
      <Tooltip>
        <Tooltip.Trigger aria-describedby={undefined}>
          {({ popperId }) => <ButtonLink aria-describedby={popperId}>Tooltip trigger</ButtonLink>}
        </Tooltip.Trigger>
        <Tooltip.Popper>Hello, stranger!</Tooltip.Popper>
      </Tooltip>
    </Box>
  </Flex>
);

export default Demo;
