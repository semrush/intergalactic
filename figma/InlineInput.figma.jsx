import figma from '@figma/code-connect/react';
import InlineInput from '@semcore/ui/inline-input';
import React from 'react';

figma.connect(
  InlineInput.Value,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=53383-2891&t=Q0bSsRErIQ7IEZAU-11',
  {
    props: {
      value: figma.textContent('↳ text'),
    },
    example: ({ value }) => <InlineInput.Value autoFocus placeholder={value} id='/* id */' />,
  },
);

figma.connect(
  InlineInput,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=53383-2898&t=Q0bSsRErIQ7IEZAU-11',
  {
    props: {
      state: figma.enum('state', {
        invalid: 'invalid',
        valid: 'valid',
      }),
      loading: figma.boolean('loading'),
      addonLeft: figma.boolean('← addon', {
        true: <InlineInput.Addon>{/* addon */}</InlineInput.Addon>,
      }),
      value: figma.children('InlineInput.Value'),
    },
    example: ({ state, addonLeft, value, loading }) => (
      <InlineInput state={state} loading={loading}>
        {addonLeft}
        {value}
        <InlineInput.ConfirmControl />
        <InlineInput.CancelControl />
      </InlineInput>
    ),
  },
);