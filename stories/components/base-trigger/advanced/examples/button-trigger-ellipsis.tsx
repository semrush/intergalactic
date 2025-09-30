import { ButtonTrigger } from '@semcore/ui/base-trigger';
import DropdownMenu from '@semcore/ui/dropdown-menu';
import Ellipsis from '@semcore/ui/ellipsis';
import Select from '@semcore/ui/select';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenu.Trigger tag={[ButtonTrigger, 'h1']}>
          <ButtonTrigger.Text w={150} tag={[Text, 'h2']} size={400}>
            <Ellipsis trim='middle'>Few tags tags</Ellipsis>
          </ButtonTrigger.Text>
        </DropdownMenu.Trigger>
        <br />
        <br />
        <DropdownMenu.Trigger tag={ButtonTrigger}>
          <ButtonTrigger.Text w={150} tag={Text} size={400} data-test-id='ellipsis-middle'>
            <Ellipsis trim='middle'>
              This is first trigger with a very very long text!
            </Ellipsis>
          </ButtonTrigger.Text>
        </DropdownMenu.Trigger>
        <br />
        <br />
        <DropdownMenu.Trigger tag={ButtonTrigger}>
          <ButtonTrigger.Text w={150} tag={Text} size={400}>
            <Ellipsis>
              This is second trigger with a very very long text!
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
      <ButtonTrigger w={100} data-test-id='active-trigger'>
        <Ellipsis>
          This is third trigger with a very very long text!
        </Ellipsis>
      </ButtonTrigger>

    </>
  );
};

export default Demo;
