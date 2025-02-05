import React from 'react';
import Button, { ButtonLink } from '@semcore/button';
import { Hint } from '@semcore/tooltip';
import PayPalM from '@semcore/icon/pay/PayPal/m';
import PayPalL from '@semcore/icon/pay/PayPal/l';
import { Flex } from '@semcore/flex-box';
import AmericanExpressM from '@semcore/icon/pay/AmericanExpress/m'
import AmericanExpressL from '@semcore/icon/pay/AmericanExpress/l'


const Demo = () => {
    return (
        <>
            <Flex columnGap={2} mb={4}>


<Hint
    tag={PayPalM}
    interactive
    title='PayM interactive'
    color='icon-secondary-neutral'
  />

<Hint
    tag={PayPalL}
    interactive
    title='PayL interactive'
    color='icon-secondary-neutral'
  />

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
