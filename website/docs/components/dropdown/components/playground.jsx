import React from 'react';
import { ButtonTrigger } from '@semcore/base-trigger';
import Dropdown from '@semcore/dropdown';
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
  const { radio, select } = createGroupWidgets('Dropdown');

  const interactive = radio({
    key: 'interactive',
    defaultValue: 'click',
    label: 'Interactive event',
    options: ['hover', 'click', 'focus'],
  });

  const stretch = radio({
    key: 'stretch',
    defaultValue: 'min',
    label: 'Stretch',
    options: ['min', 'fixed'],
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

  return (
    <Dropdown placement={placement} interaction={interactive} stretch={stretch}>
      <Dropdown.Trigger>
        <ButtonTrigger>Trigger</ButtonTrigger>
      </Dropdown.Trigger>
      <Dropdown.Popper>Hello there! I'm Dropdown's content 🤓</Dropdown.Popper>
    </Dropdown>
  );
});
