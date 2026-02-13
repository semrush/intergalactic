import BaseTrigger from '@semcore/ui/base-trigger';
import DropdownMenu from '@semcore/ui/dropdown-menu';
import Ellipsis from '@semcore/ui/ellipsis';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenu.Trigger tag={[BaseTrigger, 'h1']}>
          <BaseTrigger.Text w={150} tag={[Text, 'h2']} size={400}>
            <Ellipsis trim='middle'>Few tags tags</Ellipsis>
          </BaseTrigger.Text>
        </DropdownMenu.Trigger>
        <br />
        <br />
        <DropdownMenu.Trigger tag={BaseTrigger}>
          <BaseTrigger.Text w={150} tag={Text} size={400}>
            <Ellipsis trim='middle' data-test-id='ellipsis-middle'>
              This is first trigger with a very very long text!
            </Ellipsis>
          </BaseTrigger.Text>
        </DropdownMenu.Trigger>
        <br />
        <br />
        <DropdownMenu.Trigger tag={BaseTrigger}>
          <BaseTrigger.Text w={150} tag={Text} size={400}>
            <Ellipsis>
              This is second trigger with a very very long text!
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
      <BaseTrigger w={100} data-test-id='active-trigger'>
        <Ellipsis>
          This is third trigger with a very very long text!
        </Ellipsis>
      </BaseTrigger>
    </>
  );
};

export default Demo;

export const App = () => <Demo />;
