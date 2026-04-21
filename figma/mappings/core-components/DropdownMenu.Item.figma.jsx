import figma from '@figma/code-connect';
import DropdownMenu from '@semcore/ui/dropdown-menu';

// TODO: Add addons
// DropdownMenu.Item/Default without hint

figma.connect(
  DropdownMenu.Item,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=47952-14382',
  {
    variant: { 'hint': 'false', 'actions →': 'false' },
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
      <DropdownMenu.Item value={/* value */} selected={selected} disabled={disabled}>
        {content}
      </DropdownMenu.Item>
    ),
  },
);

figma.connect(
  DropdownMenu.Item,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=47952-14382',
  {
    variant: { 'hint': 'false', 'actions →': 'true' },
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
      <DropdownMenu.Item value={/* value */} selected={selected} disabled={disabled}>
        <DropdownMenu.Item.Content tag={DropdownMenu.Trigger}>
          {content}
        </DropdownMenu.Item.Content>
        <DropdownMenu.Actions gap={1}>
          <DropdownMenu.Item tag={Button} addonLeft={/* Add addon */} title='/* Add title */' />
          <DropdownMenu.Item tag={Button} addonLeft={/* Add addon */} title='/* Add title */' />
        </DropdownMenu.Actions>
      </DropdownMenu.Item>
    ),
  },
);

// DropdownMenu.Item with hint

figma.connect(
  DropdownMenu.Item,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=47952-14382',
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
      <DropdownMenu.Item value={/* value */} selected={selected} disabled={disabled}>
        <DropdownMenu.Item.Content>
          <DropdownMenu.Item.Text>{content}</DropdownMenu.Item.Text>
        </DropdownMenu.Item.Content>
        <DropdownMenu.Item.Hint>{hint}</DropdownMenu.Item.Hint>
      </DropdownMenu.Item>
    ),
  },
);

// DropdownMenu.Item with checkbox without hint

figma.connect(
  DropdownMenu.Item,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=47952-14045',
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
      <DropdownMenu.Item key={/* key */} selected={selected} disabled={disabled} role='menuitemradio'>
        {content}
      </DropdownMenu.Item>
    ),
  },
);

// DropdownMenu.Item with checkbox and hint

figma.connect(
  DropdownMenu.Item,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=47952-14045',
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
      <DropdownMenu.Item key={/* key */} selected={selected} disabled={disabled}>
        <DropdownMenu.Item.Content>
          <DropdownMenu.Item.Text>{content}</DropdownMenu.Item.Text>
        </DropdownMenu.Item.Content>
        <DropdownMenu.Item.Hint>{hint}</DropdownMenu.Item.Hint>
      </DropdownMenu.Item>
    ),
  },
);
