import React from 'react';
import Counter from '@semcore/counter';
import Button from '@semcore/button';
import SettingsXS from '@semcore/icon/Settings/m';

export default () => (
  <>
    <Button mr={4}>
      <Button.Addon>
        <SettingsXS />
      </Button.Addon>
      <Button.Text>Manage columns</Button.Text>
      <Button.Addon>
        <Counter>23</Counter>
      </Button.Addon>
    </Button>
    <Button use="primary">
      <Button.Addon>
        <SettingsXS />
      </Button.Addon>
      <Button.Text>Manage columns</Button.Text>
      <Button.Addon>
        <Counter theme="white">23</Counter>
      </Button.Addon>
    </Button>
  </>
);
