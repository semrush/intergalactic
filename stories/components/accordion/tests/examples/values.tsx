import Accordion from '@semcore/accordion';
import { Box } from '@semcore/base-components';
import React from 'react';

type ValueType = null | number | string | Array<number | string | null>;

const Demo = () => {
  const [value, setValue] = React.useState<ValueType>([0, 'one', null, [42]]);

  return (
    <Accordion
      value={value}
      onChange={(newValue) => setValue(newValue)}
    >
      <Accordion.Item value={0}>
        <Accordion.Item.Toggle pb={2}>
          <Accordion.Item.ToggleButton>
            <Accordion.Item.Chevron mr={2} />
            Number: 0
          </Accordion.Item.ToggleButton>
        </Accordion.Item.Toggle>
        <Accordion.Item.Collapse
          data-test-id='number'
        >
          <Box p='12px 24px 24px'>Section with value = 0 (number)</Box>
        </Accordion.Item.Collapse>
      </Accordion.Item>

      <Accordion.Item value='one'>
        <Accordion.Item.Toggle pb={2}>
          <Accordion.Item.ToggleButton>
            <Accordion.Item.Chevron mr={2} />
            String: "one"
          </Accordion.Item.ToggleButton>
        </Accordion.Item.Toggle>
        <Accordion.Item.Collapse
          data-test-id='string'
        >
          <Box p='12px 24px 24px'>Section with value = "one" (string)</Box>
        </Accordion.Item.Collapse>
      </Accordion.Item>

      <Accordion.Item value={null}>
        <Accordion.Item.Toggle pb={2}>
          <Accordion.Item.ToggleButton>
            <Accordion.Item.Chevron mr={2} />
            Null
          </Accordion.Item.ToggleButton>
        </Accordion.Item.Toggle>
        <Accordion.Item.Collapse
          data-test-id='null'
        >
          <Box p='12px 24px 24px'>Section with value = null</Box>
        </Accordion.Item.Collapse>
      </Accordion.Item>

      <Accordion.Item value={[42, 15, 12]}>
        <Accordion.Item.Toggle pb={2}>
          <Accordion.Item.ToggleButton>
            <Accordion.Item.Chevron mr={2} />
            Array: [42, 15, 12]
          </Accordion.Item.ToggleButton>
        </Accordion.Item.Toggle>
        <Accordion.Item.Collapse
          data-test-id='array'
        >
          <Box p='12px 24px 24px'>Section with value = [42, 15, 12] (Array&lt;number&gt;)</Box>
        </Accordion.Item.Collapse>
      </Accordion.Item>
    </Accordion>
  );
};

export default Demo;
