import type { NSFlex } from '@semcore/ui/base-components';
import { Flex } from '@semcore/ui/base-components';
import type { NSSpin } from '@semcore/ui/spin';
import Spin from '@semcore/ui/spin';
import type { NSText } from '@semcore/ui/typography';
import { Text } from '@semcore/ui/typography';
import React from 'react';

import type { JSXProps } from '../types/JSXProps';
import type { PlaygroundEntry } from '../types/Playground';
import createGithubLink from '../utils/createGHLink';

const Sizes = ['xs', 's', 'm', 'l', 'xl', 'xxl'] as const;
const TextPlacement = ['right', 'bottom'] as const;

type AdditionalJSXProps = {
  text: string;
  size: (typeof Sizes)[number];
  textPlacement: (typeof TextPlacement)[number];
};
export type SpinJSXProps = JSXProps<NSSpin.Props> & AdditionalJSXProps;

const gaps = {
  xs: 1.5,
  s: 1.5,
  m: 2,
  l: 2,
  xl: 4,
  xxl: 4,
};

const textSize: { [key in SpinJSXProps['size']]: NSText.Props['size'] } = {
  xs: 200,
  s: 200,
  m: 200,
  l: 300,
  xl: 300,
  xxl: 300,
};

const textPlacement: { [key in SpinJSXProps['textPlacement']]: NSFlex.Props['direction'] } = {
  right: 'row',
  bottom: 'column',
};

function getJSX(props: SpinJSXProps) {
  return props.text.length
    ? (
        <Flex alignItems='center' gap={gaps[props.size]} direction={textPlacement[props.textPlacement]}>
          <Spin size={props.size} theme={props.theme} />
          <Text size={textSize[props.size]} color='text-secondary'>
            {props.text}
          </Text>
        </Flex>
      )
    : (
        <Spin size={props.size} theme={props.theme} />
      );
}

const entry: PlaygroundEntry<SpinJSXProps> = {
  JSX: (props) => getJSX(props),
  controls: {
    size: {
      type: 'select',
      value: 'm',
      options: [...Sizes],
      displayName: 'Size',
    },
    theme: {
      type: 'inline-radio',
      value: 'dark',
      options: ['dark', 'invert'],
      displayName: 'Theme',
    },
    text: {
      type: 'text',
      value: '',
      displayName: 'Text',
    },
    textPlacement: {
      type: 'inline-radio',
      value: 'right',
      options: [...TextPlacement],
      displayName: 'Text placement',
    },
  },
  link: createGithubLink('spin'),
};

export default entry;
