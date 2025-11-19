import figma from '@figma/code-connect/react';
import { Flex } from '@semcore/ui/base-components';
import { Text } from '@semcore/ui/typography';
import MailSent from '@semcore/ui/illustration/MailSent'

figma.connect(
  Flex,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=55508-4841&t=tjfdRa8KRbX0lwpz-11',
  {
    props: {
      text: figma.textContent('↳ text'),
      children: figma.children('*'),
    },
    example: ({ text, children }) => (
        <Flex direction='column' gap={4}>
          <Text size={/* font size */} tag='p'>
            {text}
          </Text>
          {children}
        </Flex>
    ) },
);

figma.connect(
  Flex,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=55508-4850&t=tjfdRa8KRbX0lwpz-11',
  {
    props: {
      text: figma.textContent('↳ text'),
      childrenForm: figma.children('*'),
      childrenActions: figma.children('Button'),
    },
    example: ({ text, childrenForm, childrenActions }) => (
      <Flex direction='column' gap={4}>
        <Text size={/* font size */} tag='p'>
          {text}
        </Text>
        <Flex direction='column' gap={6}>
          {childrenForm}
        </Flex>
        <Flex gap={3}>{childrenActions}</Flex>
      </Flex>
    ) },
);

figma.connect(
  Flex,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=55508-4891&t=tjfdRa8KRbX0lwpz-11',
  {
    props: {
      text: figma.textContent('↳ text'),
      children: figma.children('*'),
    },
    example: ({ text, children }) => <Flex direction='column' gap={4}>
      <Text size={/* font size */} tag='p'>
        {text}
      </Text>
      {children}
    </Flex>,
  },
);

figma.connect(
  Flex,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=55508-4940&t=tjfdRa8KRbX0lwpz-11',
  {
    props: {
      text: figma.textContent('↳ text'),
      childrenActions: figma.children('Button'),
    },
    example: ({ text, childrenActions }) => <Flex direction='column' alignItems='center' gap={4}>
      <MailSent />
      <Text size={/* font size */} tag='p'>
        {text}
      </Text>
      {childrenActions}
    </Flex>,
  },
);

figma.connect(
  Flex,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=55508-4949&t=tjfdRa8KRbX0lwpz-11',
  {
    props: {
      text: figma.textContent('↳ text'),
      children: figma.children('*'),
    },
    example: ({ text, children }) => <Flex direction='column' gap={4}>
      <Text size={/* font size */} tag='p'>
        {text}
      </Text>
      {/* illustration */}
      {children}
    </Flex>,
  },
);