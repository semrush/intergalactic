import { FilterTrigger } from '@semcore/ui/base-trigger';
import DropdownMenu from '@semcore/ui/dropdown-menu';
import React from 'react';

const Demo = () => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenu.Trigger tag={[FilterTrigger, 'h1']}>
          <FilterTrigger.Text w={150} tag='h1' size={400} ellipsis={{ cropPosition: 'middle' }}>
            Few tags tags
          </FilterTrigger.Text>
        </DropdownMenu.Trigger>
        <br />
        <br />
        <DropdownMenu.Trigger tag={FilterTrigger}>
          <FilterTrigger.Text w={150} size={400} data-test-id='ellipsis-middle' ellipsis={{ cropPosition: 'middle' }}>
            This is first trigger with a very very long text!
          </FilterTrigger.Text>
        </DropdownMenu.Trigger>
        <br />
        <br />
        <DropdownMenu.Trigger tag={FilterTrigger}>
          <FilterTrigger.Text w={150} size={400} ellipsis={true}>
            This is second trigger with a very very long text!
          </FilterTrigger.Text>
        </DropdownMenu.Trigger>
        <DropdownMenu.Menu>
          <DropdownMenu.Item>Save</DropdownMenu.Item>
          <DropdownMenu.Item>Rename</DropdownMenu.Item>
          <DropdownMenu.Item>Download</DropdownMenu.Item>
          <DropdownMenu.Item>Delete</DropdownMenu.Item>
        </DropdownMenu.Menu>
      </DropdownMenu>

      <br />
      <br />
      <FilterTrigger w={100} data-test-id='active-trigger'>
        <FilterTrigger.Text ellipsis={true}>
          This is third trigger with a very very long text!
        </FilterTrigger.Text>
      </FilterTrigger>
    </>
  );
};

export default Demo;
