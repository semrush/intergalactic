import Button from '@semcore/ui/button';
import type { DropdownProps } from '@semcore/ui/dropdown';
import Dropdown from '@semcore/ui/dropdown';
import { Text } from '@semcore/ui/typography';
import React from 'react';

import type { JSXProps } from '../types/JSXProps';
import type { PlaygroundEntry } from '../types/Playground';
import createGithubLink from '../utils/createGHLink';

export type DropdownJSXProps = JSXProps<DropdownProps>;

function getJSX({ handleControlChange, ...dropdownProps }: DropdownJSXProps) {
  return (
    <Dropdown {...dropdownProps}>
      <Dropdown.Trigger id='dropdown-trigger'>
        <Button>Trigger</Button>
      </Dropdown.Trigger>
      <Dropdown.Popper p={4} aria-labelledby='dropdown-trigger'>
        <Text size={200}>Hello there! I'm Dropdown's content</Text>
      </Dropdown.Popper>
    </Dropdown>
  );
}

const entry: PlaygroundEntry<DropdownJSXProps> = {
  JSX: (props) => getJSX(props),
  controls: {
    interaction: {
      type: 'inline-radio',
      value: 'click',
      options: ['click', 'focus'],
      displayName: 'Interaction',
    },
    stretch: {
      type: 'inline-radio',
      value: 'min',
      options: ['min', 'fixed'],
      displayName: 'Stretch',
    },
    placement: {
      type: 'select',
      value: 'top',
      options: [
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
      ],
      displayName: 'Placement',
    },
  },
  link: createGithubLink('dropdown'),
};

export default entry;
