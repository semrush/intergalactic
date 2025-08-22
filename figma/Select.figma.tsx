import figma from '@figma/code-connect';
import Select from '@semcore/select';
import React from 'react';

figma.connect(
  Select.Trigger,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10171-91601&t=UlTa6oEFj0Vk1UAt-11',
  {
    variant: { '← addon': 'false', 'addon →': 'false', 'icon only': 'false' },
    props: {
      size: figma.enum('size', {
        M: 'm',
        L: 'l',
      }),
      placeholder: figma.string('↳ text'),
      state: figma.enum('state', {
        active: 'active',
        invalid: 'invalid',
        valid: 'valid',
      }),
      disabled: figma.enum('state', {
        disabled: true,
      }),
      loading: figma.boolean('loading'),
    },
    example: (props) => <Select {...props} />,
  },
);

figma.connect(
  Select.Trigger,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10171-91601&t=UlTa6oEFj0Vk1UAt-11',
  {
    variant: { 'icon only': 'false' },
    props: {
      size: figma.enum('size', {
        M: 'm',
        L: 'l',
      }),
      addonLeft: figma.enum('icon only', {
        false: figma.boolean('← addon', {
          true: <Select.Trigger.Addon>{/* addon */}</Select.Trigger.Addon>,
        }),
      }),
      addonRight: figma.enum('icon only', {
        false: figma.boolean('addon →', {
          true: <Select.Trigger.Addon>{/* addon */}</Select.Trigger.Addon>,
        }),
      }),

      content: figma.enum('icon only', {
        false: figma.boolean('← addon', {
          true: <Select.Trigger.Text>{/* text */}</Select.Trigger.Text>,
          false: figma.boolean('addon →', {
            true: <Select.Trigger.Text>{/* text */}</Select.Trigger.Text>,
            false: '{/* text */}',
          }),
        }),
      }),
      text: figma.string('↳ text'),
      state: figma.enum('state', {
        active: 'active',
        invalid: 'invalid',
        valid: 'valid',
      }),
      disabled: figma.enum('state', {
        disabled: true,
      }),
      loading: figma.boolean('loading'),
    },
    example: ({ size, addonLeft, addonRight, content, state, loading, disabled }) => {
      <Select size={size} state={state} loading={loading} disabled={disabled}>
        <Select.Trigger>
          {addonLeft}
          {content}
          {addonRight}
        </Select.Trigger>
        <Select.Menu hMax={/* value */}>
          <Select.Option key={/* value */} value={/* value */}>
            {/* option */}
          </Select.Option>
        </Select.Menu>
      </Select>;
    },
  },
);

figma.connect(
  Select.Trigger,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10171-91601&t=UlTa6oEFj0Vk1UAt-11',
  {
    variant: { 'icon only': 'true' },
    props: {
      size: figma.enum('size', {
        M: 'm',
        L: 'l',
      }),
      addonLeft: figma.children('← - - addon properties'),
      state: figma.enum('state', {
        active: 'active',
        invalid: 'invalid',
        valid: 'valid',
      }),
      disabled: figma.enum('state', {
        disabled: true,
      }),
      loading: figma.boolean('loading'),
    },
    example: ({ size, addonLeft, state, loading, disabled }) => (
      <Select size={size} state={state} loading={loading} disabled={disabled}>
        <Select.Trigger>
          <Select.Trigger.Addon>{addonLeft}</Select.Trigger.Addon>
        </Select.Trigger>
        <Select.Menu hMax={/* value */}>
          <Select.Option key={/* value */} value={/* value */}>
            {/* option */}
          </Select.Option>
        </Select.Menu>
      </Select>
    ),
  },
);
