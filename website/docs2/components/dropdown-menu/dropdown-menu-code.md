---
title: DropdownMenu
fileSource: dropdown-menu
tabs: Design('dropdown-menu'), A11y('dropdown-menu-a11y'), API('dropdown-menu-api'), Example('dropdown-menu-code'), Changelog('dropdown-menu-changelog')
---

::: warning
:warning: If you need to customize your work with the dropdown menu, please refer to the documentation [@semcore/ui/popper](/utils/popper/popper)
:::

The component is a wrap over [@semcore/ui/dropdown](/components/dropdown/dropdown) with the following logic:

- Display of the list of options in a dropdown window
- Scrolling the list of options using the keyboard

::: sandbox

<script lang="tsx">
import React from 'react';
import DropdownMenu from '@semcore/ui/dropdown-menu';
import { ButtonTrigger } from '@semcore/ui/base-trigger';

const Demo = () => {
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger>
        <ButtonTrigger>Click me</ButtonTrigger>
      </DropdownMenu.Trigger>
      <DropdownMenu.Menu>
        <DropdownMenu.Item>Item 1</DropdownMenu.Item>
        <DropdownMenu.Item>Item 2</DropdownMenu.Item>
        <DropdownMenu.Item>Item 3</DropdownMenu.Item>
        <DropdownMenu.Item>Item 4</DropdownMenu.Item>
      </DropdownMenu.Menu>
    </DropdownMenu>
  );
}
</script>

:::

## Dropdown-menu

There are several methods of displaying the dropdown menu in the component. We will show each of them below.

### The first method

We implement it with the help of the combination of two components:

- `DropdownMenu.Popper` – layout of a dropdown window
- `DropdownMenu.List` and [ScrollArea](/components/scroll-area/scroll-area) with option list styles

This method is good when you need a flexible content customization in a dropdown menu.

::: sandbox

<script lang="tsx">
import React, { useState } from 'react';
import DropdownMenu from '@semcore/ui/dropdown-menu';
import Button from '@semcore/ui/base-trigger';
import Link from '@semcore/ui/link';
import { Text } from '@semcore/ui/typography';
import Notice from '@semcore/ui/notice';
import SpinContainer from '@semcore/ui/spin-container';
import FileExportM from '@semcore/ui/icon/FileExport/m';

const Demo = () => {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger>
        <Button>
          <Button.Addon>
            <FileExportM />
          </Button.Addon>
          <Button.Text>Export</Button.Text>
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Popper wMax='257px'>
        <SpinContainer loading={loading}>
          <DropdownMenu.List>
            <DropdownMenu.Item onClick={handleClick}>Excel</DropdownMenu.Item>
            <DropdownMenu.Item onClick={handleClick}>CSV</DropdownMenu.Item>
            <DropdownMenu.Item onClick={handleClick}>CSV Semicolon</DropdownMenu.Item>
          </DropdownMenu.List>
          <Notice
            theme='warning'
            style={{
              padding: '12px 8px',
              borderWidth: 0,
              borderTopWidth: '1px',
              borderRadius: '0 0 6px 6px',
            }}
          >
            <Notice.Content>
              <Text tag='strong' mb={1} style={{ display: 'block' }}>
                Export failed
              </Text>
              <Text lineHeight='18px'>
                If the problem persists, please contact us at{' '}
                <Link inline href='mailto:feedback@semrush.com'>
                  feedback@semrush.com
                </Link>
              </Text>
            </Notice.Content>
          </Notice>
        </SpinContainer>
      </DropdownMenu.Popper>
    </DropdownMenu>
  );
}
</script>

:::

### The second method

The easiest method is to use `DropdownMenu.Menu`.

It is appropriate when it is necessary to manage only the content within the options list.

`DropdownMenu.Menu` is a wrap over `DropdownMenu.Popper` and `DropdownMenu.List`. All props will fall through to `DropdownMenu.List`.

::: sandbox

<script lang="tsx">
import React from 'react';
import DropdownMenu from '@semcore/ui/dropdown-menu';
import { ButtonTrigger } from '@semcore/ui/base-trigger';

const Demo = () => {
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger>
        <ButtonTrigger>Click me</ButtonTrigger>
      </DropdownMenu.Trigger>
      {/* Adding max-height to the dropdown menu */}
      <DropdownMenu.Menu hMax={'180px'}>
        <DropdownMenu.ItemTitle>List heading</DropdownMenu.ItemTitle>
        <DropdownMenu.Item>Item 1</DropdownMenu.Item>
        <DropdownMenu.Item>Item 2</DropdownMenu.Item>
        <DropdownMenu.Item>Item 3</DropdownMenu.Item>
        <DropdownMenu.Item>Item 4</DropdownMenu.Item>
        <DropdownMenu.Item>Item 5</DropdownMenu.Item>
        <DropdownMenu.Item>Item 6</DropdownMenu.Item>
        <DropdownMenu.Item>Item 7</DropdownMenu.Item>
        <DropdownMenu.Item>Item 8</DropdownMenu.Item>
        <DropdownMenu.Item>Item 9</DropdownMenu.Item>
      </DropdownMenu.Menu>
    </DropdownMenu>
  );
}
</script>

:::

## Elements of the list

The component has several variants of list elements layout:

- `DropdownMenu.Item`, which is an element of the list (can be selected with the keyboard)
- `DropdownMenu.ItemTitle`, which is the title of the list (cannot be selected with the keyboard)
- `DropdownMenu.ItemHint`, which is list subhead or message with additional information (cannot be selected with the keyboard)

::: sandbox

<script lang="tsx">
import React from 'react';
import DropdownMenu from '@semcore/ui/dropdown-menu';
import { ButtonTrigger } from '@semcore/ui/base-trigger';

const Demo = () => {
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger>
        <ButtonTrigger>I'll show u some options, buddy</ButtonTrigger>
      </DropdownMenu.Trigger>
      <DropdownMenu.Menu>
        <DropdownMenu.ItemTitle>I'm title</DropdownMenu.ItemTitle>
        <DropdownMenu.ItemHint>I'm hint</DropdownMenu.ItemHint>
        <DropdownMenu.Item>I'm item</DropdownMenu.Item>
      </DropdownMenu.Menu>
    </DropdownMenu>
  );
}
</script>

:::

## Render-function

As with the lower-level components, you can access the component logic by passing the render-function into the body.

You can see the list of available methods in the [API](/components/dropdown-menu/dropdown-menu-api#aad4e2).

::: sandbox

<script lang="tsx">
import React from 'react';
import DropdownMenu from '@semcore/ui/dropdown-menu';
import { ButtonTrigger } from '@semcore/ui/base-trigger';
import { Box } from '@semcore/flex-box';

const Demo = () => {
  return (
    <DropdownMenu>
      {(props, handlers) => {
        const {
          getTriggerProps, // encapsulates Trigger logic
          getPopperProps, // encapsulates Popper logic
          getListProps, // encapsulates List logic
          getItemProps, // // encapsulates Item logic
        } = props;

        const popperProps = getPopperProps();

        return (
          <React.Fragment>
            <ButtonTrigger {...getTriggerProps()}>Click me</ButtonTrigger>
            <Box
              {...popperProps}
              hidden={!popperProps.visible}
              zIndex={10}
              p={2}
              style={{
                backgroundColor: 'var(--intergalactic-bg-primary-neutral, #FFF)',
                border: '1px solid gray',
              }}
            >
              <ul {...getListProps()}>
                <li {...getItemProps()}>Option 1</li>
                <li {...getItemProps()}>Option 2</li>
                <li {...getItemProps()}>Option 3</li>
                <li {...getItemProps()}>Option 4</li>
                <li {...getItemProps()}>Option 5</li>
              </ul>
              <button type='button' onClick={() => handlers.visible(false)}>
                Close me
              </button>
              <button type='button' onClick={() => handlers.highlightedIndex(2)}>
                Highlight item 3
              </button>
            </Box>
          </React.Fragment>
        );
      }}
    </DropdownMenu>
  );
}
</script>

:::
