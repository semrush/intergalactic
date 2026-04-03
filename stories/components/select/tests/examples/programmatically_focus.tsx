import { Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import Select from '@semcore/ui/select';
import Tooltip from '@semcore/ui/tooltip';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const handleClick = () => {
    ref.current?.focus();
  };

  return (
    <Flex direction='column' w={200}>
      <Button onClick={handleClick}>Set focus</Button>
      <Text tag='label' size={200} htmlFor='options-select'>
        Option types
      </Text>
      <Tooltip
        placement='bottom'
        theme='warning'
        w='100%'
        animationsDisabled
      >
        <Select>
          <Tooltip.Trigger
            tag={Select.Trigger}
            ref={ref}
            placeholder='There are several option types'
            mr='auto'
            mt={2}
            id='options-select'
          />

          <Select.Menu hMax={600}>
            <Select.Option value={1}>Default option</Select.Option>
            <Select.Option value={1} disabled>Default option disabled</Select.Option>

            <Select.Option value={2} selected>Default option selected</Select.Option>

            <Select.Option value={3} selected>
              <Select.Option.Checkbox selected />
              Checkbox option selected
            </Select.Option>

            <Select.Option value={4}>
              <Select.Option.Checkbox />
              Checkbox option
            </Select.Option>

            <Select.Option value={4} disabled>
              <Select.Option.Checkbox />
              Disabled checkbox option
            </Select.Option>
            <Select.Option value={4}>
              <Select.Option.Content>
                <Select.Option.Checkbox indeterminate />
                Indeterminate checkbox option
              </Select.Option.Content>
              <Select.Option.Hint>Hint for the option</Select.Option.Hint>
            </Select.Option>

            <Select.Group title='Group title' subTitle='Hint for the title'>
              <Select.Option value={4}>1st option in group</Select.Option>
              <Select.Option value={5} selected>2nd option in group</Select.Option>
              <Select.Option value={6}>3rd option in group</Select.Option>
            </Select.Group>
          </Select.Menu>
        </Select>
        <Tooltip.Popper>
          Some error message
        </Tooltip.Popper>
      </Tooltip>
    </Flex>
  );
};

export default Demo;
