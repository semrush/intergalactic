import figma from '@figma/code-connect/react';
import { Flex } from '@semcore/ui/base-components';
import Input from '@semcore/ui/input';
import { Text } from '@semcore/ui/typography';
import React from 'react';

// Need somehow to get the readOnly and disabled props from the Input component
// and pass it to the Input.Value component

figma.connect(
  Input.Value,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=52263-2252&t=HtVigJYDbVC6HcLX-11',
  {
    props: {
      value: figma.textContent('↳ text'),
    },
    example: ({ value }) => <Input.Value defaultValue='/* string */' placeholder={value} id='/* id */' />,
  },
);

figma.connect(
  Input,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring--%E2%9D%96-Core-Components?node-id=10043-48576&t=nJSzcLnvK6HvK1l7-11',
  {
    props: {
      size: figma.enum('size', {
        M: 'm',
        L: 'l',
      }),
      state: figma.enum('state', {
        invalid: 'invalid',
        valid: 'valid',
        // disabled: 'disabled',
      }),
      // readOnly: figma.boolean('read-only'),
      addonLeft: figma.boolean('← addon', {
        true: <Input.Addon>{/* addon */}</Input.Addon>,
      }),
      addonRight: figma.boolean('addon →', {
        true: <Input.Addon>{/* addon */}</Input.Addon>,
      }),
      textAddon: figma.boolean('↳ textAddon', {
        true: <Input.Addon>{/* text addon */}</Input.Addon>,
      }),
      placeholder: figma.nestedProps('Input.Value', {
        value: figma.textContent('↳ text'),
      }),
      clearButton: figma.boolean('clear button', {
        true: (
          <Input.Addon>
            <ButtonLink
              use='secondary'
              addonLeft={/* CloseM */}
              title='Clear'
            />
          </Input.Addon>
        ),
        false: undefined,
      }),
    },
    example: ({ size, state, addonLeft, addonRight, textAddon, placeholder, clearButton }) => (
      <Input w='/* width */' size={size} state={state}>
        {addonLeft}
        <Input.Value defaultValue='/* string */' placeholder={placeholder} id='/* id */' />
        {textAddon}
        {addonRight}
        {clearButton}
      </Input>
    ),
  },
);

// Input with label
// TODO: Move these complex examples to the separate file for mappings of all the inputs

figma.connect(
  Input,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=11613-139678&t=TXEgCxM6iJO0FYiJ-11',
  {
    variant: { 'label position': 'top' },
    props: {
      label: figma.textContent('↳ label'),
      input: figma.children('Input'),
    },
    example: ({ label, input }) => (
      <Flex direction='column' gap={2}>
        <Text tag='label' htmlFor='/* input id */' size='/* fontSize */'>
          {label}
        </Text>
        {input}
      </Flex>
    ),
  },
);

figma.connect(
  Input,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=11613-139678&t=TXEgCxM6iJO0FYiJ-11',
  {
    variant: { 'label position': 'left' },
    props: {
      label: figma.textContent('↳ label'),
      input: figma.children('Input'),
    },
    example: ({ label, input }) => (
      <Flex direction='row' gap={6}>
        <Text tag='label' htmlFor='/* input id */' size='/* fontSize */'>
          {label}
        </Text>
        {input}
      </Flex>
    ),
  },
);
