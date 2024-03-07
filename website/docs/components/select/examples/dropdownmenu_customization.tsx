import React from 'react';
import Select from 'intergalactic/select';
import { Flex } from 'intergalactic/flex-box';
import Notice from 'intergalactic/notice';

const options = Array(12)
  .fill('')
  .map((_, index) => `Option ${index}`);

const noticeStyle = {
  border: 'none',
  borderRadius: '0 0 6px 6px',
  padding: '12px 8px',
};

const Demo = () => (
  <Flex>
    <Select placeholder={'Select something'}>
      <Select.Trigger m='auto' />
      <Select.Popper>
        <Select.List hMax='240px'>
          {options.map((option, index) => (
            <Select.Option value={option} key={index}>
              {option}
            </Select.Option>
          ))}
        </Select.List>
        <Notice style={noticeStyle}>
          <Notice.Content aria-live='polite'>Woooop, it's simple magic!</Notice.Content>
        </Notice>
      </Select.Popper>
    </Select>
  </Flex>
);

export default Demo;
