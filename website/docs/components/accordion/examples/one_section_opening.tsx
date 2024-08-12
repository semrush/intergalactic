import React from 'react';
import Accordion from 'intergalactic/accordion';
import { Box } from 'intergalactic/flex-box';

const Demo = () => {
  const [value, onChange] = React.useState(null); // or []
  return (
    <Accordion value={value} onChange={onChange}>
      {[...new Array(3)].map((_, index) => (
        <Accordion.Item value={index} key={index} disabled={index === 2}>
          <Accordion.Item.Toggle pb={2}>
            <Accordion.Item.ToggleButton tag={'h3'}>
              <Accordion.Item.Chevron mr={2} />
              Section {index + 1}
            </Accordion.Item.ToggleButton>
          </Accordion.Item.Toggle>
          <Accordion.Item.Collapse>
            <Box p='12px 24px 24px'>{`Hello Section ${index + 1}`}</Box>
          </Accordion.Item.Collapse>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default Demo;
