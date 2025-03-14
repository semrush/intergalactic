import React from 'react';
import { Hint } from '@semcore/tooltip';
import ArrowsM from '@semcore/icon/Arrows/m';
import ArrowsL from '@semcore/icon/Arrows/l';
import MailFilledM from '@semcore/icon/MailFilled/m'
import MailFilledL from '@semcore/icon/MailFilled/l'
import { Flex } from '@semcore/flex-box';


const Demo = () => {
    return (
        <>
            <Flex columnGap={2} mb={4}>
            <Hint
    tag={ArrowsM}
    interactive
    title='Icon RegularM Interactive'
    color='icon-secondary-neutral'
  />

            <Hint
    tag={ArrowsL}
    interactive
    title='Icon RegularL Interative'
    color='icon-secondary-neutral'
  />

<Hint
    tag={MailFilledM}
    title='Icon ColoredM Non Interactive'
     color='text-critical'
  />
  
  <Hint
    tag={MailFilledL}
    title='Icon ColoredL Non Interactive'
     color='text-critical'
  />
            </Flex>
        </>
    );
};

export default Demo;
