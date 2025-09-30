import { ButtonTrigger } from '@semcore/ui/base-trigger';
import DropdownMenu from '@semcore/ui/dropdown-menu';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenu.Trigger tag={[ButtonTrigger, 'h1']}>
          <ButtonTrigger.Text w={150} tag={[Text, 'h2']} size={400} ellipsis={{ trim: 'middle' }}>
            Dat First List
          </ButtonTrigger.Text>
        </DropdownMenu.Trigger>
        <br />
        <br />
        <DropdownMenu.Trigger tag={ButtonTrigger}>
          <ButtonTrigger.Text w={150} tag={Text} size={400} data-test-id='ellipsis-middle' ellipsis={{ trim: 'middle' }}>
            This is first trigger with a very very long text!
          </ButtonTrigger.Text>
        </DropdownMenu.Trigger>
        <br />
        <br />
        <DropdownMenu.Trigger tag={ButtonTrigger}>
          <ButtonTrigger.Text w={150} tag={Text} size={400} ellipsis={true}>

            This is second trigger with a very very long text!
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
          This is third trigger with a very very long text!
        </ButtonTrigger.Text>
      </ButtonTrigger>

    </>
  );
};

export default Demo;
