import ArrowsL from '@semcore/icon/Arrows/l';
import ArrowsM from '@semcore/icon/Arrows/m';
import MailFilledL from '@semcore/icon/MailFilled/l';
import MailFilledM from '@semcore/icon/MailFilled/m';
import { Flex, Box } from '@semcore/ui/base-components';
import { Hint } from '@semcore/ui/tooltip';
import React from 'react';

const Demo = () => {
  return (
    <>
      <Flex columnGap={2} mb={4}>
        <Box title='Icon neutralM'>
          <ArrowsM color='icon-secondary-neutral' />
        </Box>

        <Box title='Icon neutraL'>
          <ArrowsL color='icon-secondary-neutral' />
        </Box>

        <Box title='Icon ColoredM'>
          <MailFilledM color='text-critical' />
        </Box>

        <Box title='Icon ColoredL'>
          <MailFilledL color='text-critical' />
        </Box>

      </Flex>
    </>
  );
};

export default Demo;
