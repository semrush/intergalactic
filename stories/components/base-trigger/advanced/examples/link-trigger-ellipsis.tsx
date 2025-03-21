import React from 'react';
import Ellipsis from '@semcore/ellipsis';
import DropdownMenu from '@semcore/dropdown-menu';
import { LinkTrigger } from '@semcore/base-trigger';
import { Text } from '@semcore/typography';

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
