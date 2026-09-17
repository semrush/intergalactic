import figma from '@figma/code-connect';
import { Flex } from '@semcore/ui/base-components';
import Checkbox from '@semcore/ui/checkbox';

figma.connect(
  Flex,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring--%E2%9D%96-Core-Components?node-id=19530-124198&',
  {
    props: {
      size: figma.enum('size', {
        L: 'l',
        M: 'm',
      }),
    },
    example: ({ size }) => (
      <Flex direction='column' gap={3}>
        <Checkbox size={size} />
      </Flex>
    ),
  },
);

figma.connect(
  Flex,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10142-174621&',
  {
    props: {
      size: figma.enum('size', {
        L: 'l',
        M: 'm',
      }),
      label: figma.nestedProps('Checkbox', {
        label: figma.textContent('↳ text'),
      }),
    },
    example: ({ size, label }) => (
      <Flex direction='column' gap={3}>
        <Checkbox size={size} label={label.label} />
        <Flex direction='column' gap={3} ml={6}>
          <Checkbox size={size} label={label.label} />
        </Flex>
      </Flex>
    ),
  },
);
