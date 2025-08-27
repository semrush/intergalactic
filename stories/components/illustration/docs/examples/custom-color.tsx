import { Flex } from '@semcore/base-components';
import Congrats from '@semcore/illustration/Congrats';
import MailSent from '@semcore/illustration/MailSent';
import React from 'react';

const Demo = () => {
  return (
    <Flex gap={5}>
      <MailSent />
      <MailSent primaryColor='--intergalactic-illustration-pink' />
      <MailSent primaryColor='--intergalactic-illustration-violet' />
      <Congrats primaryColor='--intergalactic-illustration-yellow' secondaryColor='#000' />
    </Flex>
  );
};

export default Demo;
