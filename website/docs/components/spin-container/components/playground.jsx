import React, { useState } from 'react';
import SpinContainer from '@semcore/spin-container';
import PlaygroundGeneration from 'components/PlaygroundGeneration';
import Input from '@semcore/input';
import { Box } from '@semcore/flex-box';

let backgroundPreview = { color: 'white' };

const MAP_THEME_SPINER = {
  white: 'dark',
  '#333': 'invert',
};

function updateBackgroundPreview(color) {
  backgroundPreview.color = color;
}

const playground = (createGroupWidgets) => {
  // const [backgroundPreview, updatebBackgroundPreview] = useState(background)
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
    options: Object.values(MAP_THEME_SPINER),
  });

  const background = text({
    key: 'background',
    defaultValue: null,
    label: 'Background',
  });

  return (
    <SpinContainer loading={loading} theme={theme} background={background}>
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

export default PlaygroundGeneration(playground, { onChange: updateBackgroundPreview });
