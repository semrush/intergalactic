import { Flex } from '@semcore/ui/base-components';
import AmazonL from '@semcore/ui/icon/color/Amazon/l';
import AmazonM from '@semcore/ui/icon/color/Amazon/m';
import WhatsAppL from '@semcore/ui/icon/color/WhatsApp/l';
import WhatsAppM from '@semcore/ui/icon/color/WhatsApp/m';
import { Hint } from '@semcore/ui/tooltip';
import React from 'react';

const Demo = () => {
  return (
    <>
      <Flex columnGap={2} mb={4}>
        <Hint
          tag={WhatsAppM}
          interactive
          title='ColorM neutral'
          color='icon-secondary-neutral'
        />

        <Hint
          tag={WhatsAppL}
          interactive
          title='ColorL neutral'
          color='icon-secondary-neutral'
        />
      </Flex>
    </>
  );
};

export default Demo;
