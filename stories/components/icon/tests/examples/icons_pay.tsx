import AmericanExpressL from '@semcore/icon/pay/AmericanExpress/l';
import AmericanExpressM from '@semcore/icon/pay/AmericanExpress/m';
import PayPalL from '@semcore/icon/pay/PayPal/l';
import PayPalM from '@semcore/icon/pay/PayPal/m';
import { Flex } from '@semcore/ui/base-components';
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
