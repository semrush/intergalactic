import { Flex } from '@semcore/ui/base-components';
import { ButtonLink } from '@semcore/ui/button';
import WhatsAppL from '@semcore/ui/icon/color/WhatsApp/l';
import WhatsAppM from '@semcore/ui/icon/color/WhatsApp/m';
import React from 'react';

const Demo = () => {
  return (
    <>
      <Flex columnGap={2} mb={4}>
        <ButtonLink
          addonLeft={WhatsAppM}
          title='ColorM neutral'
          color='icon-secondary-neutral'
        />

        <ButtonLink
          addonLeft={WhatsAppL}
          title='ColorL neutral'
          color='icon-secondary-neutral'
        />
      </Flex>
    </>
  );
};

export default Demo;
