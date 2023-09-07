---
title: Example
fileSource: tooltip
tabs: Design('tooltip'), A11y('tooltip-a11y'), API('tooltip-api'), Example('tooltip-code'), Changelog('tooltip-changelog')
---

::: warning
:warning: If you require customizing the tooltip behavior, please refer to the [@semcore/ui/popper](/utils/popper/popper) documentation.
:::

The tooltip component is a wrap over [@semcore/ui/popper](/utils/popper/popper) with additional features:

- Stylization and themes for the popper.
- Displaying the arrow of the popper.

## Basic usage

As previously mentioned, the tooltip is essentially a styled version of [@semcore/ui/popper](/utils/popper/popper) and functions in the same way.

::: sandbox

<script lang="tsx">
import React from 'react';
import Tooltip from '@semcore/ui/tooltip';
import { Box, Flex } from '@semcore/ui/flex-box';
import Link from '@semcore/ui/link';

const Demo = () => (
  <Flex>
    <Box m='auto' p={5}>
      <Tooltip>
        <Tooltip.Trigger>
          <Link>Trigger</Link>
        </Tooltip.Trigger>
        <Tooltip.Popper>Hello, stranger</Tooltip.Popper>
      </Tooltip>
    </Box>
  </Flex>
);
</script>

:::

## Title

To simplify code, the component includes a `title` property where you can pass the content for the popper. This helps reduce code volume .

The code below replicates the functionality of the previous example.

::: sandbox

<script lang="tsx">
import React from 'react';
import Tooltip from '@semcore/ui/tooltip';
import { Box, Flex } from '@semcore/ui/flex-box';
import Link from '@semcore/ui/link';

const Demo = () => (
  <Flex>
    <Box m='auto' p={5}>
      <Tooltip title='Hello, stranger'>
        <Link>Trigger</Link>
      </Tooltip>
    </Box>
  </Flex>
);
</script>

:::

## Singleton

You can use a single tooltip for multiple reference elements. This allows you to "group" tooltips with a shared timer to improve the user experience.

::: sandbox

<script lang="tsx">
import React from 'react';
import Tooltip from '@semcore/ui/tooltip';
import Select from '@semcore/ui/select';

const options = Array(50)
  .fill('')
  .map((_, index) => `Option ${index}`);

const Demo = () => (
  <Select>
    <Select.Trigger placeholder='Select option' />
    <Select.Menu>
      <Tooltip timeout={[0, 50]} placement='right'>
        {options.map((option, index) => (
          <Select.Option value={option} key={index} tag={Tooltip.Trigger}>
            {option}
          </Select.Option>
        ))}
        <Tooltip.Popper w={86}>Hey there!</Tooltip.Popper>
      </Tooltip>
    </Select.Menu>
  </Select>
);
</script>

:::

## Ignore portal stacking

By default, when a tooltip is rendered on the edge of a relatively positioned block, the popup mechanism may try to push it inside the block as much as possible. If you don't want this behavior, you can set the `ignorePortalsStacking` prop.

::: sandbox

<script lang="tsx">
import React from 'react';
import Button from '@semcore/ui/button';
import Modal from '@semcore/ui/modal';
import { Text } from '@semcore/ui/typography';
import { Box } from '@semcore/ui/flex-box';
import Input from '@semcore/ui/input';
import Tooltip from '@semcore/ui/tooltip';

const Demo = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <React.Fragment>
      <Button use='primary' onClick={() => setVisible(true)}>
        Open modal
      </Button>
      <Modal visible={visible} onClose={() => setVisible(false)} w={536}>
        <Box mb={2}>
          <Text size={300} tag='label' htmlFor='input-1'>
            First input with tooltip
          </Text>
        </Box>
        <Tooltip
          title='Tooltip with ignoring portals stacking.'
          visible={true}
          placement='left-start'
          ignorePortalsStacking
        >
          <Input size='l' w={440}>
            <Input.Value id='input-2' />
          </Input>
        </Tooltip>
        <Box mt={5} mb={2}>
          <Text size={300} tag='label' htmlFor='input-2'>
            Second input with tooltip
          </Text>
        </Box>
        <Tooltip
          title='Tooltip without ignoring portals stacking.'
          visible={true}
          placement='right-start'
        >
          <Input size='l' w={440}>
            <Input.Value id='input-2' />
          </Input>
        </Tooltip>
      </Modal>
    </React.Fragment>
  );
};


</script>

:::
