import React from 'react';
import Divider from '@semcore/ui/divider';
import { Flex } from '@semcore/ui/flex-box';
import PlaygroundGeneration from '@components/PlaygroundGeneration';

const USE = ['primary', 'secondary'];
const THEMES = ['default', 'invert'];
const ORIENTATIONS = ['horizontal', 'vertical'];

const LayoutPreview = (props) => (
  <Flex justifyContent='center' alignItems='center' w={200} h={100} p={5}>
    {props.children}
  </Flex>
);

export default PlaygroundGeneration(
  (createGroupWidgets) => {
    const { radio } = createGroupWidgets('Divider');

    const use = radio({
      key: 'use',
      defaultValue: 'primary',
      label: 'Use',
      options: USE,
    });

    const theme = radio({
      key: 'theme',
      defaultValue: 'default',
      label: 'Theme',
      options: THEMES,
    });

    const orientation = radio({
      key: 'orientation',
      defaultValue: 'horizontal',
      label: 'Orientation',
      options: ORIENTATIONS,
    });

    return <Divider use={use} theme={theme} orientation={orientation} />;
  },
  { LayoutPreview },
);
