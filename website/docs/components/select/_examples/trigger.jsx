import React, { useState } from 'react';
import Select from '@semcore/select';
import { Box, Flex } from '@semcore/flex-box';
import { LinkTrigger } from '@semcore/base-trigger';
import { Text } from '@semcore/typography';

const options = Array(6)
  .fill()
  .map((i, idx) => ({
    value: `Option ${idx}`,
    title: `Awesome option ${idx}`,
    smallText: `this is the small text for option ${idx}`,
  }));

const Demo = () => {
  const [loading, updateLoading] = useState(false);
  const handleChange = () => {
    updateLoading(true);
    setTimeout(() => {
      updateLoading(false);
    }, 2000);
  };
  return (
    <Flex p={10} alignItems="center" justifyContent="center">
      <Select placeholder="Select value" onChange={handleChange}>
        <Select.Trigger tag={LinkTrigger} loading={loading} disabled={loading} />
        <Select.Menu>
          {options.map((option, idx) => (
            <Select.Option value={option.value} key={idx}>
              <div>
                <Box mb={1}> {option.title} </Box>
                <Box>
                  <Text size={200} color="gray70">
                    {option.smallText}
                  </Text>
                </Box>
              </div>
            </Select.Option>
          ))}
        </Select.Menu>
      </Select>
    </Flex>
  );
};

export default Demo;
