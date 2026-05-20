import Accordion from '@semcore/ui/accordion';
import { Box } from '@semcore/ui/base-components';
import React from 'react';

const Demo = () => {
  const [value, onChange] = React.useState([0]);

  return (
    <Accordion value={value} onChange={(value: any) => onChange(value)}>
      {[...new Array(3)].map((_, index) => (
        <Accordion.Item value={index} key={index} disabled={index === 1}>
          <Accordion.Item.Toggle pb={2}>
            <Accordion.Item.ToggleButton>
              <Accordion.Item.Chevron mr={2} />
              Section
              {' '}
              {index + 1}
            </Accordion.Item.ToggleButton>
          </Accordion.Item.Toggle>
          <Accordion.Item.Collapse preserveNode>
            <Box pt={3} px={6} pb={6}>
              {`Hello Section ${index + 1}`}
              {' '}
              <a href='#'>Some focusable link in content</a>
            </Box>
          </Accordion.Item.Collapse>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default Demo;
