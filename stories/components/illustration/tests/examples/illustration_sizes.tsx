import Congrats from '@semcore/illustration/Congrats';
import MailSent from '@semcore/illustration/MailSent';
import { Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import React from 'react';

const Demo = () => {
  return (
    <Flex gap={5}>
      <MailSent height={40} width={40} />
      <MailSent primaryColor='illustration-violet' />
      <Congrats primaryColor='illustration-violet' secondaryColor='gray-800' height={140} width={140} />
    </Flex>
  );
};

export default Demo;
