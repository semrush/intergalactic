import React from 'react';

import PlaygroundGeneration from 'components/PlaygroundGeneration';

import Notice from '@semcore/notice';
import { Text } from '@semcore/typography';
import { Box } from '@semcore/flex-box';
import Button from '@semcore/button';
import QuestionAltS from '@semcore/icon/lib/QuestionAlt/s';

const THEME = ['danger', 'warning', 'success', 'info'];
const USE = ['primary', 'secondary'];

const LayoutPreview = (props) => (
  <Box wMin={200} wMax={500}>
    {props.children}
  </Box>
);

const Preview = (preview) => {
  const { bool, select, radio, text, empty, onChange } = preview('Notice');

  const use = radio({
    key: 'use',
    defaultValue: 'secondary',
    label: 'Use',
    options: Object.values(USE),
  });

  const theme = select({
    key: 'theme',
    label: 'Theme',
    defaultValue: 'info',
    options: THEME.map((value) => ({
      name: value,
      value,
    })),
  });

  const label = bool({
    key: 'label',
    defaultValue: true,
    label: 'Label',
  });

  const actions = bool({
    key: 'actions',
    defaultValue: true,
    label: 'Actions',
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
    <Notice use={use} theme={theme} hidden={hidden}>
      {label && (
        <Notice.Label>
          <QuestionAltS />
        </Notice.Label>
      )}
      <Notice.Content>
        <Text size={300} bold tag="p" mb={2}>
          Look at this cool notice!
        </Text>
        {msg}
        {actions && (
          <Notice.Actions>
            <Button use="primary" theme="success">
              Wow, so cool!
            </Button>
            <Button use="tertiary" ml={2}>
              Don't think so
            </Button>
          </Notice.Actions>
        )}
      </Notice.Content>
      {closable && <Notice.CloseIcon onClick={handlerClose} />}
    </Notice>
  );
};

export default PlaygroundGeneration(Preview, { LayoutPreview });
