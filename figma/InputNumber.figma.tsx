import figma from '@figma/code-connect';
import Flex from '@semcore/flex-box';
import InputNumber from '@semcore/input-number';
import React from 'react';

// TODO: Update links to actual nodes

// Need somehow to get the readOnly and disabled props from the Input component
// and pass it to the Input.Value component

figma.connect(
  InputNumber.Value,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=52753-1153&t=CQtTqD9cubPV2oYP-11',
  {
    props: {
      value: figma.textContent('↳ text'),
    },
    example: ({ value }) => (
      <InputNumber.Value
        defaultValue='/* string */'
        placeholder={value}
        id='/* id */'
        max='/* number */'
        min='/* number */'
        step='/* number */'
      />
    ),
  },
);

figma.connect(
  InputNumber,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring--%E2%9D%96-Core-Components?node-id=10162-90608&t=nJSzcLnvK6HvK1l7-11',
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
        true: <InputNumber.Addon>{/* addon */}</InputNumber.Addon>,
      }),
      inputValue: figma.children('InputNumber.Value'),
      showControls: figma.boolean('show controls', {
        true: <InputNumber.Controls />,
        false: undefined,
      }),
    },
    example: ({ size, state, addonLeft, inputValue, showControls }) => (
      <InputNumber w='/* width */' size={size} state={state}>
        {addonLeft}
        {inputValue}
        {showControls}
      </InputNumber>
    ),
  },
);

// TODO: How to add neighborLocation props to the InputNumber components?

figma.connect(
  Flex,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10162-90618&t=TXEgCxM6iJO0FYiJ-11',
  {
    props: {
      children: figma.children('InputNumber'),
    },
    example: ({ children }) => <Flex>{children}</Flex>,
  },
);
