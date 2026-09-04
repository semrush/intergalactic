import figma from '@figma/code-connect/react';
import { Flex } from '@semcore/ui/base-components';
import DropdownMenu from '@semcore/ui/dropdown-menu';
import { Text } from '@semcore/ui/typography';

figma.connect(
  DropdownMenu,
  'https://www.figma.com/design/t7T1SLzIkERV1IrsjsKugE/-Refactoring-WIP--%F0%9F%92%A0-UX-Patterns?node-id=17013-6655&',
  {
    variant: { case: 'default small' },
    props: {
      items: figma.children('DropdownMenu.Item/Default'),
      message: figma.boolean('neutral message ↓', {
        true: figma.children('Message'),
        false: undefined,
      }),
      notice: figma.boolean('notice ↓', {
        true: figma.children('Notice'),
        false: undefined,
      }),
    },
    example: ({ items, message, notice }) => (
      <DropdownMenu>
        <DropdownMenu.Trigger tag={Button}>
          {/* Set trigger here */}
        </DropdownMenu.Trigger>
        <DropdownMenu.Popper wMax='/* Set width here */' aria-label='/* Set aria-label here */'>
          <DropdownMenu.List>
            {items}
          </DropdownMenu.List>
          {message}
          {notice}
        </DropdownMenu.Popper>
      </DropdownMenu>
    ),
  },
);

figma.connect(
  DropdownMenu,
  'https://www.figma.com/design/t7T1SLzIkERV1IrsjsKugE/-Refactoring-WIP--%F0%9F%92%A0-UX-Patterns?node-id=17013-6655&',
  {
    variant: { case: 'default form' },
    props: {
      title: figma.textContent('↳ title'),
      actions: figma.children('Button'),
      message: figma.boolean('neutral message ↓', {
        true: figma.children('Message'),
        false: undefined,
      }),
      notice: figma.boolean('notice ↓', {
        true: figma.children('Notice'),
        false: undefined,
      }),
    },
    example: ({ title, actions, message, notice }) => (
      <DropdownMenu>
        <DropdownMenu.Trigger tag={Button}>
          {/* Set trigger here */}
        </DropdownMenu.Trigger>
        <DropdownMenu.Popper wMax='/* Set width here */' aria-label='/* Set aria-label here */'>
          <Flex direction='column' gap={4} alignItems='start' p={4}>
            <Text size={300} bold>{title}</Text>
            <Flex direction='column' gap={2}>
              {/* Your form here */}
            </Flex>
            <Flex gap={2}>{actions}</Flex>
          </Flex>
          {message}
          {notice}
        </DropdownMenu.Popper>
      </DropdownMenu>
    ),
  },
);
