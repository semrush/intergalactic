import figma from '@figma/code-connect/react';
import { Flex } from '@semcore/ui/base-components';
import { Text } from '@semcore/ui/typography';

// Message with text content

figma.connect(
  Flex,
  'https://www.figma.com/design/t7T1SLzIkERV1IrsjsKugE/-Refactoring-WIP--%F0%9F%92%A0-UX-Patterns?node-id=143-196596&',
  {
    variant: { platform: 'desktop', content: 'text' },
    props: {
      title: figma.textContent('↳ title'),
      text: figma.textContent('↳ text'),
      actions: figma.children('Button'),
    },
    example: ({ title, text, actions }) => (
      <Flex gap={10}>
        <img src='/* Place your illustration here */' />
        <Flex direction='column'>
          <Text mb={3} size={300} bold>{title}</Text>
          <Text size={200}>{text}</Text>
          <Flex mt={5} gap={2}>
            {actions}
          </Flex>
        </Flex>
      </Flex>
    ),
  },
);

figma.connect(
  Flex,
  'https://www.figma.com/design/t7T1SLzIkERV1IrsjsKugE/-Refactoring-WIP--%F0%9F%92%A0-UX-Patterns?node-id=143-196596&',
  {
    variant: { platform: 'mobile', content: 'text' },
    props: {
      title: figma.textContent('↳ title'),
      text: figma.textContent('↳ text'),
      actions: figma.children('Button'),
    },
    example: ({ title, text, actions }) => (
      <Flex direction='column' gap={10}>
        <img src='/* Place your illustration here */' />
        <Flex direction='column'>
          <Text mb={3} size={300} bold>{title}</Text>
          <Text size={200}>{text}</Text>
          <Flex mt={5} gap={2} direction='column'>
            {actions}
          </Flex>
        </Flex>
      </Flex>
    ),
  },
);

// Message with a form

figma.connect(
  Flex,
  'https://www.figma.com/design/t7T1SLzIkERV1IrsjsKugE/-Refactoring-WIP--%F0%9F%92%A0-UX-Patterns?node-id=143-196596&',
  {
    variant: { platform: 'desktop', content: 'form' },
    props: {
      title: figma.textContent('↳ title'),
      text: figma.textContent('↳ text'),
      input: figma.children('Input'),
      actions: figma.children('Button'),
    },
    example: ({ title, text, input, actions }) => (
      <Flex gap={10}>
        <img src='/* Place your illustration here */' />
        <Flex direction='column'>
          <Text mb={3} size={300} bold>{title}</Text>
          <Text size={200}>{text}</Text>
          <Flex mt={5} gap={2}>
            {input}
            {actions}
          </Flex>
        </Flex>
      </Flex>
    ),
  },
);

figma.connect(
  Flex,
  'https://www.figma.com/design/t7T1SLzIkERV1IrsjsKugE/-Refactoring-WIP--%F0%9F%92%A0-UX-Patterns?node-id=143-196596&',
  {
    variant: { platform: 'mobile', content: 'form' },
    props: {
      title: figma.textContent('↳ title'),
      text: figma.textContent('↳ text'),
      actions: figma.children('Button'),
      input: figma.children('Input'),
    },
    example: ({ title, text, input, actions }) => (
      <Flex direction='column' gap={10}>
        <img src='/* Place your illustration here */' />
        <Flex direction='column'>
          <Text mb={3} size={300} bold>{title}</Text>
          <Text size={200}>{text}</Text>
          <Flex mt={5} gap={2} direction='column'>
            {input}
            {actions}
          </Flex>
        </Flex>
      </Flex>
    ),
  },
);

// Message with a list

figma.connect(
  Flex,
  'https://www.figma.com/design/t7T1SLzIkERV1IrsjsKugE/-Refactoring-WIP--%F0%9F%92%A0-UX-Patterns?node-id=143-196596&',
  {
    variant: { platform: 'desktop', content: 'list' },
    props: {
      title: figma.textContent('↳ title'),
      text: figma.textContent('↳ text'),
      list: figma.children('List'),
      actions: figma.children('Button'),
    },
    example: ({ title, text, list, actions }) => (
      <Flex gap={10}>
        <img src='/* Place your illustration here */' />
        <Flex direction='column'>
          <Text mb={3} size={300} bold>{title}</Text>
          <Text size={200}>{text}</Text>
          {list}
          <Flex mt={5} gap={2}>
            {actions}
          </Flex>
        </Flex>
      </Flex>
    ),
  },
);

figma.connect(
  Flex,
  'https://www.figma.com/design/t7T1SLzIkERV1IrsjsKugE/-Refactoring-WIP--%F0%9F%92%A0-UX-Patterns?node-id=143-196596&',
  {
    variant: { platform: 'mobile', content: 'list' },
    props: {
      title: figma.textContent('↳ title'),
      text: figma.textContent('↳ text'),
      actions: figma.children('Button'),
      list: figma.children('List'),
    },
    example: ({ title, text, list, actions }) => (
      <Flex direction='column' gap={10}>
        <img src='/* Place your illustration here */' />
        <Flex direction='column'>
          <Text mb={3} size={300} bold>{title}</Text>
          <Text size={200}>{text}</Text>
          {list}
          <Flex mt={5} gap={2} direction='column'>
            {actions}
          </Flex>
        </Flex>
      </Flex>
    ),
  },
);
