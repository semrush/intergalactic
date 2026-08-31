import Accordion from '@semcore/ui/accordion';
import React from 'react';

const Demo = () => {
  return (
    <Accordion use='primary'>
      {[...new Array(3)].map((_, index) => (
        <Accordion.Item value={index} key={index} disabled={index === 2}>
          <Accordion.Item.Toggle>
            <Accordion.Item.ToggleButton>
              <Accordion.Item.Chevron />
              Section
              {' '}
              {index + 1}
            </Accordion.Item.ToggleButton>
          </Accordion.Item.Toggle>
          <Accordion.Item.Collapse>
            This is section {index + 1}
          </Accordion.Item.Collapse>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default Demo;
