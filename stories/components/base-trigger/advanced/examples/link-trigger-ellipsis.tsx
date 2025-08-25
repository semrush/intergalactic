import { LinkTrigger } from '@semcore/base-trigger';
import DropdownMenu from '@semcore/dropdown-menu';
import { Text } from '@semcore/typography';
import React from 'react';

const Demo = () => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenu.Trigger tag={LinkTrigger}>
          <LinkTrigger.Text w={150} tag={Text} size={400} display='inline-flex' ellipsis={{ trim: 'middle' }}>
            Dat First List
          </LinkTrigger.Text>
        </DropdownMenu.Trigger>
        <br />
        <br />
        <br />
        <DropdownMenu.Trigger tag={LinkTrigger}>
          <LinkTrigger.Text w={150} tag={Text} size={400} ellipsis={{ trim: 'middle' }} data-test-id='ellipsis-middle'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores atque autem
            commodi, doloribus ex harum inventore modi praesentium quam ratione reprehenderit rerum
            tempore voluptas. Aliquam eos expedita illo quasi unde!
          </LinkTrigger.Text>
        </DropdownMenu.Trigger>
        <br />
        <br />
        <br />
        <DropdownMenu.Trigger tag={LinkTrigger}>
          <LinkTrigger.Text w={150} tag={Text} size={400} ellipsis={true}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores atque autem
            commodi, doloribus ex harum inventore modi praesentium quam ratione reprehenderit rerum
            tempore voluptas. Aliquam eos expedita illo quasi unde!
          </LinkTrigger.Text>
        </DropdownMenu.Trigger>
        <DropdownMenu.Menu>
          <DropdownMenu.Item>Save</DropdownMenu.Item>
          <DropdownMenu.Item>Rename</DropdownMenu.Item>
          <DropdownMenu.Item>Download</DropdownMenu.Item>
          <DropdownMenu.Item>Delete</DropdownMenu.Item>
        </DropdownMenu.Menu>
      </DropdownMenu>

    </>
  );
};

export default Demo;

export const App = () => <Demo />;
