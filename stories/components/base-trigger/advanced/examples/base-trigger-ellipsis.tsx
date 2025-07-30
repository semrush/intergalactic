import BaseTrigger from '@semcore/base-trigger';
import DropdownMenu from '@semcore/dropdown-menu';
import { Text } from '@semcore/typography';
import React from 'react';

const Demo = () => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenu.Trigger tag={BaseTrigger}>
          <BaseTrigger.Text w={150} tag={Text} size={400} ellipsis={{ trim: 'middle' }}>
            Dat First List
          </BaseTrigger.Text>
        </DropdownMenu.Trigger>
        <br />
        <br />
        <DropdownMenu.Trigger tag={BaseTrigger}>
          <BaseTrigger.Text w={150} tag={Text} size={400} ellipsis={{ trim: 'middle' }}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores atque autem
            commodi, doloribus ex harum inventore modi praesentium quam ratione reprehenderit rerum
            tempore voluptas. Aliquam eos expedita illo quasi unde!
          </BaseTrigger.Text>
        </DropdownMenu.Trigger>
        <br />
        <br />
        <DropdownMenu.Trigger tag={BaseTrigger}>
          <BaseTrigger.Text w={150} tag={Text} size={400} ellipsis={true}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores atque autem
            commodi, doloribus ex harum inventore modi praesentium quam ratione reprehenderit rerum
            tempore voluptas. Aliquam eos expedita illo quasi unde!
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
      <BaseTrigger w={100} data-test-id='active-trigger'>
        <BaseTrigger.Text ellipsis={true}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores atque autem
          commodi, doloribus ex harum inventore modi praesentium quam ratione reprehenderit rerum
          tempore voluptas. Aliquam eos expedita illo quasi unde!
        </BaseTrigger.Text>
      </BaseTrigger>
    </>
  );
};

export default Demo;

export const App = () => <Demo />;
