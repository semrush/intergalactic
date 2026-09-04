import Accordion from '@semcore/ui/accordion';
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
        <Accordion.Item.Toggle>
          <Accordion.Item.ToggleButton>
            <Accordion.Item.Chevron />
            Number: 0
          </Accordion.Item.ToggleButton>
        </Accordion.Item.Toggle>
        <Accordion.Item.Collapse data-test-id='number'>
          Section with value = 0 (number)
        </Accordion.Item.Collapse>
      </Accordion.Item>

      <Accordion.Item value='one'>
        <Accordion.Item.Toggle>
          <Accordion.Item.ToggleButton>
            <Accordion.Item.Chevron />
            String: "one"
          </Accordion.Item.ToggleButton>
        </Accordion.Item.Toggle>
        <Accordion.Item.Collapse data-test-id='string'>
          Section with value = "one" (string
        </Accordion.Item.Collapse>
      </Accordion.Item>
    </Accordion>
  );
};

export default Demo;
