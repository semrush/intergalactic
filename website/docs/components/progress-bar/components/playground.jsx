import React from 'react';
import styled from 'styled-components';

import ProgressBar from '@semcore/progress-bar';
import PlaygroundGeneration from 'components/PlaygroundGeneration';

const SIZES = ['l', 'm', 's'];

const Wrapper = styled.div`
  width: 300px;
  border-radius: 5px;
  padding: 20px;
`;

const LayoutPreview = (props) => <Wrapper>{props.children}</Wrapper>;

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
