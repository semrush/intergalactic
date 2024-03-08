import React from 'react';
import Counter from 'intergalactic/counter';
import Button from 'intergalactic/button';
import SettingsM from 'intergalactic/icon/Settings/m';

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
