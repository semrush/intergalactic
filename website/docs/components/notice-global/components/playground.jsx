import React from 'react';

import PlaygroundGeneration from '@components/PlaygroundGeneration';

import NoticeGlobal from '@semcore/notice-global';
import { Box } from '@semcore/flex-box';

const THEME = ['danger', 'warning', 'success', 'info', 'neutral'];

const LayoutPreview = (props) => (
  <Box wMin={200} wMax={500}>
    {props.children}
  </Box>
);

const Preview = (preview) => {
  const { bool, select, radio, text, empty, onChange } = preview('Notice');

  const theme = select({
    key: 'theme',
    label: 'Theme',
    defaultValue: 'neutral',
    options: THEME.map((value) => ({
      name: value,
      value,
    })),
  });

  const closable = bool({
    key: 'closable',
    defaultValue: true,
    label: 'Close icon',
  });

  const msg = text({
    key: 'text',
    defaultValue: 'You can place here your message.',
    label: 'Text',
  });

  const hidden = empty({
    key: 'hidden',
    defaultValue: false,
  });

  function handlerClose() {
    onChange('hidden', true);
    setTimeout(() => {
      onChange('hidden', false);
    }, 2000);
  }

  return (
    <NoticeGlobal
      theme={theme}
      hidden={hidden}
      closable={closable}
      onClose={closable ? handlerClose : false}
    >
      <NoticeGlobal.Content>{msg}</NoticeGlobal.Content>
    </NoticeGlobal>
  );
};

export default PlaygroundGeneration(Preview, { LayoutPreview });
