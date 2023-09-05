import React from 'react';
import { Box } from '@semcore/flex-box';

import ProgressBar from '@semcore/ui/progress-bar';
import PlaygroundGeneration from '@components/PlaygroundGeneration';

const SIZES = ['l', 'm', 's'];

const LayoutPreview = (props) => (
  <Box w={200} p={5}>
    {props.children}
  </Box>
);

const Preview = (preview) => {
  const { radio, text, select } = preview('ProgressBar');

  const size = radio({
    key: 'size',
    defaultValue: 'm',
    label: 'Size',
    options: SIZES,
  });

  const theme = select({
    key: 'theme',
    defaultValue: 'invert',
    label: 'Theme',
    options: [
      {
        name: 'invert',
        value: 'invert',
      },
      {
        name: 'dark',
        value: 'dark',
      },
    ],
  });

  const duration = text({
    key: 'duration',
    defaultValue: 1000,
    label: 'Duration',
  });

  const value = text({
    key: 'value',
    defaultValue: 50,
    label: 'Value',
  });

  return <ProgressBar theme={theme} size={size} duration={duration} value={value} />;
};

export default PlaygroundGeneration(Preview, { LayoutPreview });
