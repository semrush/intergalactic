import figma from '@figma/code-connect';
import { Flex } from '@semcore/ui/base-components';
import Spin from '@semcore/ui/spin';
import { Text } from '@semcore/ui/typography';

figma.connect(
  Spin,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10041-43274&t=zWV92Vho57lBOgpd-11',
  {
    props: {
      size: figma.enum('size', {
        'XS (16 x 16)': 'xs',
        'S (20 x 20)': 's',
        'M (24 x 24)': 'm',
        'L (32 x 32)': 'l',
        'XL (40 x 40)': 'xl',
        'XXL (72 x 72)': 'xxl',
      }),
      theme: figma.enum('theme', {
        dark: 'dark',
        invert: 'invert',
      }),
    },
    example: ({ size, theme }) => <Spin size={size} theme={theme} />,
  },
);

figma.connect(
  Spin,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=52845-162&t=zWV92Vho57lBOgpd-11',
  {
    variant: { 'text placement': 'right' },
    props: {
      size: figma.enum('size', {
        'XS (16 x 16)': 'xs',
        'S (20 x 20)': 's',
        'M (24 x 24)': 'm',
        'L (32 x 32)': 'l',
        'XL (40 x 40)': 'xl',
        'XXL (72 x 72)': 'xxl',
      }),
      theme: figma.enum('theme', {
        dark: 'dark',
        invert: 'invert',
      }),
      text: figma.textContent('↳ text'),
    },
    example: ({ size, theme, text }) => (
      <Flex alignItems='center' direction='row' gap={/* margin depends on text and spin size */}>
        <Spin size={size} theme={theme}>{text}</Spin>
        <Text size={/* fontSize */} color='text-secondary'>{text}</Text>
      </Flex>
    ),
  },
);

figma.connect(
  Spin,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=52845-162&t=zWV92Vho57lBOgpd-11',
  {
    variant: { 'text placement': 'bottom' },
    props: {
      size: figma.enum('size', {
        'XS (16 x 16)': 'xs',
        'S (20 x 20)': 's',
        'M (24 x 24)': 'm',
        'L (32 x 32)': 'l',
        'XL (40 x 40)': 'xl',
        'XXL (72 x 72)': 'xxl',
      }),
      theme: figma.enum('theme', {
        dark: 'dark',
        invert: 'invert',
      }),
      text: figma.textContent('↳ text'),
    },
    example: ({ size, theme, text }) => (
      <Flex alignItems='center' direction='column' gap={/* margin depends on text and spin size */}>
        <Spin size={size} theme={theme}>{text}</Spin>
        <Text size={/* fontSize */} color='text-secondary'>{text}</Text>
      </Flex>
    ),
  },
);
