import { Box, Flex } from '@semcore/base-components';
import { ButtonLink } from '@semcore/button';
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
