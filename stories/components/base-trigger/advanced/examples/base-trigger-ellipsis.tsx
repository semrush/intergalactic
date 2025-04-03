import React from 'react';
import Ellipsis from '@semcore/ellipsis';
import DropdownMenu from '@semcore/dropdown-menu';
import  BaseTrigger from '@semcore/base-trigger';
import { Text } from '@semcore/typography';

const Demo = () => {
  return (
    <>
    <DropdownMenu>
      <DropdownMenu.Trigger tag={BaseTrigger}>
        <BaseTrigger.Text w={150} tag={Text} size={400}>
          <Ellipsis trim='middle'>Dat First List</Ellipsis>
        </BaseTrigger.Text>
      </DropdownMenu.Trigger>
      <br />
      <br />
      <DropdownMenu.Trigger tag={BaseTrigger}>
        <BaseTrigger.Text w={150} tag={Text} size={400}>
          <Ellipsis trim='middle' data-test-id='ellipsis-middle'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores atque autem
            commodi, doloribus ex harum inventore modi praesentium quam ratione reprehenderit rerum
            tempore voluptas. Aliquam eos expedita illo quasi unde!
          </Ellipsis>
        </BaseTrigger.Text>
      </DropdownMenu.Trigger>
      <br />
      <br />
      <DropdownMenu.Trigger tag={BaseTrigger}>
        <BaseTrigger.Text w={150} tag={Text} size={400}>
          <Ellipsis>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores atque autem
            commodi, doloribus ex harum inventore modi praesentium quam ratione reprehenderit rerum
            tempore voluptas. Aliquam eos expedita illo quasi unde!
          </Ellipsis>
        </BaseTrigger.Text>
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
    <BaseTrigger  w={100}  data-test-id='active-trigger'><Ellipsis>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores atque autem
            commodi, doloribus ex harum inventore modi praesentium quam ratione reprehenderit rerum
            tempore voluptas. Aliquam eos expedita illo quasi unde!
          </Ellipsis></BaseTrigger>
    </>
  );
};

export default Demo;

export const App = () => <Demo />;
