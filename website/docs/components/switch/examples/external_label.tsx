import React from 'react';
import Switch from 'intergalactic/switch';
import CheckM from 'intergalactic/icon/Check/m';
import { Text } from 'intergalactic/typography';
import { Box, Flex } from 'intergalactic/flex-box';

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
