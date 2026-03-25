import BaseTrigger from '@semcore/ui/base-trigger';
import DropdownMenu from '@semcore/ui/dropdown-menu';
import React from 'react';

type BaseTriggerEllipsisProps = {
  hintPlacement?: 'top' | 'bottom' | 'left' | 'right';
  hintProps?: false;
};

const Demo = (props: BaseTriggerEllipsisProps) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenu.Trigger tag={[BaseTrigger, 'h1']}>
          <BaseTrigger.Text w={150} tag='h2' size={400}>
            No ellipsis Few Tags Tags Tags
          </BaseTrigger.Text>
        </DropdownMenu.Trigger>
        <br />
        <br />
        <DropdownMenu.Trigger tag={BaseTrigger}>
          <BaseTrigger.Text
            w={150}
            size={400}
            ellipsis:cropPosition='middle'
            hint={props.hintProps}
            hint:placement={props.hintPlacement}
          >
            This is first trigger with a very very long text!
          </BaseTrigger.Text>
        </DropdownMenu.Trigger>
        <br />
        <br />
        <DropdownMenu.Trigger tag={BaseTrigger}>
          <BaseTrigger.Text
            w={150}
            size={400}
            ellipsis={true}
            hint={props.hintProps}
            hint:placement={props.hintPlacement}
          >
            This is second trigger with a very very long text!
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
        <BaseTrigger.Text
          ellipsis={true}
          hint={props.hintProps}
          hint:placement={props.hintPlacement}
        >
          This is third trigger with a very very long text!
        </BaseTrigger.Text>
      </BaseTrigger>
    </>
  );
};
export const defaultProps: BaseTriggerEllipsisProps = {
};

export default Demo;

export const App = () => <Demo />;
