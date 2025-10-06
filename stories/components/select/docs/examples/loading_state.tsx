import { Flex } from '@semcore/ui/base-components';
import Select from '@semcore/ui/select';
import Spin from '@semcore/ui/spin';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => (
  <Flex gap={4} flexWrap>
    <Flex direction='column'>
      <Text tag='label' size={200} htmlFor='loading-select'>
        Normal loading state
      </Text>
      <Select>
        <Select.Trigger mt={2} mr='auto' id='loading-select' loading>
          Trigger
        </Select.Trigger>
      </Select>
    </Flex>
    <Flex direction='column'>
      <Text tag='label' size={200} htmlFor='loading-select-no-chevron'>
        Loading state without chevron
      </Text>
      <div>
        <Select>
          <Select.Trigger
            mt={2}
            mr='auto'
            id='loading-select-no-chevron'
            chevron={false}
            placeholder={<Spin size='xs' mx={4} />}
            tabIndex={-1}
          />
        </Select>
      </div>
    </Flex>
  </Flex>
);

export default Demo;
