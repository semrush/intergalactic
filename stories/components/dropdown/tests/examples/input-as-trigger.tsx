import Dropdown from '@semcore/ui/dropdown';
import type { DropdownProps } from '@semcore/ui/dropdown';
import Input from '@semcore/ui/input';
import Link from '@semcore/ui/link';
import React from 'react';

const items = ['set up first', 'set up second', 'set up third'];

const Demo = (props: DropdownProps) => {
  const [value, setValue] = React.useState('');
  const [isItemsVisible, setItemsVisible] = React.useState(false);

  return (
    <>
      <Dropdown
        interaction={props.interaction}
        visible={isItemsVisible && items.length > 0}
        onVisibleChange={setItemsVisible}
      >
        <Dropdown.Trigger id='dropdown-basic'>
          <Input w={200}>
            <Input.Value value={value} onChange={setValue} />
          </Input>
        </Dropdown.Trigger>
        <Dropdown.Popper aria-labelledby='dropdown-basic'>
          <div>
            {items.map((item) => {
              return (
                <Dropdown.Item key={item}>
                  <Link href='#'>{item}</Link>
                </Dropdown.Item>
              );
            })}
          </div>
        </Dropdown.Popper>
      </Dropdown>
    </>
  );
};

export const defaultInputTriggerExampleProps: DropdownProps = {

  interaction: undefined,
};

Demo.defaultProps = defaultInputTriggerExampleProps;

export default Demo;
