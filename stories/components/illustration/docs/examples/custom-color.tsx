import { Flex, Box } from '@semcore/base-components';
import Congrats from '@semcore/illustration/Congrats';
import MailSent from '@semcore/illustration/MailSent';
import React from 'react';

const Demo = () => {
  return (
    <Flex gap={5} direction='column'>
      <Box display='flex'>
        <MailSent />
        <MailSent primaryColor='--intergalactic-illustration-green' />
        <MailSent primaryColor='--intergalactic-illustration-blue' />
        <MailSent primaryColor='--intergalactic-illustration-orange' />
      </Box>
      <Box display='flex'>
        <Congrats primaryColor='--intergalactic-illustration-salmon' secondaryColor='#000' />
        <Congrats primaryColor='--intergalactic-illustration-pink' secondaryColor='#000' />
        <Congrats primaryColor='--intergalactic-illustration-violet' secondaryColor='#000' />
        <Congrats primaryColor='--intergalactic-illustration-yellow' secondaryColor='#000' />
      </Box>
    </Flex>
  );
};

export default Demo;
