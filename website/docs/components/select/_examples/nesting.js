import React from 'react';
import Select from '@semcore/select';
import DropdownMenu from '@semcore/dropdown-menu';
import Chevron from '@semcore/icon/lib/ChevronRight/xs';

const options = Array(6)
  .fill('')
  .map((i, idx) => `Option ${idx}`);

const Demo = () => (
  <Select placeholder={'Select something'}>
    <Select.Trigger />
    <Select.Menu>
      {options.map((option, idx) => {
        return (
          <Select.Option value={option} key={idx}>
            {option}
          </Select.Option>
        );
      })}
      <Select.Divider />
      <DropdownMenu placement="right-start" interaction="hover" offset={[0, -5]}>
        <DropdownMenu.Trigger tag={DropdownMenu.Item} tabIndex={0}>
          ddm trigger
          <Chevron ml="auto" />
        </DropdownMenu.Trigger>
        <DropdownMenu.Menu>
          {options.map((option, idx) => (
            <DropdownMenu.Item key={idx}>option</DropdownMenu.Item>
          ))}
        </DropdownMenu.Menu>
      </DropdownMenu>
    </Select.Menu>
  </Select>
);

export default Demo;
