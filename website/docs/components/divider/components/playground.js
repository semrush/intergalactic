import React from 'react';
import Divider from '@semcore/divider';
import PlaygroundGeneration from 'components/PlaygroundGeneration';
import styled from 'styled-components';

const USE = ['primary', 'secondary'];
const THEMES = ['default', 'invert'];
const ORIENTATIONS = ['horizontal', 'vertical'];

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 200px;
  padding: 20px;
  box-sizing: border-box;
`;

const LayoutPreview = (props) => <Wrapper>{props.children}</Wrapper>;

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
