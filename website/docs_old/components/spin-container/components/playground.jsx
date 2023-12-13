import React from 'react';
import SpinContainer from '@semcore/ui/spin-container';
import PlaygroundGeneration from '@components/PlaygroundGeneration';
import Input from '@semcore/ui/input';
import { Box } from '@semcore/ui/flex-box';

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

export default PlaygroundGeneration(playground);
