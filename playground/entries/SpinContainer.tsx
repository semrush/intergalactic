import { Flex } from '@semcore/ui/base-components';
import Input from '@semcore/ui/input';
import type { NSSpinContainer } from '@semcore/ui/spin-container';
import SpinContainer from '@semcore/ui/spin-container';
import { Text } from '@semcore/ui/typography';
import React from 'react';

import type { JSXProps } from '../types/JSXProps';
import type { PlaygroundEntry } from '../types/Playground';
import createGithubLink from '../utils/createGHLink';

export type SpinContainerJSXProps = JSXProps<NSSpinContainer.Props>;

function getJSX(props: SpinContainerJSXProps) {
  return (
    <SpinContainer
      loading={props.loading}
      theme={props.theme}
      size={props.size}
      background={props.background ? props.background : undefined}
      p='3px'
    >
      <Flex direction='column' gap={2} w={150}>
        <Text tag='label' size={200} htmlFor='input-1'>
          Input 1
        </Text>
        <Input>
          <Input.Value id='input-1' />
        </Input>
        <Text tag='label' size={200} htmlFor='input-2' mt={2}>
          Input 2
        </Text>
        <Input>
          <Input.Value id='input-2' />
        </Input>
      </Flex>
    </SpinContainer>
  );
}

const entry: PlaygroundEntry<SpinContainerJSXProps> = {
  JSX: (props) => getJSX(props),
  controls: {
    loading: {
      type: 'boolean',
      value: true,
      displayName: 'Loading',
    },
    theme: {
      type: 'inline-radio',
      value: 'default',
      options: ['default', 'invert'],
      displayName: 'Theme',
    },
    size: {
      type: 'select',
      value: 'xxl',
      options: ['xs', 's', 'm', 'l', 'xl', 'xxl'],
      displayName: 'Size',
    },
    background: {
      type: 'text',
      value: '',
      displayName: 'Overlay color',
    },
  },
  link: createGithubLink('spin-container'),
};

export default entry;
