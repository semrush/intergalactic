import React from 'react';
import Dropdown from '@semcore/ui/dropdown';
import Input from '@semcore/ui/input';
import Link from '@semcore/ui/link';

const items = ['set up first', 'set up second', 'set up third'];

const Demo = () => {
  const [value, setValue] = React.useState("");
  const [isItemsVisible, setItemsVisible] = React.useState(false);

  return (
    <>
    <Dropdown
      interaction='focus'
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

export default Demo;

export const App = () => <Demo />;
