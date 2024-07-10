import React from 'react';
import MailSent from 'intergalactic/illustration/MailSent';
import { Flex } from 'intergalactic/flex-box';

const Demo = () => {
  return (
    <Flex gap={5}>
      <MailSent />
      <MailSent color='#ff7ad1' />
      <MailSent color='violet-300' />
    </Flex>
  );
};

export default Demo;
