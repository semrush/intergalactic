import React from 'react';
import { ButtonTrigger } from '@semcore/ui/base-trigger';
import Dropdown from '@semcore/ui/dropdown';

const Demo = () => (
  <Dropdown interaction={'focus'}>
    <Dropdown.Trigger tag={ButtonTrigger}>Trigger</Dropdown.Trigger>
    <Dropdown.Popper p={4}>Content</Dropdown.Popper>
  </Dropdown>
);
