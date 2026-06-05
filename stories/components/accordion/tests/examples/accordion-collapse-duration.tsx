import Accordion from '@semcore/ui/accordion';
import { Box } from '@semcore/ui/base-components';
import React from 'react';

const Demo = () => {
  const [value, onChange] = React.useState<number | null>(null);

  return (
    <>
      <Accordion pb={4} value={value} onChange={onChange}>
        <Accordion.Item value={11}>
          <Accordion.Item.Toggle pb={2}>
            <Accordion.Item.ToggleButton>
              <Accordion.Item.Chevron mr={2} />
              Duration 500
            </Accordion.Item.ToggleButton>
          </Accordion.Item.Toggle>
          <Accordion.Item.Collapse duration={500}>
            <Box p={3}>Hello Section</Box>
            <Box p={6}> Hello Section</Box>
          </Accordion.Item.Collapse>
        </Accordion.Item>

        <Accordion.Item value={1}>
          <Accordion.Item.Toggle
            pb={2}
            onClick={() => {
              setTimeout(() => {
                if (value === 1) {
                  onChange(null);
                } else {
                  onChange(1);
                }
              }, 500);

              return false;
            }}
          >
            <Accordion.Item.ToggleButton>
              <Accordion.Item.Chevron mr={2} />
              Duration 500 Delay 500
            </Accordion.Item.ToggleButton>
          </Accordion.Item.Toggle>
          <Accordion.Item.Collapse duration={500}>
            <Box p={3}>Hello Section</Box>
            <Box p={6}> Hello Section</Box>
          </Accordion.Item.Collapse>
        </Accordion.Item>

        <Accordion.Item value={2}>
          <Accordion.Item.Toggle pb={2}>
            <Accordion.Item.ToggleButton>
              <Accordion.Item.Chevron mr={2} />
              Duration 0
            </Accordion.Item.ToggleButton>
          </Accordion.Item.Toggle>
          <Accordion.Item.Collapse duration={0}>
            <Box p={3}>Hello Section</Box>
            <Box p={6}> Hello Section</Box>
          </Accordion.Item.Collapse>
        </Accordion.Item>

        <Accordion.Item value={3}>
          <Accordion.Item.Toggle pb={2}>
            <Accordion.Item.ToggleButton>
              <Accordion.Item.Chevron mr={2} />
              Default
            </Accordion.Item.ToggleButton>
          </Accordion.Item.Toggle>
          <Accordion.Item.Collapse>
            <Box p={3}>Hello Section</Box>
            <Box p={6}> Hello Section</Box>
          </Accordion.Item.Collapse>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default Demo;
