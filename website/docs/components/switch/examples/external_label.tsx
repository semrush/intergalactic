import React from 'react';
import Switch from '@semcore/switch';
import CheckM from '@semcore/icon/Check/m';
import { Text } from '@semcore/typography';
import { Box, Flex } from '@semcore/flex-box';

const Demo = () => {
  return (
    <Flex gap={2} alignItems='center'>
      <Text tag='label' size={200} htmlFor='email-subscription'>
        Email subscription
      </Text>
      <Box>
        <Switch size='l' theme='success'>
          <Switch.Value id='email-subscription' mt={0}>
            <CheckM />
          </Switch.Value>
        </Switch>
      </Box>
    </Flex>
  );
};

export default Demo;
