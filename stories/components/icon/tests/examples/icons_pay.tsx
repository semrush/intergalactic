import Button, { ButtonLink } from '@semcore/ui/button';
import { Flex } from '@semcore/ui/flex-box';
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
        <Hint tag={PayPalM} interactive title='PayM interactive' color='icon-secondary-neutral' />

        <Hint tag={PayPalL} interactive title='PayL interactive' color='icon-secondary-neutral' />

        <Hint
          tag={AmericanExpressM}
          title='AmericanExpressM non interactive'
          color='icon-secondary-neutral'
        />

        <Hint
          tag={AmericanExpressL}
          title='AmericanExpressL non interactive'
          color='icon-secondary-neutral'
        />
      </Flex>
    </>
  );
};

export default Demo;
