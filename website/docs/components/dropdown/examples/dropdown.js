import React from 'react';
import { ButtonTrigger } from '@semcore/base-trigger';
import Dropdown from '@semcore/dropdown';

export default () => (
  <Dropdown>
    <Dropdown.Trigger tag={ButtonTrigger}>Trigger</Dropdown.Trigger>
    <Dropdown.Popper p={4}>Content</Dropdown.Popper>
  </Dropdown>
);
