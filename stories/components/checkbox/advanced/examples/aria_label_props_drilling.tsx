import Checkbox from '@semcore/ui/checkbox';
import React from 'react';

const Demo = () => {
  return (
    <>
      <div id='mylabel'>apples</div>
      <Checkbox aria-label='fruit' aria-describedby='mylabel'>
        <Checkbox.Value>
          <Checkbox.Value.Control data-testid='checkbox_input_tag' />
          <Checkbox.Value.CheckMark />
        </Checkbox.Value>
      </Checkbox>
    </>
  );
};

export default Demo;
