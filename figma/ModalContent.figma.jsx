import figma from '@figma/code-connect/react';
import { Flex } from '@semcore/ui/base-components';
import { Text } from '@semcore/ui/typography';

figma.connect(
  Text,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=55350-5351&t=tjfdRa8KRbX0lwpz-11',
  {
    props: {
      text: figma.textContent('↳ text'),
      children: figma.children('*'),
    },
    example: ({ text, children }) => (
      <>
        <Text size={/* font size */} tag='p'>
          {text}
        </Text>
        {children}
      </>
    ) },
);

figma.connect(
  Flex,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=55350-5360&t=tjfdRa8KRbX0lwpz-11',
  {
    props: {
      text: figma.textContent('↳ text'),
      childrenForm: figma.children('*'),
      childrenActions: figma.children('Button'),
    },
    example: ({ text, childrenForm, childrenActions }) => (
      <>
        <Text size={/* font size */} tag='p'>
          {text}
        </Text>
        <Flex direction='column' gap={6}>
          {childrenForm}
        </Flex>
        <Flex direction='row' gap={3}>{childrenActions}</Flex>
      </>
    ) },
);
