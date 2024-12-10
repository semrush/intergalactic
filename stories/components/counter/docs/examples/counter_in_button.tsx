import React from 'react';
import Counter from '@semcore/counter';
import Button from '@semcore/button';
import SettingsM from '@semcore/icon/Settings/m';

const Demo = () => (
  <>
    <Button mr={4}>
      <Button.Addon>
        <SettingsM />
      </Button.Addon>
      <Button.Text>Manage columns</Button.Text>
      <Button.Addon>
        <Counter>23</Counter>
      </Button.Addon>
    </Button>
    <Button use='primary'>
      <Button.Addon>
        <SettingsM />
      </Button.Addon>
      <Button.Text>Manage columns</Button.Text>
      <Button.Addon>
        <Counter theme='bg-primary-neutral'>23</Counter>
      </Button.Addon>
    </Button>
  </>
);

export default Demo;
