import React from 'react';
import Select from '@semcore/select';
import { Flex } from '@semcore/flex-box';
import Notice from '@semcore/notice';

const options = Array(12)
  .fill('')
  .map((_, index) => `Option ${index}`);

const noticeStyle = {
  border: 'none',
  borderRadius: 0,
};

export default () => (
  <Flex>
    <Select placeholder={'Select something'}>
      <Select.Trigger m="auto" />
      <Select.Popper>
        <Select.List hMax="240px">
          {options.map((option, index) => (
            <Select.Option value={option} key={index}>
              {option}
            </Select.Option>
          ))}
        </Select.List>
        <Notice style={noticeStyle}>
          <Notice.Content>Woooop, it's simple magic! 🧙</Notice.Content>
        </Notice>
      </Select.Popper>
    </Select>
  </Flex>
);
