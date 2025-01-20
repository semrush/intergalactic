import React from 'react';
import Button from '@semcore/button';
import Dropdown from '@semcore/dropdown';
import { Text } from '@semcore/typography';

const Demo = () => (
  <Dropdown interaction={'focus'}>
    <Dropdown.Trigger id='dropdown-focus' tag={Button}>
      About export
    </Dropdown.Trigger>
    <Dropdown.Popper p={4} wMax={260} aria-labelledby='dropdown-focus'>
      <Text size={200}>You can export up to 300 records in CSV or PDF format.</Text>
    </Dropdown.Popper>
  </Dropdown>
);

export default Demo;
