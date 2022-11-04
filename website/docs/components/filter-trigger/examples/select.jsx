import React from 'react';
import { FilterTrigger } from '@semcore/ui/base-trigger';
import Select from '@semcore/ui/select';

const options = Array(6)
  .fill()
  .map((i, idx) => ({
    title: `Option ${idx}`,
  }));

export default () => {
  return (
    <Select>
      <Select.Trigger tag={FilterTrigger} />
      <Select.Menu>
        {options.map((option, idx) => {
          const { title } = option;
          return (
            <Select.Option value={title} key={idx}>
              {title}
            </Select.Option>
          );
        })}
      </Select.Menu>
    </Select>
  );
};
