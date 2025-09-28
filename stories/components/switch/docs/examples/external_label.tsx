import CheckM from '@semcore/icon/Check/m';
import CloseM from '@semcore/icon/Close/m';
import { Box, Flex } from '@semcore/ui/base-components';
import Switch from '@semcore/ui/switch';
import { Text } from '@semcore/ui/typography';
import React from 'react';

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
