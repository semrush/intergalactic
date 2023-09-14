---
title: SpinContainer
fileSource: spin-container
tabs: Design('spin-container'), A11y('spin-container-a11y'), API('spin-container-api'), Example('spin-container-code'), Changelog('spin-container-changelog')
---

::: react-view

<script lang="tsx">
import React from 'react';
import SpinContainer from '@semcore/ui/spin-container';
import PlaygroundGeneration from '@components/PlaygroundGeneration';
import Input from '@semcore/ui/input';
import { Box } from '@semcore/ui/flex-box';

const playground = (createGroupWidgets) => {
  const { bool, radio, text } = createGroupWidgets('SpinContainer');

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

  const background = text({
    key: 'background',
    defaultValue: '',
    label: 'Overlay color',
  });

  return (
    <SpinContainer
      loading={loading}
      theme={theme}
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

**SpinContainer** is a component designed to display the [Spin](/components/spin/spin) around a component, widget, or page.

## Appearance

- The [Spin](/components/spin/spin) is consistently positioned in the center of the SpinContainer.
- To create an overlay under the SpinContainer, use the `--overlay-limitation-secondary token`.

![](static/spincontainer-dropdown.png)

