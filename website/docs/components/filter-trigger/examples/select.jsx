import React from 'react';
import { FilterTrigger } from '@semcore/ui/base-trigger';
import Select from '@semcore/ui/select';
import { Text } from '@semcore/ui/typography';
import { Box } from '@semcore/ui/flex-box';

const options = Array(6)
  .fill()
  .map((i, idx) => ({
    title: `Option ${idx}`,
  }));

export default () => {
  return (
    <>
      <Text tag="label" htmlFor="filter-trigger">
        Filter trigger with options
      </Text>
      <Box mt={2}>
        <Select>
          <Select.Trigger tag={FilterTrigger} id="filter-trigger" />
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
      </Box>
    </>
  );
};
