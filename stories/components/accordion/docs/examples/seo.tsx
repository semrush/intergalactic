import React from 'react';
import Accordion from '@semcore/accordion';
import { Box } from '@semcore/flex-box';

const Demo = () => {
  const [value, onChange] = React.useState([0]);

  return (
    <Accordion value={value} onChange={(value) => onChange(value)}>
      {[...new Array(3)].map((_, index) => (
        <Accordion.Item value={index} key={index} disabled={index === 2}>
          <Accordion.Item.Toggle pb={2}>
            <Accordion.Item.ToggleButton>
              <Accordion.Item.Chevron mr={2} />
              Section {index + 1}
            </Accordion.Item.ToggleButton>
          </Accordion.Item.Toggle>
          <Accordion.Item.Collapse preserveNode>
            <Box p='12px 24px 24px'>{`Hello Section ${index + 1}`}</Box>
          </Accordion.Item.Collapse>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default Demo;
