import figma from '@figma/code-connect';
import Select from '@semcore/ui/select';

// TODO: Add addons
// Select.Option.Checkbox without hint

figma.connect(
  Select.Option,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=11805-136032&t=TXEgCxM6iJO0FYiJ-11',
  {
    variant: { hint: 'false' },
    props: {
      content: figma.textContent('↳ text'),
      selected: figma.enum('state', {
        selected: true,
      }),
      disabled: figma.enum('state', {
        disabled: true,
      }),
    },
    example: ({ content, selected, disabled }) => (
      <Select.Option value={/* value */} selected={selected} disabled={disabled}>
        <Select.Option.Checkbox />
        {content}
      </Select.Option>
    ),
  },
);

// Select.Option.Checkbox with hint

figma.connect(
  Select.Option,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=11805-136032&t=TXEgCxM6iJO0FYiJ-11',
  {
    variant: { hint: 'true' },
    props: {
      content: figma.textContent('↳ text'),
      selected: figma.enum('state', {
        selected: true,
      }),
      disabled: figma.enum('state', {
        disabled: true,
      }),
      hint: figma.textContent('↳ hint'),
    },
    example: ({ content, selected, disabled, hint }) => (
      <Select.Option value={/* value */} selected={selected} disabled={disabled}>
        <Select.Option.Content>
          <Select.Option.Checkbox />
          {content}
        </Select.Option.Content>
        <Select.Option.Hint>{hint}</Select.Option.Hint>
      </Select.Option>
    ),
  },
);
