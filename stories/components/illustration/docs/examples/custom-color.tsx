import { Flex } from '@semcore/base-components';
import Congrats from '@semcore/illustration/Congrats';
import MailSent from '@semcore/illustration/MailSent';
import React from 'react';

const Demo = () => {
  return (
    <Flex gap={5} direction='column'>
      <Flex gap={2}>
        <MailSent />
        <MailSent primaryColor='--intergalactic-illustration-salad' />
        <MailSent primaryColor='--intergalactic-illustration-blue' />
        <MailSent primaryColor='--intergalactic-illustration-orange' />
      </Flex>
      <Flex gap={2}>
        <Congrats primaryColor='--intergalactic-illustration-red' secondaryColor='#000' />
        <Congrats primaryColor='--intergalactic-illustration-pink' secondaryColor='#000' />
        <Congrats primaryColor='--intergalactic-illustration-violet' secondaryColor='#000' />
        <Congrats primaryColor='--intergalactic-illustration-yellow' secondaryColor='#000' />
      </Flex>
    </Flex>
  );
};

export default Demo;
