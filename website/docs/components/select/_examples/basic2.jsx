import React from 'react';
import Select from '@semcore/select';
import { Box, Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

const options = Array(6)
  .fill()
  .map((i, idx) => ({
    title: `Option ${idx}`,
    smallText: `this is the small text for option ${idx}`,
  }));

const Demo = () => (
  <Flex p={10} alignItems="center" justifyContent="center">
    <Select placeholder={'Select something'}>
      <Select.Trigger />
      <Select.Menu>
        {options.map((option, idx) => {
          const { title, smallText } = option;
          return (
            <Select.Option value={title} key={idx}>
              <div>
                <Box mb={1}>{title}</Box>
                <Box>
                  <Text tag="small" size={100} color="gray70">
                    {smallText}
                  </Text>
                </Box>
              </div>
            </Select.Option>
          );
        })}
      </Select.Menu>
    </Select>
  </Flex>
);

export default Demo;
