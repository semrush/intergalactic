import Accordion from '@semcore/ui/accordion';
import Button from '@semcore/ui/button';
import React from 'react';

const Demo = () => {
  return (
    <Accordion>
      {[...new Array(2)].map((_, index) => {
        return (
          <Accordion.Item value={index} key={index}>
            <Accordion.Item.Toggle>
              <Accordion.Item.Chevron />
              Toggle
              {' '}
              {index + 1}
              <Button
                data-testid={`button_in_toggle_${index + 1}`}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                Just button
              </Button>
            </Accordion.Item.Toggle>
            <Accordion.Item.Collapse>
              <div>{`Accordion content ${index + 1}`}</div>
              <Button>
                Just button
              </Button>
            </Accordion.Item.Collapse>
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
};

export default Demo;
