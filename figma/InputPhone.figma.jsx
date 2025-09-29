import figma from '@figma/code-connect/react';
import { ButtonLink } from '@semcore/ui/button';
import Flag, { iso2Name } from '@semcore/ui/flags';
import { Box } from '@semcore/ui/base-components';
import Input from '@semcore/ui/input';
import React from 'react';

// Need somehow to get the readOnly and disabled props from the Input component
// and pass it to the Input.Value component

figma.connect(
  Input.Value,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=52263-2252&t=HtVigJYDbVC6HcLX-11',
  {
    example: () => (
      <Input.Value
        value='/* value */'
        defaultValue='/* string */'
        type='tel'
        autoComplete='tel'
        id='/* id */'
      />
    ),
  },
);

// Unknown country and number format

figma.connect(
  Input,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10264-98074&t=TXEgCxM6iJO0FYiJ-11',
  {
    variant: {
      type: 'default',
    },
    props: {
      size: figma.enum('size', {
        M: 'm',
        L: 'l',
      }),
      state: figma.enum('state', {
        invalid: 'invalid',
        valid: 'valid',
      }),
      inputValue: figma.children('Input.Value'),
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
    example: ({ size, state, inputValue, clearButton }) => (
      <Input w='/* width */' size={size} state={state}>
        {inputValue}
        {clearButton}
      </Input>
    ),
  },
);

// Known country and unknown number format

figma.connect(
  Input,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10264-98074&t=TXEgCxM6iJO0FYiJ-11',
  {
    variant: {
      type: 'country code',
    },
    props: {
      size: figma.enum('size', {
        M: 'm',
        L: 'l',
      }),
      state: figma.enum('state', {
        invalid: 'invalid',
        valid: 'valid',
      }),
      inputValue: figma.children('Input.Value'),
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
    example: ({ size, state, inputValue, clearButton }) => (
      <Input w='/* width */' size={size} state={state}>
        <Input.Addon>
          <Flag iso2={/* value */} role='img' aria-label={/* {iso2Name['US']} */} />
        </Input.Addon>
        {inputValue}
        {clearButton}
      </Input>
    ),
  },
);

// Known country and number format
// TODO: How to add neighborLocation props to the InputPhone components?

figma.connect(
  Box,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10264-98074&t=TXEgCxM6iJO0FYiJ-11',
  {
    variant: {
      type: 'country code and format',
    },
    props: {
      size: figma.enum('size', {
        M: 'm',
        L: 'l',
      }),
      state: figma.enum('state', {
        invalid: 'invalid',
        valid: 'valid',
      }),
      select: figma.children('Select.Trigger'),
      inputValue: figma.children('Input.Value'),
    },
    example: ({ size, state, select, inputValue }) => (
      <Box>
        {select}
        <Input w='/* width */' size={size} state={state}>{inputValue}</Input>
      </Box>
    ),
  },
);
