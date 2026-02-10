import WhatsAppL from '@semcore/icon/color/WhatsApp/l';
import WhatsAppM from '@semcore/icon/color/WhatsApp/m';
import { Flex } from '@semcore/ui/base-components';
import { Hint } from '@semcore/ui/tooltip';
import React from 'react';

const Demo = () => {
  return (
    <>
      <Flex columnGap={2} mb={4}>
        <Hint title='ColorM neutral'>
          <WhatsAppM color='icon-secondary-neutral' />
        </Hint>

        <Hint title='ColorL neutral'>
          <WhatsAppL color='icon-secondary-neutral' />
        </Hint>
      </Flex>
    </>
  );
};

export default Demo;
