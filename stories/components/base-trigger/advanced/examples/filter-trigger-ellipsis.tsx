import { FilterTrigger } from '@semcore/ui/base-trigger';
import DropdownMenu from '@semcore/ui/dropdown-menu';
import Ellipsis from '@semcore/ui/ellipsis';
import Select from '@semcore/ui/select';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenu.Trigger tag={[FilterTrigger, 'h1']}>
          <FilterTrigger.Text w={150} tag={[Text, 'h1']} size={400}>
            <Ellipsis trim='middle'>Few tags tags</Ellipsis>
          </FilterTrigger.Text>
        </DropdownMenu.Trigger>
        <br />
        <br />
        <DropdownMenu.Trigger tag={FilterTrigger}>
          <FilterTrigger.Text w={150} tag={Text} size={400} data-test-id='ellipsis-middle'>
            <Ellipsis trim='middle'>
              This is first trigger with a very very long text!
            </Ellipsis>
          </FilterTrigger.Text>
        </DropdownMenu.Trigger>
        <br />
        <br />
        <DropdownMenu.Trigger tag={FilterTrigger}>
          <FilterTrigger.Text w={150} tag={Text} size={400}>
            <Ellipsis>
              This is second trigger with a very very long text!
            </Ellipsis>
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
        <Ellipsis>
          This is third trigger with a very very long text!
        </Ellipsis>
      </FilterTrigger>

    </>
  );
};

export default Demo;
