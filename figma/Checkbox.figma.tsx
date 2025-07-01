import figma from '@figma/code-connect';
import Checkbox from '@semcore/checkbox';
import { Flex } from '@semcore/flex-box';
import React from 'react';

figma.connect(
  Checkbox,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring--%E2%9D%96-Core-Components?node-id=10063-46204&t=uvqbUJPa7hkmPVOa-11',
  {
    props: {
      label: figma.textContent('↳ text'),
      size: figma.enum('size', {
        L: 'l',
        M: 'm',
      }),
      checked: figma.boolean('checked'),
      indeterminate: figma.boolean('indeterminate'),
      invalid: figma.enum('state', {
        invalid: true,
      }),
      disabled: figma.enum('state', {
        disabled: true,
      }),
      addonLeft: figma.boolean('← addon', {
        true: figma.instance('{ ↳ AddonLeft }'),
        false: undefined,
      }),
      addonRight: figma.boolean('addon →', {
        true: figma.instance('{ ↳ AddonRight }'),
        false: undefined,
      }),
      textAddon: figma.boolean('textAddon →'),
    },
    example: ({ label, size, checked, indeterminate, invalid, disabled, addonLeft, addonRight, textAddon }) => (
      <Checkbox
        label={label}
        size={size}
        checked={checked}
        indeterminate={indeterminate}
        invalid={invalid}
        disabled={disabled}
      // addonLeft={addonLeft}
      // addonRight={addonRight}
      // textAddon={textAddon}
      />
    ),
  },
);

figma.connect(
  Flex,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring--%E2%9D%96-Core-Components?node-id=19530-124198&t=uvqbUJPa7hkmPVOa-11',
  {
    props: {
      size: figma.enum('size', {
        L: 'l',
        M: 'm',
      }),
    },
    example: ({ size }) => (
      <Flex>
        <Checkbox mb={3} size={size} label={/* Add your label */} />
      </Flex>
    ),
  },
);
