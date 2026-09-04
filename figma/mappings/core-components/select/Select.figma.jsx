import figma from '@figma/code-connect';
import { Flex } from '@semcore/ui/base-components';
import Select from '@semcore/ui/select';
import { Text } from '@semcore/ui/typography';

figma.connect(
  Select.Trigger,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10171-91601&',
  {
    variant: { '← addon': 'false', 'addon →': 'false', 'icon only': 'false' },
    props: {
      size: figma.enum('size', {
        M: 'm',
        L: 'l',
      }),
      placeholder: figma.textContent('↳ text'),
      state: figma.enum('state', {
        active: 'active',
        invalid: 'invalid',
        valid: 'valid',
      }),
      disabled: figma.enum('state', {
        disabled: true,
      }),
      loading: figma.enum('state', {
        loading: true,
      }),
    },
    example: (props) => <Select options={/* options */} {...props} />,
  },
);

figma.connect(
  Select.Trigger,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10171-91601&',
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
      text: figma.textContent('↳ text'),
      state: figma.enum('state', {
        active: 'active',
        invalid: 'invalid',
        valid: 'valid',
      }),
      disabled: figma.enum('state', {
        disabled: true,
      }),
      loading: figma.enum('state', {
        loading: true,
      }),
    },
    example: ({ size, addonLeft, addonRight, content, state, loading, disabled }) => {
      <Select options={/* options */} size={size} state={state} loading={loading} disabled={disabled} placeholder={/* placeholder */}>
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
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10171-91601&',
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
      loading: figma.enum('state', {
        loading: true,
      }),
      title: figma.textContent('↳ title'),
    },
    example: ({ size, addonLeft, state, loading, disabled, title }) => (
      <Select options={/* options */} size={size} state={state} loading={loading} disabled={disabled} aria-label={title}>
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

// Select.Trigger with label

figma.connect(
  Select.Trigger,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactored--%E2%9D%96-Core-Components?node-id=13071-112318',
  {
    variant: { 'label position': 'top' },
    props: {
      label: figma.children('Input.Label'),
      input: figma.children('Select.Trigger'),
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
  Select.Trigger,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactored--%E2%9D%96-Core-Components?node-id=13071-112318',
  {
    variant: { 'label position': 'left' },
    props: {
      label: figma.children('Input.Label'),
      input: figma.children('Select.Trigger'),
    },
    example: ({ label, input }) => (
      <Flex gap={6}>
        {label}
        {input}
      </Flex>
    ),
  },
);
