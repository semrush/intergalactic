import Accordion from '@semcore/ui/accordion';
import { Box } from '@semcore/ui/base-components';
import React from 'react';

const Demo = () => {
  const [value, onChange] = React.useState([0]);

  return (
    <Accordion value={value} onChange={(value: any) => onChange(value)}>
      {[...new Array(3)].map((_, index) => (
        <Accordion.Item value={index} key={index} disabled={index === 1}>
          <Accordion.Item.Toggle>
            <Accordion.Item.ToggleButton>
              <Accordion.Item.Chevron />
              Section
              {' '}
              {index + 1}
            </Accordion.Item.ToggleButton>
          </Accordion.Item.Toggle>
          <Accordion.Item.Collapse preserveNode>
            <Box>
              {`This is section ${index + 1}`}
              ,
              {' '}
              and it contains a
              {' '}
              <a href='#'>focusable link</a>
            </Box>
          </Accordion.Item.Collapse>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default Demo;
