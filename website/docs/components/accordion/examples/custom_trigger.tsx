import React from 'react';
import Accordion from '@semcore/ui/accordion';
import { Box } from '@semcore/ui/flex-box';
import Button from '@semcore/button';

const Demo = () => (
  <Accordion>
    {[...new Array(3)].map((_, index) => (
      <Accordion.Item value={index} key={index}>
        <Accordion.Item.Toggle p='8px 12px' w='100%'>
          <Button>
            <Button.Addon>
              <Accordion.Item.Chevron />
            </Button.Addon>
            <Button.Text tag='h3' my={0} inline>{`Section ${index + 1}`}</Button.Text>
          </Button>
        </Accordion.Item.Toggle>
        <Accordion.Item.Collapse>
          <Box p='12px 32px'>{`Hello Section ${index + 1}`}</Box>
        </Accordion.Item.Collapse>
      </Accordion.Item>
    ))}
  </Accordion>
);

export default Demo;
