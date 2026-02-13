import WhatsAppL from '@semcore/icon/color/WhatsApp/l';
import WhatsAppM from '@semcore/icon/color/WhatsApp/m';
import { Flex, Box } from '@semcore/ui/base-components';
import React from 'react';

const Demo = () => {
  return (
    <>
      <Flex columnGap={2} mb={4}>
        <Box title='ColorM neutral'>
          <WhatsAppM color='icon-secondary-neutral' />
        </Box>

        <Box title='ColorL neutral'>
          <WhatsAppL color='icon-secondary-neutral' />
        </Box>
      </Flex>
    </>
  );
};

export default Demo;
