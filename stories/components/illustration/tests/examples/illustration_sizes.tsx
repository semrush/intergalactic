import React from 'react';
import MailSent from '@semcore/illustration/MailSent';
import Congrats from '@semcore/illustration/Congrats';
import { Flex } from '@semcore/flex-box';
import Button from '@semcore/button';

const Demo = () => {
  return (
    <Flex gap={5}>
      <MailSent height={40} width ={40}/>
      <MailSent primaryColor='#ff7ad1' />
      <Congrats primaryColor='#ff7ad1' secondaryColor='#000' height={140} width ={140}/>
    </Flex>
  );
};

export default Demo;
