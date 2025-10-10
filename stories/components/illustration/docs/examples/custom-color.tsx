import { Flex } from '@semcore/ui/base-components';
import Congrats from '@semcore/ui/illustration/Congrats';
import MailSent from '@semcore/ui/illustration/MailSent';
import React from 'react';

const Demo = () => {
  return (
    <Flex gap={5} direction='column'>
      <Flex gap={2}>
        <MailSent />
        <MailSent primaryColor='illustration-salad' />
        <MailSent primaryColor='illustration-blue' />
        <MailSent primaryColor='illustration-orange' />
      </Flex>
      <Flex gap={2}>
        <Congrats primaryColor='illustration-red' secondaryColor='#000' />
        <Congrats primaryColor='illustration-pink' secondaryColor='#000' />
        <Congrats primaryColor='illustration-violet' secondaryColor='#000' />
        <Congrats primaryColor='illustration-yellow' secondaryColor='#000' />
      </Flex>
    </Flex>
  );
};

export default Demo;
