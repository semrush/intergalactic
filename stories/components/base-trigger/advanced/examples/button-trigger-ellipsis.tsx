import { ButtonTrigger } from '@semcore/base-trigger';
import DropdownMenu from '@semcore/dropdown-menu';
import { Text } from '@semcore/typography';
import React from 'react';

const Demo = () => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenu.Trigger tag={ButtonTrigger}>
          <ButtonTrigger.Text w={150} tag={Text} size={400} ellipsis={{ trim: 'middle' }}>
            Dat First List
          </ButtonTrigger.Text>
        </DropdownMenu.Trigger>
        <br />
        <br />
        <DropdownMenu.Trigger tag={ButtonTrigger}>
          <ButtonTrigger.Text w={150} tag={Text} size={400} data-test-id='ellipsis-middle' ellipsis={{ trim: 'middle' }}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores atque autem
            commodi, doloribus ex harum inventore modi praesentium quam ratione reprehenderit rerum
            tempore voluptas. Aliquam eos expedita illo quasi unde!
          </ButtonTrigger.Text>
        </DropdownMenu.Trigger>
        <br />
        <br />
        <DropdownMenu.Trigger tag={ButtonTrigger}>
          <ButtonTrigger.Text w={150} tag={Text} size={400} ellipsis={true}>

            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores atque autem
            commodi, doloribus ex harum inventore modi praesentium quam ratione reprehenderit rerum
            tempore voluptas. Aliquam eos expedita illo quasi unde!
          </ButtonTrigger.Text>
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
      <ButtonTrigger w={100} data-test-id='active-trigger'>
        <ButtonTrigger.Text ellipsis={true}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores atque autem
          commodi, doloribus ex harum inventore modi praesentium quam ratione reprehenderit rerum
          tempore voluptas. Aliquam eos expedita illo quasi unde!
        </ButtonTrigger.Text>
      </ButtonTrigger>

    </>
  );
};

export default Demo;
