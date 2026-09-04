import figma from '@figma/code-connect';
import { LinkTrigger } from '@semcore/ui/base-trigger';
import Select from '@semcore/ui/select';

figma.connect(
  LinkTrigger,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10733-114376&t=TXEgCxM6iJO0FYiJ-11',
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
    example: (props) => <Select tag={LinkTrigger} options={/* options */} {...props} />,
  },
);

figma.connect(
  LinkTrigger,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10733-114376&t=TXEgCxM6iJO0FYiJ-11',
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
      <Select tag={LinkTrigger} options={/* options */} size={size} state={state} loading={loading} disabled={disabled}>
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
  LinkTrigger,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10733-114376&t=TXEgCxM6iJO0FYiJ-11',
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
      <Select tag={LinkTrigger} options={/* options */} size={size} state={state} loading={loading} disabled={disabled} aria-label={title}>
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
