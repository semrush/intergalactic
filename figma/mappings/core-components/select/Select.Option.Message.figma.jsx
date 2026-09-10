import figma from '@figma/code-connect';
import { Flex } from '@semcore/ui/base-components';
import Button, { ButtonLink } from '@semcore/ui/button';
import Notice from '@semcore/ui/notice';
import { Text } from '@semcore/ui/typography';

// "Loading" message

figma.connect(
  Flex,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=12179-115948&t=TXEgCxM6iJO0FYiJ-11',
  {
    props: {
      text: figma.textContent('↳ text'),
    },
    example: ({ text }) => (
      <Flex direction='column' alignItems='start' gap={1} p={2}>
        <Text size={/* fontSize */} use='secondary' aria-live='polite' role='status'>
          {text}
        </Text>
      </Flex>
    ),
  },
);

// "Nothing found" message

figma.connect(
  Flex,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=12179-116073&m=dev',
  {
    props: {
      text: figma.textContent('↳ text'),
    },
    example: ({ text }) => (
      <Flex direction='column' alignItems='start' gap={1} p={2}>
        <Text size={/* fontSize */} use='secondary' aria-live='polite' role='status'>
          {text}
        </Text>
      </Flex>
    ),
  },
);

// "Error" message

figma.connect(
  Flex,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=12179-116078&t=TXEgCxM6iJO0FYiJ-11',
  {
    props: {
      text: figma.textContent('↳ text'),
      button: figma.boolean('button', {
        true: <ButtonLink addonLeft={/* ReloadIcon */} onClick={/* handleReloadClick */}>Reload</ButtonLink>,
        false: undefined,
      }),
    },
    example: ({ text, button }) => (
      <Flex direction='column' alignItems='start' gap={1} p={2}>
        <Text size={/* fontSize */} use='secondary' aria-live='polite' role='status'>
          {text}
        </Text>
        {button}
      </Flex>
    ),
  },
);

// Neutral message

figma.connect(
  Flex,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=11448-133731&t=TXEgCxM6iJO0FYiJ-11',
  {
    props: {
      title: figma.textContent('↳ title'),
      text: figma.textContent('↳ text'),
      controls: figma.boolean('controls', {
        true: <Button />,
        false: undefined,
      }),
    },
    example: ({ title, text, controls }) => (
      <Flex direction='column' alignItems='start'>
        <Text size={/* fontSize */} bold mb={2}>
          {title}
        </Text>
        <Text size={/* fontSize */} mb={1}>
          {text}
        </Text>
        {controls}
      </Flex>
    ),
  },
);

// Notice with styles for menus

figma.connect(
  Flex,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=11448-133730&t=TXEgCxM6iJO0FYiJ-11',
  {
    props: {
      title: figma.textContent('↳ title'),
      text: figma.textContent('↳ text'),
      theme: figma.enum('theme', {
        '🟢 limit': 'success',
        '🔴 danger': 'danger',
        '🟠 warning': 'warning',
        '⚪️ muted': 'muted',
      }),
      // label: figma.children('iconContainer'),
      controls: figma.boolean('controls', {
        true: <Button />,
        false: undefined,
      }),
    },
    example: ({ title, text, theme, controls }) => (
      <Notice
        theme={theme}
        style={{
          border: 'none',
          borderRadius: '0 0 6px 6px',
          padding: '12px 8px',
        }}
      >
        <Notice.Content>
          <Notice.Label>
            {/* icon */}
          </Notice.Label>
          <Notice.Title>
            {title}
          </Notice.Title>
          <Notice.Text>
            {text}
          </Notice.Text>
          <Notice.Actions>
            {controls}
          </Notice.Actions>
        </Notice.Content>
      </Notice>
    ),
  },
);
