import React from 'react';
import Popper from '@semcore/popper';
import Button from '@semcore/button';
import { Flex } from '@semcore/flex-box';

const style = { background: '#FFF', color: '#000', border: '1px solid #000', padding: '10px' };

const Demo = () => {
  const [visible, setVisible] = React.useState(false);

  const toggleVisible = () => {
    setVisible(!visible);
  };

  return (
    <Flex justifyContent='space-between'>
      <Popper visible={visible} onVisibleChange={toggleVisible}>
        <Popper.Trigger tag={Button}>Controlled</Popper.Trigger>
        <Popper.Popper style={style}>Attached content</Popper.Popper>
      </Popper>

      <Popper>
        <Popper.Trigger tag={Button} ml='auto'>
          Uncontrolled
        </Popper.Trigger>
        <Popper.Popper style={style}>Attached content</Popper.Popper>
      </Popper>
    </Flex>
  );
};

export default Demo;
