---
title: SpinContainer
fileSource: spin-container
tabs: Design('spin-container'), A11y('spin-container-a11y'), API('spin-container-api'), Example('spin-container-code'), Changelog('spin-container-changelog')
---

::: react-view

<script lang="tsx">
import React from 'react';
import SpinContainer from 'intergalactic/spin-container';
import PlaygroundGeneration from '@components/PlaygroundGeneration';
import Input from 'intergalactic/input';
import { Box } from 'intergalactic/flex-box';

const playground = (createGroupWidgets) => {
  const { bool, radio, text, select } = createGroupWidgets('SpinContainer');

  const loading = bool({
    key: 'loading',
    defaultValue: true,
    label: 'Loading',
  });

  const theme = radio({
    key: 'theme',
    defaultValue: 'dark',
    label: 'Theme',
    options: ['dark', 'invert'],
  });

  const size = select({
    key: 'size',
    defaultValue: 'xxl',
    label: 'Size',
    options: ['xs', 's', 'm', 'l', 'xl', 'xxl'],
  });

  const background = text({
    key: 'background',
    defaultValue: '',
    label: 'Overlay color',
  });

  return (
    <SpinContainer
      loading={loading}
      theme={theme}
      size={size}
      background={background ? background : undefined}
      p='3px'
    >
      <Box w={150}>
        <h4>User form:</h4>
        <Input mb={2}>
          <Input.Value />
        </Input>
        <Input mb={2}>
          <Input.Value />
        </Input>
        <Input mb={2}>
          <Input.Value />
        </Input>
        <Input mb={2}>
          <Input.Value />
        </Input>
      </Box>
    </SpinContainer>
  );
};

const App = PlaygroundGeneration(playground);
</script>

:::

## Description

**SpinContainer** is a component designed to display the loading state of a form, table, or page, when the exact load time is unknown.

::: tip
This component demonstrates the loading and response to user actions in the interface. For general recommendations regarding such components, refer to the [Loading patterns](/patterns/loading-states/loading-states).
:::

## Appearance

- The [Spin](/components/spin/spin) is consistently positioned in the center of the SpinContainer.
- To create an overlay under the SpinContainer, use the `--overlay-limitation-secondary token`.

![](static/spincontainer-dropdown.png)

