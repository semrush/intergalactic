import React from 'react';
import { Hint } from '@semcore/ui/typography';

const Demo = () => {
  /**
   * Common logic for handle click or keypress Enter/Space
   */
  const handler = () => {
    alert('click or keyDown');
  };

  const handleClick = React.useCallback(() => {
    handler();
  }, []);

  const handleKeyDown = React.useCallback((e) => {
    if (e.key === 'Enter' || e.key === 'Space') {
      handler();
    }
  }, []);

  return (
    <Hint onClick={handleClick} onKeyDown={handleKeyDown} role='button'>
      <Hint.Text>Some hint text</Hint.Text>
    </Hint>
  );
};

export default Demo;
