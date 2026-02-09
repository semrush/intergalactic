import PayPalL from '@semcore/icon/pay/PayPal/l';
import PayPalM from '@semcore/icon/pay/PayPal/m';
import { Flex, Box } from '@semcore/ui/base-components';
import React from 'react';

const Demo = () => {
  return (
    <>
      <Flex columnGap={2} mb={4}>
        <Box
          tag={PayPalM}
          title='PayM neutral'
          color='icon-secondary-neutral'
        />

        <Box
          tag={PayPalL}
          title='PayL neutral'
          color='icon-secondary-neutral'
        />
      </Flex>
    </>
  );
};

export default Demo;
