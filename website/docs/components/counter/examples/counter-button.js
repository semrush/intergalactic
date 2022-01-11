import React from 'react';
import Counter from '@semcore/counter';
import Button from '@semcore/button';
import SettingsXS from '@semcore/icon/lib/Settings/m';

export default () => (
  <>
    <Button mr={4}>
      <Button.Addon tag={SettingsXS} />
      <Button.Text>Manage columns</Button.Text>
      <Button.Addon tag={Counter}>23</Button.Addon>
    </Button>
    <Button use="primary">
      <Button.Addon tag={SettingsXS} />
      <Button.Text>Manage columns</Button.Text>
      <Button.Addon>
        <Counter theme="white">23</Counter>
      </Button.Addon>
    </Button>
  </>
);
