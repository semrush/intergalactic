import figma from '@figma/code-connect/react';
import CloseM from '@semcore/icon/Close/m';
import { Flex } from '@semcore/ui/base-components';
import { ButtonLink } from '@semcore/ui/button';
import Input from '@semcore/ui/input';
import { Text } from '@semcore/ui/typography';

// Need somehow to get the readOnly and disabled props from the Input component
// and pass it to the Input.Value component

figma.connect(
  Input.Value,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=52263-2252',
  {
    props: {
      value: figma.textContent('↳ text'),
    },
    example: ({ value }) => <Input.Value placeholder={value} id='/* id */' />,
  },
);

figma.connect(
  Flex,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactored--%E2%9D%96-Core-Components?node-id=56781-2200',
  {
    variant: {
      'label position': 'top',
    },
    props: {
      label: figma.textContent('↳ label'),
      addon: figma.children('*'),
      optional: figma.boolean('optional', {
        true: (
          <Text size='/* fontSize */' color='text-secondary'>
            (optional)
          </Text>
        ),
        false: undefined,
      }),
      counter: figma.boolean('counter', {
        true: figma.children('Counter'),
        false: undefined,
      }),
      infoIcon: figma.boolean('informer', {
        true: figma.children('Info icon with tooltip (Informer)'),
        false: undefined,
      }),
    },
    example: ({ label, addon, optional, counter, infoIcon }) => (
      <Flex direction='row' gap={1}>
        <Text tag='label' htmlFor='/* input id */' size='/* fontSize */'>
          {label}
        </Text>
        {optional}
        {counter}
        {infoIcon}
        {addon}
      </Flex>
    ),
  },
);

figma.connect(
  Flex,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactored--%E2%9D%96-Core-Components?node-id=56781-2200',
  {
    variant: {
      'label position': 'left',
    },
    props: {
      label: figma.textContent('↳ label'),
      addon: figma.children('*'),
      optional: figma.boolean('optional', {
        true: (
          <Text size='/* fontSize */' color='text-secondary'>
            (optional)
          </Text>
        ),
        false: undefined,
      }),
      counter: figma.boolean('counter', {
        true: figma.children('Counter'),
        false: undefined,
      }),
      infoIcon: figma.boolean('informer', {
        true: figma.children('Info icon with tooltip (Informer)'),
        false: undefined,
      }),
    },
    example: ({ label, addon, optional, counter, infoIcon }) => (
      <Flex direction='column' gap={1}>
        <Text tag='label' htmlFor='/* input id */' size='/* fontSize */'>
          {label}
        </Text>
        {optional}
        {counter}
        {infoIcon}
        {addon}
      </Flex>
    ),
  },
);

figma.connect(
  Input,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring--%E2%9D%96-Core-Components?node-id=10043-48576',
  {
    props: {
      size: figma.enum('size', {
        M: 'm',
        L: 'l',
      }),
      state: figma.enum('state', {
        invalid: 'invalid',
        valid: 'valid',
      }),
      // disabled: figma.enum('state', {
      //   disabled: true,
      // }),
      // readOnly: figma.boolean('read-only'),
      addonLeft: figma.boolean('← addon', {
        true: <Input.Addon>{/* addon */}</Input.Addon>,
      }),
      addonRight: figma.boolean('addon →', {
        true: <Input.Addon>{/* addon */}</Input.Addon>,
      }),
      textAddon: figma.boolean('textAddon ->', {
        true: <Input.Addon>{/* text addon */}</Input.Addon>,
      }),
      value: figma.children('Input.Value'),
      clearButton: figma.boolean('clear button', {
        true: (
          <Input.Addon>
            <ButtonLink
              use='secondary'
              addonLeft={CloseM}
              title='Clear'
            />
          </Input.Addon>
        ),
        false: undefined,
      }),
    },
    example: ({ size, state, addonLeft, addonRight, textAddon, value, clearButton, disabled, readOnly }) => (
      <Input size={size} state={state}>
        {addonLeft}
        {value}
        {textAddon}
        {addonRight}
        {clearButton}
      </Input>
    ),
  },
);

// Input with label
// TODO: Move these complex examples to the separate file for mappings of all the inputs?

figma.connect(
  Flex,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=11613-139678',
  {
    variant: { 'label position': 'top' },
    props: {
      label: figma.children('Input.Label'),
      input: figma.children('Input'),
    },
    example: ({ label, input }) => (
      <Flex direction='column' gap={2}>
        {label}
        {input}
      </Flex>
    ),
  },
);

figma.connect(
  Input,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=11613-139678',
  {
    variant: { 'label position': 'left' },
    props: {
      label: figma.children('Input.Label'),
      input: figma.children('Input'),
    },
    example: ({ label, input }) => (
      <Flex direction='row' gap={6}>
        {label}
        {input}
      </Flex>
    ),
  },
);
