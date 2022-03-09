import React from 'react';
import Tooltip from '@semcore/tooltip';
import Select from '@semcore/select';

const options = Array(50)
  .fill('')
  .map((_, index) => `Option ${index}`);

export default () => (
  <Select>
    <Select.Trigger placeholder="Scroll menu" />
    <Select.Menu>
      <Tooltip timeout={[0, 50]} placement="right">
        {options.map((option, index) => (
          <Select.Option value={option} key={index} tag={Tooltip.Trigger}>
            {option}
          </Select.Option>
        ))}
        <Tooltip.Popper w={150}>Hello, stranger 😉</Tooltip.Popper>
      </Tooltip>
    </Select.Menu>
  </Select>
);
