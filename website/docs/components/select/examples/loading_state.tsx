import React from 'react';
import { Flex } from 'intergalactic/flex-box';
import Select from 'intergalactic/select';
import Spin from 'intergalactic/spin';

const Demo = () => (
  <Flex gap={2} flexWrap>
    <Select>
      <Select.Trigger loading>Trigger</Select.Trigger>
    </Select>
    <Select>
      <Select.Trigger chevron={false} placeholder={<Spin size='xs' mx={4} />} />
    </Select>
  </Flex>
);

export default Demo;
