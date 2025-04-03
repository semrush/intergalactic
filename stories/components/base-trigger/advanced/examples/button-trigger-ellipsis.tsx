import React from 'react';
import Ellipsis from '@semcore/ellipsis';
import DropdownMenu from '@semcore/dropdown-menu';
import Select from '@semcore/select';

import {ButtonTrigger} from '@semcore/base-trigger';
import { Text } from '@semcore/typography';

const Demo = () => {
  return (
    <>
    <DropdownMenu>
      <DropdownMenu.Trigger tag={ButtonTrigger}>
        <ButtonTrigger.Text w={150} tag={Text} size={400}>
          <Ellipsis trim='middle'>Dat First List</Ellipsis>
        </ButtonTrigger.Text>
      </DropdownMenu.Trigger>
      <br />
      <br />
      <DropdownMenu.Trigger tag={ButtonTrigger}>
        <ButtonTrigger.Text w={150} tag={Text} size={400} data-test-id='ellipsis-middle'>
          <Ellipsis trim='middle'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores atque autem
            commodi, doloribus ex harum inventore modi praesentium quam ratione reprehenderit rerum
            tempore voluptas. Aliquam eos expedita illo quasi unde!
          </Ellipsis>
        </ButtonTrigger.Text>
      </DropdownMenu.Trigger>
      <br />
      <br />
      <DropdownMenu.Trigger tag={ButtonTrigger}>
        <ButtonTrigger.Text w={150} tag={Text} size={400}>
          <Ellipsis>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores atque autem
            commodi, doloribus ex harum inventore modi praesentium quam ratione reprehenderit rerum
            tempore voluptas. Aliquam eos expedita illo quasi unde!
          </Ellipsis>
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
    <ButtonTrigger  w={100}  data-test-id='active-trigger'><Ellipsis>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores atque autem
            commodi, doloribus ex harum inventore modi praesentium quam ratione reprehenderit rerum
            tempore voluptas. Aliquam eos expedita illo quasi unde!
          </Ellipsis></ButtonTrigger>


    </>
  );
};


export default Demo;

