import { Popper } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import React, { useRef } from 'react';

const style = { background: 'var(--intergalactic-bg-primary)', color: 'var(--intergalactic-text-primary)', borderRadius: 'var(--intergalactic-popper-rounded)', border: '1px solid var(--intergalactic-border-primary)', padding: 'var(--intergalactic-spacing-4x, 16px)', boxShadow: 'var(--intergalactic-box-shadow-popper)' };

const Demo = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <Popper>
      {(props, handlers) => {
        // function for managing the visibility state of Popper.Popper
        const { visible } = handlers;

        return (
          <>
            <Button onClick={() => visible(true)} ref={buttonRef} mr={4}>
              Open popper
            </Button>
            <Popper.Trigger style={style}>Attach trigger</Popper.Trigger>
            <Popper.Popper style={style}>
              <p>Attached content</p>
              <Button
                onClick={() => {
                  visible(false);
                  setTimeout(() => buttonRef.current?.focus(), 1);
                }}
              >
                Close popper
              </Button>
            </Popper.Popper>
          </>
        );
      }}
    </Popper>
  );
};

export default Demo;
