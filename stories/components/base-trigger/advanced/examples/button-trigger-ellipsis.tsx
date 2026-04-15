import { ButtonTrigger } from '@semcore/ui/base-trigger';
import DropdownMenu from '@semcore/ui/dropdown-menu';
import React from 'react';

type ButtonTriggerEllipsisProps = {
  hintPlacement?: 'top' | 'bottom' | 'left' | 'right';
  hintProps?: false;
};

const Demo = (props: ButtonTriggerEllipsisProps) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenu.Trigger tag={[ButtonTrigger, 'h1']}>
          <ButtonTrigger.Text
            w={150}
            tag='h2'
            size={400}
            ellipsis:cropPosition='middle'
            hint={props.hintProps}
            hint:placement={props.hintPlacement}
          >
            Few Tags Tags Tags
          </ButtonTrigger.Text>
        </DropdownMenu.Trigger>
        <br />
        <br />
        <DropdownMenu.Trigger tag={ButtonTrigger}>
          <ButtonTrigger.Text
            w={150}
            size={400}
            data-test-id='ellipsis-middle'
            ellipsis:cropPosition='middle'
            hint={props.hintProps}
            hint:placement={props.hintPlacement}
          >
            This is first trigger with a very very long text!
          </ButtonTrigger.Text>
        </DropdownMenu.Trigger>
        <br />
        <br />
        <DropdownMenu.Trigger tag={ButtonTrigger}>
          <ButtonTrigger.Text
            w={150}
            size={400}
            ellipsis={true}
            hint={props.hintProps}
            hint:placement={props.hintPlacement}
          >

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
        <ButtonTrigger.Text
          ellipsis={true}
          hint={props.hintProps}
          hint:placement={props.hintPlacement}
        >
          This is third trigger with a very very long text!
        </ButtonTrigger.Text>
      </ButtonTrigger>

    </>
  );
};

export const defaultProps: ButtonTriggerEllipsisProps = {
};

export default Demo;
