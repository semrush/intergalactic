import React from 'react';
import Switch from '@semcore/ui/switch';
import CheckM from '@semcore/ui/icon/Check/m';
import { Text } from '@semcore/ui/typography';
import { Box } from '@semcore/ui/flex-box';

const Demo = () => {
  return (
    <div>
      <Text tag='label' size='200' htmlFor='email-subscription'>
        Email subscription
      </Text>
      <Box mt={2}>
        <Switch size='l' theme='success'>
          <Switch.Value defaultChecked={true} id='email-subscription'>
            <CheckM />
          </Switch.Value>
          <Switch.Addon>Receive updates</Switch.Addon>
        </Switch>
      </Box>
    </div>
  );
};

export default Demo;
