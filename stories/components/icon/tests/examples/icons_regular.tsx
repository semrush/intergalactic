import { Flex } from '@semcore/flex-box';
import ArrowsL from '@semcore/icon/Arrows/l';
import ArrowsM from '@semcore/icon/Arrows/m';
import MailFilledL from '@semcore/icon/MailFilled/l';
import MailFilledM from '@semcore/icon/MailFilled/m';
import { Hint } from '@semcore/tooltip';
import React from 'react';

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
