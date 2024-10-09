import React from 'react';
import { Flex } from 'intergalactic/flex-box';
import Select from 'intergalactic/select';
import Spin from 'intergalactic/spin';
import { Text } from 'intergalactic/typography';

const Demo = () => (
  <Flex gap={4} flexWrap>
    <Flex direction='column'>
      <Text tag='label' size={200} htmlFor='loading-select'>
        Normal loading state
      </Text>
      <Select mt={2} mr='auto' id='loading-select'>
        <Select.Trigger loading>Trigger</Select.Trigger>
      </Select>
    </Flex>
    <Flex direction='column'>
      <Text tag='label' size={200} htmlFor='loading-select-no-chevron'>
        Loading state without chevron
      </Text>
      <div>
        <Select mt={2} mr='auto' id='loading-select-no-chevron'>
          <Select.Trigger chevron={false} placeholder={<Spin size='xs' mx={4} />} tabIndex={-1} />
        </Select>
      </div>
    </Flex>
  </Flex>
);

export default Demo;
