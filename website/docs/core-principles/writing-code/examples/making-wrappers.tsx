import type { NSButton } from '@semcore/ui/button';
import Button from '@semcore/ui/button';
import { wrapIntergalacticComponent } from '@semcore/ui/core';
import React from 'react';

const AlertButton = wrapIntergalacticComponent<
  NSButton.Component,
  {
    handle: ('click' | 'hover')[];
    message: string;
  }
>(({ handle, message, ...restProps }) => {
        const handleClick = () => {
          if (handle.includes('click')) {
            alert(message);
          }
        };
        const handleMouseOver = () => {
          if (handle.includes('hover')) {
            alert(message);
          }
        };

        return <Button {...restProps} onClick={handleClick} onMouseOver={handleMouseOver} />;
      });

const Demo = () => (
  <AlertButton handle={['click']} message='Hello world'>
    Show alert
  </AlertButton>
);

export default Demo;
