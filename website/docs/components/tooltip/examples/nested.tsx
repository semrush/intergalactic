import React from 'react';
import Tooltip from 'intergalactic/tooltip';
import { Box, Flex } from 'intergalactic/flex-box';
import { ButtonLink } from 'intergalactic/button';

const Demo = () => (
  <Flex>
    <Box m='auto' p={5}>
      <Tooltip>
        <Tooltip.Trigger aria-describedby={undefined} role={undefined}>
          {({ popperId }) => <ButtonLink aria-describedby={popperId}>Tooltip trigger</ButtonLink>}
        </Tooltip.Trigger>
        <Tooltip.Popper>Hello, stranger!</Tooltip.Popper>
      </Tooltip>
    </Box>
  </Flex>
);

export default Demo;
