import React from 'react';
import Dropdown from '@semcore/dropdown';
import Button from '@semcore/button';
import Link from '@semcore/link';

const items = ['set up first', 'set up second', 'set up third'];

const Demo = () => {
  const [isItemsVisible, setItemsVisible] = React.useState(false);

  return (
    <Dropdown
      interaction='focus'
      visible={isItemsVisible && items.length > 0}
      onVisibleChange={setItemsVisible}
    >
     <Dropdown.Trigger id='dropdown-basic' tag={Button} ml={2} >
    disableEnforceFocus	 popper
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
  );
};

export default Demo;

export const App = () => <Demo />;
