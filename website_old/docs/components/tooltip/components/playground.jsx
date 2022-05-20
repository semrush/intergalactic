import React from 'react';

import Button from '@semcore/button';
import Tooltip from '@semcore/tooltip';
import PlaygroundGeneration from 'components/PlaygroundGeneration';

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

export default PlaygroundGeneration((createGroupWidgets) => {
  const { radio, select } = createGroupWidgets('Tooltip');

  const interactive = radio({
    key: 'interactive',
    defaultValue: 'hover',
    label: 'Interactive event',
    options: ['hover', 'click', 'focus'],
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
      title="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae ea hic ipsam iste mollitia, numquam quia quos sapiente soluta vitae! Corporis culpa cupiditate deserunt dolores fugit libero molestias praesentium repellat?"
      placement={placement}
      interaction={interactive}
      theme={theme}
    >
      <Button>Button</Button>
    </Tooltip>
  );
});
