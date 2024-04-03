import React from 'react';
import Switch from 'intergalactic/switch';
import CheckM from 'intergalactic/icon/Check/m';
import { Text } from 'intergalactic/typography';
import { Box } from 'intergalactic/flex-box';

const Demo = () => {
  return (
    <div>
      <Text tag='label' size={200} htmlFor='recieve-updates'>
        Receive updates
      </Text>
      <Box mt={2}>
        <Switch size='l'>
          <Switch.Addon>Disabled</Switch.Addon>
          <Switch.Value defaultChecked={true} id='recieve-updates'>
            <CheckM />
          </Switch.Value>
          <Switch.Addon>Enabled</Switch.Addon>
        </Switch>
      </Box>
    </div>
  );
};

export default Demo;
