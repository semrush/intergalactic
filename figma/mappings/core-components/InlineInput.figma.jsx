import figma from '@figma/code-connect/react';
import InlineInput from '@semcore/ui/inline-input';

figma.connect(
  InlineInput.Value,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=53372-292643&t=I48qqNRyVr8Tdi87-11',
  {
    props: {
      value: figma.textContent('↳ text'),
    },
    example: ({ value }) => <InlineInput.Value autoFocus placeholder={value} id='/* id */' />,
  },
);

figma.connect(
  InlineInput,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=17000-123421&t=I48qqNRyVr8Tdi87-11',
  {
    props: {
      state: figma.enum('state', {
        invalid: 'invalid',
        valid: 'valid',
      }),
      loading: figma.enum('state', {
        loading: true,
      }),
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
