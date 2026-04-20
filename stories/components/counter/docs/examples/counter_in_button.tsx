import SettingsM from '@semcore/icon/Settings/m';
import Button from '@semcore/ui/button';
import Counter from '@semcore/ui/counter';
import React from 'react';

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
