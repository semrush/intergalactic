import { ButtonLink } from '@semcore/button';
import { Box, Flex } from '@semcore/flex-box';
import Tooltip from '@semcore/tooltip';
import React from 'react';

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
