import React from 'react';
import MailSent from 'intergalactic/illustration/MailSent';
import Congrats from 'intergalactic/illustration/Congrats';
import { Flex } from 'intergalactic/flex-box';

const Demo = () => {
  return (
    <Flex gap={5}>
      <MailSent />
      <MailSent primaryColor='#ff7ad1' />
      <MailSent primaryColor='violet-300' />
      <Congrats primaryColor='#ff7ad1' secondaryColor='#000' />
    </Flex>
  );
};

export default Demo;
