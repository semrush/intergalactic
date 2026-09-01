import { Flex } from '@semcore/ui/base-components';
import type { NSRadioCards } from '@semcore/ui/radio-cards';
import RadioCards from '@semcore/ui/radio-cards';
import React from 'react';

import type { JSXProps } from '../types/JSXProps';
import type { PlaygroundEntry } from '../types/Playground';
import createGithubLink from '../utils/createGHLink';
import renderIcon from '../utils/renderIcon';

export type RadioCardsJSXProps = JSXProps<Partial<NSRadioCards.Props>> & JSXProps<Partial<NSRadioCards.Item.Props>>;

function getJSX({ handleControlChange, ...props }: RadioCardsJSXProps) {
  return (
    <Flex bg='bg-secondary-neutral' p={3} w='100%' direction='column'>
      <RadioCards
        aria-label='Radio cards'
        name='radio-cards'
        onChange={(value) => handleControlChange?.('value', value)}
      >
        <RadioCards.Item value='all' text='All' textAddon='~9,000' />
        <RadioCards.Item
          value='best'
          text={props.text}
          textAddon={props.textAddon}
          description={props.description}
          iconAddon={props.iconAddon ? renderIcon('before', 'm') : undefined}
          disabled={props.disabled}
        />
      </RadioCards>
    </Flex>
  );
}

const entry: PlaygroundEntry<RadioCardsJSXProps> = {
  JSX: (props) => getJSX(props),
  controls: {
    text: {
      type: 'text',
      value: 'Best',
      displayName: 'Text',
    },
    iconAddon: {
      type: 'boolean',
      value: false,
      displayName: 'Icon addon',
    },
    textAddon: {
      type: 'text',
      value: '300',
      displayName: 'Text addon',
    },
    description: {
      type: 'text',
      value: 'Secondary text',
      displayName: 'Description',
    },
    disabled: {
      type: 'boolean',
      value: false,
      displayName: 'Disabled',
    },
  },
  link: createGithubLink('radio-cards'),
};

export default entry;
