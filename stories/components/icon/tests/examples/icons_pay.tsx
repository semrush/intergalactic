import { Flex } from '@semcore/ui/base-components';
import AmericanExpressL from '@semcore/ui/icon/pay/AmericanExpress/l';
import AmericanExpressM from '@semcore/ui/icon/pay/AmericanExpress/m';
import PayPalL from '@semcore/ui/icon/pay/PayPal/l';
import PayPalM from '@semcore/ui/icon/pay/PayPal/m';
import { Hint } from '@semcore/ui/tooltip';
import React from 'react';

const Demo = () => {
  return (
    <>
      <Flex columnGap={2} mb={4}>
        <Hint
          tag={PayPalM}
          title='PayM neutral'
          color='icon-secondary-neutral'
        />

        <Hint
          tag={PayPalL}
          title='PayL neutral'
          color='icon-secondary-neutral'
        />
      </Flex>
    </>
  );
};

export default Demo;
