import figma from '@figma/code-connect';
import Input from '@semcore/input';
import React from 'react';

figma.connect(
  Input.Value,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=52263-2252&t=HtVigJYDbVC6HcLX-11',
  {
    props: {
      value: figma.textContent('↳ text'),
    },

    example: ({ value }) => <Input.Value>{value}</Input.Value>,
  },
);

// Need somehow to get the value from the Input.Value component
// and pass it to the Input component
// and save props set on the Input.Value

figma.connect(
  Input,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring--%E2%9D%96-Core-Components?node-id=10043-48576&t=nJSzcLnvK6HvK1l7-11',
  {
    props: {
      value: figma.children(['Input.Value']),
      size: figma.enum('size', {
        M: 'm',
        L: 'l',
      }),
      state: figma.enum('state', {
        normal: 'normal',
        invalid: 'invalid',
        valid: 'valid',
        disabled: 'disabled',
      }),
      readOnly: figma.boolean('read-only'),
      addonLeft: figma.boolean('← addon', {
        true: <Input.Addon>{/* addon */}</Input.Addon>,
      }),
      addonRight: figma.boolean('addon →', {
        true: <Input.Addon>{/* addon */}</Input.Addon>,
      }),
      textAddon: figma.boolean('↳ textAddon', {
        true: <Input.Addon>{/* text addon */}</Input.Addon>,
      }),

      example: ({ value, size, state, disabled, readOnly, addonLeft, addonRight, textAddon }) => (
        <Input size={size} state={state}>
          {addonLeft}
          <Input.Value disabled={disabled} readOnly={readOnly} placeholder='Add your placeholder'>{value}</Input.Value>
          {textAddon}
          {addonRight}
        </Input>
      ),
    },
  },
);
