import { LinkTrigger } from '@semcore/ui/base-trigger';
import DropdownMenu from '@semcore/ui/dropdown-menu';
import Ellipsis from '@semcore/ui/ellipsis';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenu.Trigger tag={LinkTrigger}>
          <LinkTrigger.Text w={150} tag={Text} size={400}>
            <Ellipsis trim='middle'>Dat First List</Ellipsis>
          </LinkTrigger.Text>
        </DropdownMenu.Trigger>
        <br />
        <br />
        <br />
        <DropdownMenu.Trigger tag={LinkTrigger}>
          <LinkTrigger.Text w={150} tag={Text} size={400} data-test-id='ellipsis-middle'>
            <Ellipsis trim='middle'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores atque autem
              commodi, doloribus ex harum inventore modi praesentium quam ratione reprehenderit rerum
              tempore voluptas. Aliquam eos expedita illo quasi unde!
            </Ellipsis>
          </LinkTrigger.Text>
        </DropdownMenu.Trigger>
        <br />
        <br />
        <br />
        <DropdownMenu.Trigger tag={LinkTrigger}>
          <LinkTrigger.Text w={150} tag={Text} size={400}>
            <Ellipsis>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores atque autem
              commodi, doloribus ex harum inventore modi praesentium quam ratione reprehenderit rerum
              tempore voluptas. Aliquam eos expedita illo quasi unde!
            </Ellipsis>
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
