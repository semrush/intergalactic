import { LinkTrigger } from '@semcore/ui/base-trigger';
import DropdownMenu from '@semcore/ui/dropdown-menu';
import React from 'react';

type LinkTriggerEllipsisProps = {
  hintPlacement?: 'top' | 'bottom' | 'left' | 'right';
  hintProps?: false;
};

const Demo = (props: LinkTriggerEllipsisProps) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenu.Trigger tag={LinkTrigger}>
          <LinkTrigger.Text
            w={150}
            size={400}
            display='inline-flex'
            hintProps={props.hintProps}
            hint:placement={props.hintPlacement}
            ellipsis={{ cropPosition: 'middle' }}
          >
            Few Tags Tags Tags
          </LinkTrigger.Text>
        </DropdownMenu.Trigger>
        <br />
        <br />
        <br />
        <DropdownMenu.Trigger tag={LinkTrigger}>
          <LinkTrigger.Text
            w={150}
            size={400}
            ellipsis={{ cropPosition: 'middle' }}
            hintProps={props.hintProps}
            hint:placement={props.hintPlacement}
            data-test-id='ellipsis-middle'
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores atque autem
            commodi, doloribus ex harum inventore modi praesentium quam ratione reprehenderit rerum
            tempore voluptas. Aliquam eos expedita illo quasi unde!
          </LinkTrigger.Text>
        </DropdownMenu.Trigger>
        <br />
        <br />
        <br />
        <DropdownMenu.Trigger tag={LinkTrigger}>
          <LinkTrigger.Text
            w={150}
            size={400}
            ellipsis={true}
            hintProps={props.hintProps}
            hint:placement={props.hintPlacement}
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores atque autem
            commodi, doloribus ex harum inventore modi praesentium quam ratione reprehenderit rerum
            tempore voluptas. Aliquam eos expedita illo quasi unde!
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

export const defaultProps: LinkTriggerEllipsisProps = {
};

export default Demo;
