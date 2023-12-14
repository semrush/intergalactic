import React from 'react';
import { ButtonTrigger } from '@semcore/ui/base-trigger';
import Dropdown from '@semcore/ui/dropdown';

export default () => (
  <Dropdown interaction={'focus'}>
    <Dropdown.Trigger tag={ButtonTrigger}>Trigger</Dropdown.Trigger>
    <Dropdown.Popper p={4}>Content</Dropdown.Popper>
  </Dropdown>
);
