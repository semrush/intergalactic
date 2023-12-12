import React from 'react';
import Tooltip from '@semcore/ui/tooltip';
import Select from '@semcore/ui/select';

const options = Array(50)
  .fill('')
  .map((_, index) => `Option ${index}`);

const Demo = () => (
  <Select>
    <Select.Trigger placeholder='Select option' />
    <Select.Menu>
      <Tooltip timeout={[0, 50]} placement='right'>
        {options.map((option, index) => (
          <Select.Option value={option} key={index} tag={Tooltip.Trigger}>
            {option}
          </Select.Option>
        ))}
        <Tooltip.Popper w={86}>Hey there!</Tooltip.Popper>
      </Tooltip>
    </Select.Menu>
  </Select>
);
