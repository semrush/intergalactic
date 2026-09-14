import Accordion from '@semcore/ui/accordion';
import { Flex } from '@semcore/ui/base-components';
import React from 'react';

type ValueType = null | number | string | Array<number | string | null>;

/**
 * Covers both value-related scenarios:
 * - the controlled accordion (first) keeps `value` of mixed types in state;
 * - the uncontrolled accordion (second) opens one section from a non-array `defaultValue`.
 *
 * The controlled one must stay first: `locators.toggle` resolves headings by index,
 * so the "Verify values with different types" test relies on it owning indexes 0 and 1.
 */
const Demo = () => {
  const [value, setValue] = React.useState<ValueType>([0, 'one', null]);

  return (
    <Flex direction='column' gap={4}>
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
            Section with value = "one" (string)
          </Accordion.Item.Collapse>
        </Accordion.Item>
      </Accordion>

      <Accordion defaultValue={1}>
        <Accordion.Item value={1}>
          <Accordion.Item.Toggle>
            <Accordion.Item.ToggleButton>
              <Accordion.Item.Chevron />
              Section 1
            </Accordion.Item.ToggleButton>
          </Accordion.Item.Toggle>
          <Accordion.Item.Collapse data-test-id='default-value'>
            Hello Section 1
          </Accordion.Item.Collapse>
        </Accordion.Item>

        <Accordion.Item value='two'>
          <Accordion.Item.Toggle>
            <Accordion.Item.ToggleButton>
              <Accordion.Item.Chevron />
              Section "two"
            </Accordion.Item.ToggleButton>
          </Accordion.Item.Toggle>
          <Accordion.Item.Collapse>
            Hello Section "two"
          </Accordion.Item.Collapse>
        </Accordion.Item>
      </Accordion>
    </Flex>
  );
};

export default Demo;
