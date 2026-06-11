import Accordion from '@semcore/ui/accordion';
import { Box } from '@semcore/ui/base-components';
import React from 'react';

type ValueType = null | number | string | Array<number | string | null>;

const Demo = () => {
  const [value, setValue] = React.useState<ValueType>([0, 'one', null]);

  return (
    <Accordion
      value={value}
      onChange={(newValue: ValueType) => setValue(newValue)}
    >
      <Accordion.Item value={0}>
        <Accordion.Item.Toggle pb={2}>
          <Accordion.Item.ToggleButton>
            <Accordion.Item.Chevron mr={2} />
            Number: 0
          </Accordion.Item.ToggleButton>
        </Accordion.Item.Toggle>
        <Accordion.Item.Collapse data-test-id='number'>
          <Box pt={3} px={6} pb={6}>Section with value = 0 (number)</Box>
        </Accordion.Item.Collapse>
      </Accordion.Item>

      <Accordion.Item value='one'>
        <Accordion.Item.Toggle pb={2}>
          <Accordion.Item.ToggleButton>
            <Accordion.Item.Chevron mr={2} />
            String: "one"
          </Accordion.Item.ToggleButton>
        </Accordion.Item.Toggle>
        <Accordion.Item.Collapse data-test-id='string'>
          <Box pt={3} px={6} pb={6}>Section with value = "one" (string)</Box>
        </Accordion.Item.Collapse>
      </Accordion.Item>
    </Accordion>
  );
};

export default Demo;
