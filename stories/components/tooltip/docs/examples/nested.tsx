import { Box, Flex } from '@semcore/ui/base-components';
import { ButtonLink } from '@semcore/ui/button';
import Tooltip from '@semcore/ui/tooltip';
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
