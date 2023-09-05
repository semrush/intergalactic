---
title: Example
tabs: Accordion('index'), A11y('accordion-a11y'), API('accordion-api'), Example('accordion-code'), Changelog('accordion-changelog')
---

## Basic usage

::: tip
Don't specify `padding` and `margin` for `Accordion.Item.Collapse`, this will break the animation.
:::

::: sandbox

<script lang="tsx">
import React, { useState } from 'react';
import Accordion from '@semcore/ui/accordion';
import { Text } from '@semcore/ui/typography';
import { Flex, Box } from '@semcore/ui/flex-box';

const Demo = () => {
  const [value, onChange] = useState([0]);

  return (
    <Accordion value={value} onChange={(value) => onChange(value)}>
      {[...new Array(3)].map((_, index) => (
        <Accordion.Item value={index} key={index} disabled={index === 2}>
          <Accordion.Item.Toggle p='8px 12px'>
            <Flex alignItems='center'>
              <Accordion.Item.Chevron color='gray-500' mr={2} />
              <Text size={200} color='gray-800' tag='h3' my={0}>{`Section ${index + 1}`}</Text>
            </Flex>
          </Accordion.Item.Toggle>
          <Accordion.Item.Collapse>
            <Box p='12px 32px'>{`Hello Section ${index + 1}`}</Box>
          </Accordion.Item.Collapse>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};
</script>

:::

## Custom trigger

You can add your own styles to the trigger or change its `tag`.

::: sandbox

<script lang="tsx">
import React from 'react';
import Accordion from '@semcore/ui/accordion';
import Link from '@semcore/ui/link';
import { Box } from '@semcore/ui/flex-box';

const Demo = () => {
  return (
    <Accordion>
      {[...new Array(3)].map((_, index) => (
        <Accordion.Item value={index} key={index}>
          <Accordion.Item.Toggle p='8px 12px' w='100%'>
            <Link size={200} href='#'>
              <Link.Addon>
                <Accordion.Item.Chevron />
              </Link.Addon>
              <Link.Text tag='h3' my={0} inline>{`Section ${index + 1}`}</Link.Text>
            </Link>
          </Accordion.Item.Toggle>
          <Accordion.Item.Collapse>
            <Box p='12px 32px'>{`Hello Section ${index + 1}`}</Box>
          </Accordion.Item.Collapse>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};
</script>

:::

## Selected element styles

To find out whether an element is selected or not, pass the function into the body of the element.

::: sandbox

<script lang="tsx">
import React from 'react';
import Accordion from '@semcore/ui/accordion';
import { Text } from '@semcore/ui/typography';
import { Box } from '@semcore/ui/flex-box';

const Demo = () => {
  return (
    <>
      <Accordion>
        {[...new Array(3)].map((_, index) => (
          <Accordion.Item value={index} key={index}>
            {({ selected }) => (
              <>
                <Accordion.Item.Toggle
                  className='accordion-selected-toggle'
                  style={{ background: selected ? '#e0e1e9' : '' }}
                >
                  <Accordion.Item.Chevron color='gray-500' mr={2} />
                  <Text size={200} color='gray-800' tag='h3' my={0}>{`Section ${index + 1}`}</Text>
                </Accordion.Item.Toggle>
                <Accordion.Item.Collapse>
                  <Box p='12px 32px'>{`Hello Section ${index + 1}`}</Box>
                </Accordion.Item.Collapse>
              </>
            )}
          </Accordion.Item>
        ))}
      </Accordion>
    </>
  );
};
</script>

:::

## One section opening

`value` can take both values: single and array of values. By changing it, you change the behavior of the component.

::: sandbox

<script lang="tsx">
import React, { useState } from 'react';
import Accordion from '@semcore/ui/accordion';
import { Text } from '@semcore/ui/typography';
import { Box, Flex } from '@semcore/ui/flex-box';

const Demo = () => {
  const [value, onChange] = useState(null); // or []
  return (
    <Accordion value={value} onChange={onChange}>
      {[...new Array(3)].map((_, index) => (
        <Accordion.Item value={index} key={index} disabled={index === 2}>
          <Accordion.Item.Toggle p='8px 12px'>
            <Flex alignItems='center'>
              <Accordion.Item.Chevron color='gray-500' mr={2} />
              <Text size={200} color='gray-800' tag='h3' my={0}>{`Section ${index + 1}`}</Text>
            </Flex>
          </Accordion.Item.Toggle>
          <Accordion.Item.Collapse>
            <Box p='12px 32px'>{`Hello Section ${index + 1}`}</Box>
          </Accordion.Item.Collapse>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};
</script>

:::
