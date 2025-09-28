import Congrats from '@semcore/illustration/Congrats';
import MailSent from '@semcore/illustration/MailSent';
import Button from '@semcore/ui/button';
import { Flex } from '@semcore/ui/flex-box';
import React from 'react';

const Demo = () => {
  return (
    <Flex gap={5}>
      <MailSent height={40} width={40} />
      <MailSent primaryColor='#ff7ad1' />
      <Congrats primaryColor='#ff7ad1' secondaryColor='#000' height={140} width={140} />
    </Flex>
  );
};

export default Demo;
