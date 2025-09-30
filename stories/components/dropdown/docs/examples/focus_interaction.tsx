import Button from '@semcore/ui/button';
import Dropdown from '@semcore/ui/dropdown';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => (
  <Dropdown interaction='focus'>
    <Dropdown.Trigger id='dropdown-focus' tag={Button}>
      About export
    </Dropdown.Trigger>
    <Dropdown.Popper p={4} wMax={260} aria-labelledby='dropdown-focus'>
      <Text size={200}>You can export up to 300 records in CSV or PDF format.</Text>
    </Dropdown.Popper>
  </Dropdown>
);

export default Demo;
