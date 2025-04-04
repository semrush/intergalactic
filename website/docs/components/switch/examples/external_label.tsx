import React from 'react';
import Switch from 'intergalactic/switch';
import CheckM from 'intergalactic/icon/Check/m';
import CloseM from 'intergalactic/icon/Close/m';
import { Text } from 'intergalactic/typography';
import { Box, Flex } from 'intergalactic/flex-box';

const Demo = () => {
  const [value, setValue] = React.useState(true);
  return (
    <Flex gap={2} alignItems='center'>
      <Text tag='label' size={200} htmlFor='email-subscription'>
        Email subscription
      </Text>
      <Box>
        <Switch size='l' theme='success'>
          <Switch.Value id='email-subscription' checked={value} onChange={setValue}>
            {value ? <CheckM /> : <CloseM />}
          </Switch.Value>
        </Switch>
      </Box>
    </Flex>
  );
};

export default Demo;
