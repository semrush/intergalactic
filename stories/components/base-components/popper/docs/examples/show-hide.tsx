import { Popper, Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import React from 'react';

const style = { background: 'var(--intergalactic-bg-primary)', color: 'var(--intergalactic-text-primary)', borderRadius: 'var(--intergalactic-popper-rounded)', border: '1px solid var(--intergalactic-border-primary)', padding: 'var(--intergalactic-spacing-4x, 16px)', boxShadow: 'var(--intergalactic-box-shadow-popper)' };

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
