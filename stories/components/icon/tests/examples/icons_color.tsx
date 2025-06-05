import { Flex } from '@semcore/flex-box';
import AmazonL from '@semcore/icon/color/Amazon/l';
import AmazonM from '@semcore/icon/color/Amazon/m';
import WhatsAppL from '@semcore/icon/color/WhatsApp/l';
import WhatsAppM from '@semcore/icon/color/WhatsApp/m';
import { Hint } from '@semcore/tooltip';
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
