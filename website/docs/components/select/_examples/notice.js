import React from 'react';
import Select from '@semcore/select';
import { Box, Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import Notice from '@semcore/notice';

const options = Array(12)
  .fill()
  .map((i, idx) => ({
    title: `Option ${idx}`,
    smallText: `this is the small text for option ${idx}`,
  }));

const Demo = () => (
  <Flex p={10} alignItems="center" justifyContent="center">
    <Select placeholder={'Select something'}>
      <Select.Trigger />
      <Select.Popper>
        <Select.List hMax="240px">
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
        </Select.List>
        <Notice style={{ border: 'none', borderRadius: 0 }}>
          <Notice.Content>Woooop, it's simple magic! 🧙</Notice.Content>
        </Notice>
      </Select.Popper>
    </Select>
  </Flex>
);

export default Demo;
