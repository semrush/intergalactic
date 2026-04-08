import { Flex } from '@semcore/ui/base-components';
import { LinkTrigger } from '@semcore/ui/base-trigger';
import Select from '@semcore/ui/select';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  const [value, setValue] = React.useState(null);

  return (
    <Flex gap={2} alignItems='flex-end'>
      <Text size={200} tag='label' htmlFor='device-link-select'>
        Device:
      </Text>
      <Select
        placeholder='Select SEO project'
        value={value}
        onChange={setValue}
      >
        <Select.Trigger tag={LinkTrigger} size={600} wMax={140}>
          <LinkTrigger.Text
            fontWeight={600}
            ellipsis
          >
            {value}
          </LinkTrigger.Text>
        </Select.Trigger>
        <Select.Popper aria-label=''>
          <Select.List>
            {devices.map((option) => (
              <Select.Option value={option.value} key={option.value}>
                {option.children}
              </Select.Option>
            ))}
          </Select.List>
        </Select.Popper>
      </Select>
    </Flex>
  );
};

const devices = ['Desktop', 'Mobile', 'Tablet'].map((item) => ({
  value: item,
  children: item,
}));

export default Demo;
