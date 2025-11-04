import figma from '@figma/code-connect';
import type { iso2Name } from '@semcore/ui/flags';
import Flags from '@semcore/ui/flags';
import Select from '@semcore/ui/select';

// TODO: Add addons

figma.connect(
  Select.Option,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=11805-136094&t=TXEgCxM6iJO0FYiJ-11',
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
        <Flags iso2={/* value as keyof typeof iso2Name */} mr={2} />
        {/* {formatName(iso2Name[value])} */}
        {content}
      </Select.Option>
    ),
  },
);

figma.connect(
  Select.Option,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=11805-136094&t=TXEgCxM6iJO0FYiJ-11',
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
          <Flags iso2={/* value as keyof typeof iso2Name */} mr={2} />
          {/* {formatName(iso2Name[value])} */}
          {content}
        </Select.Option.Content>
        <Select.Option.Hint>{hint}</Select.Option.Hint>
      </Select.Option>
    ),
  },
);
