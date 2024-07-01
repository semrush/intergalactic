import React from 'react';
import Accordion from 'intergalactic/accordion';
import { Box } from 'intergalactic/flex-box';
import Button from '@semcore/button';

const Demo = () => (
  <Accordion>
    {[...new Array(3)].map((_, index) => (
      <Accordion.Item value={index} key={index}>
        <Accordion.Item.Toggle w='100%' tabIndex={-1}>
          <Accordion.Item.ToggleButton tag={Button} use='tertiary' theme='muted' size='l'>
            <Button.Addon>
              <Accordion.Item.Chevron />
            </Button.Addon>
            <Button.Text my={0} inline>{`Section ${index + 1}`}</Button.Text>
          </Accordion.Item.ToggleButton>
        </Accordion.Item.Toggle>
        <Accordion.Item.Collapse>
          <Box p='12px 36px'>{`Hello Section ${index + 1}`}</Box>
        </Accordion.Item.Collapse>
      </Accordion.Item>
    ))}
  </Accordion>
);

export default Demo;
