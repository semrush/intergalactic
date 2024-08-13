import React from 'react';
import Button from 'intergalactic/button';
import Dropdown from 'intergalactic/dropdown';
import { Flex } from 'intergalactic/flex-box';
import { Text } from 'intergalactic/typography';

const Demo = () => (
  <Flex direction='column'>
    <Dropdown>
      <Dropdown.Trigger id='dropdown-basic' mt={2} mr='auto' tag={Button}>
        About export
      </Dropdown.Trigger>
      <Dropdown.Popper p={4} wMax={260} aria-labelledby='dropdown-basic'>
        <Text size={200}>You can export up to 300 records in CSV or PDF format.</Text>
      </Dropdown.Popper>
    </Dropdown>
  </Flex>
);

export default Demo;
