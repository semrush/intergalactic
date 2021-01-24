import React, { useState } from 'react';
import Popper from '@semcore/popper';
import { Flex } from '@semcore/flex-box';

const style = { background: '#FFF', border: '1px solid black', padding: '10px' };

export default () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    setVisible(!visible);
  };

  return (
    <Flex justifyContent="space-between">
      <Popper visible={visible} onVisibleChange={toggleVisible}>
        <Popper.Trigger style={style}>Controlled</Popper.Trigger>
        <Popper.Popper style={style}>Attached content</Popper.Popper>
      </Popper>

      <Popper>
        <Popper.Trigger style={style} ml="auto">
          Uncontrolled
        </Popper.Trigger>
        <Popper.Popper style={style}>Attached content</Popper.Popper>
      </Popper>
    </Flex>
  );
};
