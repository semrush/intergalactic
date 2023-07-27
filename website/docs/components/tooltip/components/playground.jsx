import React from 'react';

import Button from '@semcore/ui/button';
import Tooltip from '@semcore/ui/tooltip';
import PlaygroundGeneration from '@components/PlaygroundGeneration';

const PLACEMENT = [
  'top-start',
  'top',
  'top-end',
  'right-start',
  'right',
  'right-end',
  'bottom-start',
  'bottom',
  'bottom-end',
  'left-start',
  'left',
  'left-end',
];

const EVENT = [
  'hover',
  'click',
  'focus',
];

export default PlaygroundGeneration((createGroupWidgets) => {
  const { radio, select } = createGroupWidgets('Tooltip');

  const interactive = select({
    key: 'interactive',
    defaultValue: 'hover',
    label: 'Interactive event',
    options: EVENT.map((value) => ({
      name: value,
      value,
    })),
  });

  const placement = select({
    key: 'placement',
    defaultValue: 'top',
    label: 'Placement',
    options: PLACEMENT.map((value) => ({
      name: value,
      value,
    })),
  });

  const theme = select({
    key: 'theme',
    defaultValue: 'default',
    label: 'Theme',
    options: [
      {
        name: 'default',
        value: 'default',
      },
      {
        name: 'warning',
        value: 'warning',
      },
      {
        name: 'invert',
        value: 'invert',
      },
    ],
  });

  return (
    <Tooltip
      title='Hey there! I am just a tooltip, not a magic genie, but I am here to sprinkle some knowledge on you!'
      placement={placement}
      interaction={interactive}
      theme={theme}
    >
      <Button>Button</Button>
    </Tooltip>
  );
});
