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
          title='ColorM interactive'
          color='icon-secondary-neutral'
        />

        <Hint
          tag={WhatsAppL}
          interactive
          title='ColorL interactive'
          color='icon-secondary-neutral'
        />

        <Hint tag={AmazonM} title='AmazonM non interactive' color='icon-secondary-neutral' />

        <Hint tag={AmazonL} title='AmazonL non interactive' color='icon-secondary-neutral' />
      </Flex>
    </>
  );
};

export default Demo;
