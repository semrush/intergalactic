import React from 'react';
import { ButtonTrigger } from 'intergalactic/base-trigger';
import Dropdown from 'intergalactic/dropdown';

const Demo = () => (
  <Dropdown>
    <Dropdown.Trigger tag={ButtonTrigger}>Trigger</Dropdown.Trigger>
    <Dropdown.Popper p={4}>Content</Dropdown.Popper>
  </Dropdown>
);

export default Demo;
