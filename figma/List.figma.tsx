import figma from '@figma/code-connect/react';
import { List } from '@semcore/typography';
import React from 'react';

figma.connect(
  List.Item,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/branch/TonMQkibPldoxcNAxeaDSi/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=11735-134804&t=a2WM8QYxFAkfLcnw-11',
  {
    variant: { 'custom marker': 'false' },
    props: {
      itemContent: figma.textContent('↳ item'),
    },
    example: ({ itemContent }) => <List.Item>{itemContent}</List.Item>,
  },
);

figma.connect(
  List.Item,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/branch/TonMQkibPldoxcNAxeaDSi/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=11735-134804&t=a2WM8QYxFAkfLcnw-11',
  {
    variant: { 'custom marker': 'true' },
    props: {
      itemContent: figma.textContent('↳ item'),
    },
    example: ({ itemContent }) => <List.Item marker={<CheckM color='icon-secondary-success' mt={1} />}>{itemContent}</List.Item>,
  },
);

// Unordered list

figma.connect(
  List,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/branch/TonMQkibPldoxcNAxeaDSi/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=11735-135520&t=a2WM8QYxFAkfLcnw-11',
  {
    variant: { 'items count': '2' },
    props: {
      size: figma.enum('font size', {
        '12px (100)': 100,
        '14px (200)': 200,
        '16px (300)': 300,
      }),
      itemContent1: figma.textContent('↳ item 1'),
      itemContent2: figma.textContent('↳ item 2'),
    },
    example: ({ size, itemContent1, itemContent2 }) => (
      <List size={size}>
        <List.Item>{itemContent1}</List.Item>
        <List.Item>{itemContent2}</List.Item>
      </List>
    ),
  },
);

figma.connect(
  List,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/branch/TonMQkibPldoxcNAxeaDSi/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=11735-135520&t=a2WM8QYxFAkfLcnw-11',
  {
    variant: { 'items count': '3' },
    props: {
      size: figma.enum('font size', {
        '12px (100)': 100,
        '14px (200)': 200,
        '16px (300)': 300,
      }),
      itemContent1: figma.textContent('↳ item 1'),
      itemContent2: figma.textContent('↳ item 2'),
      itemContent3: figma.textContent('↳ item 3'),
    },
    example: ({ size, itemContent1, itemContent2, itemContent3 }) => (
      <List size={size}>
        <List.Item>{itemContent1}</List.Item>
        <List.Item>{itemContent2}</List.Item>
        <List.Item>{itemContent3}</List.Item>
      </List>
    ),
  },
);

figma.connect(
  List,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/branch/TonMQkibPldoxcNAxeaDSi/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=11735-135520&t=a2WM8QYxFAkfLcnw-11',
  {
    variant: { 'items count': '4' },
    props: {
      size: figma.enum('font size', {
        '12px (100)': 100,
        '14px (200)': 200,
        '16px (300)': 300,
      }),
      itemContent1: figma.textContent('↳ item 1'),
      itemContent2: figma.textContent('↳ item 2'),
      itemContent3: figma.textContent('↳ item 3'),
      itemContent4: figma.textContent('↳ item 4'),
    },
    example: ({ size, itemContent1, itemContent2, itemContent3, itemContent4 }) => (
      <List size={size}>
        <List.Item>{itemContent1}</List.Item>
        <List.Item>{itemContent2}</List.Item>
        <List.Item>{itemContent3}</List.Item>
        <List.Item>{itemContent4}</List.Item>
      </List>
    ),
  },
);

figma.connect(
  List,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/branch/TonMQkibPldoxcNAxeaDSi/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=11735-135520&t=a2WM8QYxFAkfLcnw-11',
  {
    variant: { 'items count': '5' },
    props: {
      size: figma.enum('font size', {
        '12px (100)': 100,
        '14px (200)': 200,
        '16px (300)': 300,
      }),
      itemContent1: figma.textContent('↳ item 1'),
      itemContent2: figma.textContent('↳ item 2'),
      itemContent3: figma.textContent('↳ item 3'),
      itemContent4: figma.textContent('↳ item 4'),
      itemContent5: figma.textContent('↳ item 5'),
    },
    example: ({ size, itemContent1, itemContent2, itemContent3, itemContent4, itemContent5 }) => (
      <List size={size}>
        <List.Item>{itemContent1}</List.Item>
        <List.Item>{itemContent2}</List.Item>
        <List.Item>{itemContent3}</List.Item>
        <List.Item>{itemContent4}</List.Item>
        <List.Item>{itemContent5}</List.Item>
      </List>
    ),
  },
);

figma.connect(
  List,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/branch/TonMQkibPldoxcNAxeaDSi/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=11735-135520&t=a2WM8QYxFAkfLcnw-11',
  {
    variant: { 'items count': '6' },
    props: {
      size: figma.enum('font size', {
        '12px (100)': 100,
        '14px (200)': 200,
        '16px (300)': 300,
      }),
      itemContent1: figma.textContent('↳ item 1'),
      itemContent2: figma.textContent('↳ item 2'),
      itemContent3: figma.textContent('↳ item 3'),
      itemContent4: figma.textContent('↳ item 4'),
      itemContent5: figma.textContent('↳ item 5'),
      itemContent6: figma.textContent('↳ item 6'),
    },
    example: ({ size, itemContent1, itemContent2, itemContent3, itemContent4, itemContent5, itemContent6 }) => (
      <List size={size}>
        <List.Item>{itemContent1}</List.Item>
        <List.Item>{itemContent2}</List.Item>
        <List.Item>{itemContent3}</List.Item>
        <List.Item>{itemContent4}</List.Item>
        <List.Item>{itemContent5}</List.Item>
        <List.Item>{itemContent6}</List.Item>
      </List>
    ),
  },
);

figma.connect(
  List,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/branch/TonMQkibPldoxcNAxeaDSi/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=11735-135520&t=a2WM8QYxFAkfLcnw-11',
  {
    variant: { 'items count': '7' },
    props: {
      size: figma.enum('font size', {
        '12px (100)': 100,
        '14px (200)': 200,
        '16px (300)': 300,
      }),
      itemContent1: figma.textContent('↳ item 1'),
      itemContent2: figma.textContent('↳ item 2'),
      itemContent3: figma.textContent('↳ item 3'),
      itemContent4: figma.textContent('↳ item 4'),
      itemContent5: figma.textContent('↳ item 5'),
      itemContent6: figma.textContent('↳ item 6'),
      itemContent7: figma.textContent('↳ item 7'),
    },
    example: ({ size, itemContent1, itemContent2, itemContent3, itemContent4, itemContent5, itemContent6, itemContent7 }) => (
      <List size={size}>
        <List.Item>{itemContent1}</List.Item>
        <List.Item>{itemContent2}</List.Item>
        <List.Item>{itemContent3}</List.Item>
        <List.Item>{itemContent4}</List.Item>
        <List.Item>{itemContent5}</List.Item>
        <List.Item>{itemContent6}</List.Item>
        <List.Item>{itemContent7}</List.Item>
      </List>
    ),
  },
);

// Ordered list

figma.connect(
  List,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/branch/TonMQkibPldoxcNAxeaDSi/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=11933-118958&t=a2WM8QYxFAkfLcnw-11',
  {
    variant: { 'items count': '2' },
    props: {
      size: figma.enum('font size', {
        '12px (100)': 100,
        '14px (200)': 200,
        '16px (300)': 300,
      }),
      itemContent1: figma.textContent('↳ item 1'),
      itemContent2: figma.textContent('↳ item 2'),
    },
    example: ({ size, itemContent1, itemContent2 }) => (
      <List tag='ol' size={size}>
        <List.Item marker={1}>{itemContent1}</List.Item>
        <List.Item marker={2}>{itemContent2}</List.Item>
      </List>
    ),
  },
);

figma.connect(
  List,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/branch/TonMQkibPldoxcNAxeaDSi/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=11933-118958&t=a2WM8QYxFAkfLcnw-11',
  {
    variant: { 'items count': '3' },
    props: {
      size: figma.enum('font size', {
        '12px (100)': 100,
        '14px (200)': 200,
        '16px (300)': 300,
      }),
      itemContent1: figma.textContent('↳ item 1'),
      itemContent2: figma.textContent('↳ item 2'),
      itemContent3: figma.textContent('↳ item 3'),
    },
    example: ({ size, itemContent1, itemContent2, itemContent3 }) => (
      <List tag='ol' size={size}>
        <List.Item marker={1}>{itemContent1}</List.Item>
        <List.Item marker={2}>{itemContent2}</List.Item>
        <List.Item marker={3}>{itemContent3}</List.Item>
      </List>
    ),
  },
);

figma.connect(
  List,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/branch/TonMQkibPldoxcNAxeaDSi/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=11933-118958&t=a2WM8QYxFAkfLcnw-11',
  {
    variant: { 'items count': '4' },
    props: {
      size: figma.enum('font size', {
        '12px (100)': 100,
        '14px (200)': 200,
        '16px (300)': 300,
      }),
      itemContent1: figma.textContent('↳ item 1'),
      itemContent2: figma.textContent('↳ item 2'),
      itemContent3: figma.textContent('↳ item 3'),
      itemContent4: figma.textContent('↳ item 4'),
    },
    example: ({ size, itemContent1, itemContent2, itemContent3, itemContent4 }) => (
      <List tag='ol' size={size}>
        <List.Item marker={1}>{itemContent1}</List.Item>
        <List.Item marker={2}>{itemContent2}</List.Item>
        <List.Item marker={3}>{itemContent3}</List.Item>
        <List.Item marker={4}>{itemContent4}</List.Item>
      </List>
    ),
  },
);

figma.connect(
  List,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/branch/TonMQkibPldoxcNAxeaDSi/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=11933-118958&t=a2WM8QYxFAkfLcnw-11',
  {
    variant: { 'items count': '5' },
    props: {
      size: figma.enum('font size', {
        '12px (100)': 100,
        '14px (200)': 200,
        '16px (300)': 300,
      }),
      itemContent1: figma.textContent('↳ item 1'),
      itemContent2: figma.textContent('↳ item 2'),
      itemContent3: figma.textContent('↳ item 3'),
      itemContent4: figma.textContent('↳ item 4'),
      itemContent5: figma.textContent('↳ item 5'),
    },
    example: ({ size, itemContent1, itemContent2, itemContent3, itemContent4, itemContent5 }) => (
      <List tag='ol' size={size}>
        <List.Item marker={1}>{itemContent1}</List.Item>
        <List.Item marker={2}>{itemContent2}</List.Item>
        <List.Item marker={3}>{itemContent3}</List.Item>
        <List.Item marker={4}>{itemContent4}</List.Item>
        <List.Item marker={5}>{itemContent5}</List.Item>
      </List>
    ),
  },
);

figma.connect(
  List,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/branch/TonMQkibPldoxcNAxeaDSi/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=11933-118958&t=a2WM8QYxFAkfLcnw-11',
  {
    variant: { 'items count': '6' },
    props: {
      size: figma.enum('font size', {
        '12px (100)': 100,
        '14px (200)': 200,
        '16px (300)': 300,
      }),
      itemContent1: figma.textContent('↳ item 1'),
      itemContent2: figma.textContent('↳ item 2'),
      itemContent3: figma.textContent('↳ item 3'),
      itemContent4: figma.textContent('↳ item 4'),
      itemContent5: figma.textContent('↳ item 5'),
      itemContent6: figma.textContent('↳ item 6'),
    },
    example: ({ size, itemContent1, itemContent2, itemContent3, itemContent4, itemContent5, itemContent6 }) => (
      <List tag='ol' size={size}>
        <List.Item marker={1}>{itemContent1}</List.Item>
        <List.Item marker={2}>{itemContent2}</List.Item>
        <List.Item marker={3}>{itemContent3}</List.Item>
        <List.Item marker={4}>{itemContent4}</List.Item>
        <List.Item marker={5}>{itemContent5}</List.Item>
        <List.Item marker={6}>{itemContent6}</List.Item>
      </List>
    ),
  },
);

figma.connect(
  List,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/branch/TonMQkibPldoxcNAxeaDSi/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=11933-118958&t=a2WM8QYxFAkfLcnw-11',
  {
    variant: { 'items count': '7' },
    props: {
      size: figma.enum('font size', {
        '12px (100)': 100,
        '14px (200)': 200,
        '16px (300)': 300,
      }),
      itemContent1: figma.textContent('↳ item 1'),
      itemContent2: figma.textContent('↳ item 2'),
      itemContent3: figma.textContent('↳ item 3'),
      itemContent4: figma.textContent('↳ item 4'),
      itemContent5: figma.textContent('↳ item 5'),
      itemContent6: figma.textContent('↳ item 6'),
      itemContent7: figma.textContent('↳ item 7'),
    },
    example: ({ size, itemContent1, itemContent2, itemContent3, itemContent4, itemContent5, itemContent6, itemContent7 }) => (
      <List tag='ol' size={size}>
        <List.Item marker={1}>{itemContent1}</List.Item>
        <List.Item marker={2}>{itemContent2}</List.Item>
        <List.Item marker={3}>{itemContent3}</List.Item>
        <List.Item marker={4}>{itemContent4}</List.Item>
        <List.Item marker={5}>{itemContent5}</List.Item>
        <List.Item marker={6}>{itemContent6}</List.Item>
        <List.Item marker={7}>{itemContent7}</List.Item>
      </List>
    ),
  },
);

// List with custom bullets

figma.connect(
  List,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/branch/TonMQkibPldoxcNAxeaDSi/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=11933-118959&t=a2WM8QYxFAkfLcnw-11',
  {
    variant: { 'items count': '2' },
    props: {
      size: figma.enum('font size', {
        '12px (100)': 100,
        '14px (200)': 200,
        '16px (300)': 300,
      }),
      itemContent1: figma.textContent('↳ item 1'),
      itemContent2: figma.textContent('↳ item 2'),
    },
    example: ({ size, itemContent1, itemContent2 }) => (
      <List tag='ol' size={size} marker={<CheckM color='icon-secondary-success' mt={1} />}>
        <List.Item>{itemContent1}</List.Item>
        <List.Item>{itemContent2}</List.Item>
      </List>
    ),
  },
);

figma.connect(
  List,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/branch/TonMQkibPldoxcNAxeaDSi/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=11933-118959&t=a2WM8QYxFAkfLcnw-11',
  {
    variant: { 'items count': '3' },
    props: {
      size: figma.enum('font size', {
        '12px (100)': 100,
        '14px (200)': 200,
        '16px (300)': 300,
      }),
      itemContent1: figma.textContent('↳ item 1'),
      itemContent2: figma.textContent('↳ item 2'),
      itemContent3: figma.textContent('↳ item 3'),
    },
    example: ({ size, itemContent1, itemContent2, itemContent3 }) => (
      <List tag='ol' size={size} marker={<CheckM color='icon-secondary-success' mt={1} />}>
        <List.Item>{itemContent1}</List.Item>
        <List.Item>{itemContent2}</List.Item>
        <List.Item>{itemContent3}</List.Item>
      </List>
    ),
  },
);

figma.connect(
  List,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/branch/TonMQkibPldoxcNAxeaDSi/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=11933-118959&t=a2WM8QYxFAkfLcnw-11',
  {
    variant: { 'items count': '4' },
    props: {
      size: figma.enum('font size', {
        '12px (100)': 100,
        '14px (200)': 200,
        '16px (300)': 300,
      }),
      itemContent1: figma.textContent('↳ item 1'),
      itemContent2: figma.textContent('↳ item 2'),
      itemContent3: figma.textContent('↳ item 3'),
      itemContent4: figma.textContent('↳ item 4'),
    },
    example: ({ size, itemContent1, itemContent2, itemContent3, itemContent4 }) => (
      <List tag='ol' size={size} marker={<CheckM color='icon-secondary-success' mt={1} />}>
        <List.Item>{itemContent1}</List.Item>
        <List.Item>{itemContent2}</List.Item>
        <List.Item>{itemContent3}</List.Item>
        <List.Item>{itemContent4}</List.Item>
      </List>
    ),
  },
);

figma.connect(
  List,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/branch/TonMQkibPldoxcNAxeaDSi/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=11933-118959&t=a2WM8QYxFAkfLcnw-11',
  {
    variant: { 'items count': '5' },
    props: {
      size: figma.enum('font size', {
        '12px (100)': 100,
        '14px (200)': 200,
        '16px (300)': 300,
      }),
      itemContent1: figma.textContent('↳ item 1'),
      itemContent2: figma.textContent('↳ item 2'),
      itemContent3: figma.textContent('↳ item 3'),
      itemContent4: figma.textContent('↳ item 4'),
      itemContent5: figma.textContent('↳ item 5'),
    },
    example: ({ size, itemContent1, itemContent2, itemContent3, itemContent4, itemContent5 }) => (
      <List tag='ol' size={size} marker={<CheckM color='icon-secondary-success' mt={1} />}>
        <List.Item>{itemContent1}</List.Item>
        <List.Item>{itemContent2}</List.Item>
        <List.Item>{itemContent3}</List.Item>
        <List.Item>{itemContent4}</List.Item>
        <List.Item>{itemContent5}</List.Item>
      </List>
    ),
  },
);

figma.connect(
  List,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/branch/TonMQkibPldoxcNAxeaDSi/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=11933-118959&t=a2WM8QYxFAkfLcnw-11',
  {
    variant: { 'items count': '6' },
    props: {
      size: figma.enum('font size', {
        '12px (100)': 100,
        '14px (200)': 200,
        '16px (300)': 300,
      }),
      itemContent1: figma.textContent('↳ item 1'),
      itemContent2: figma.textContent('↳ item 2'),
      itemContent3: figma.textContent('↳ item 3'),
      itemContent4: figma.textContent('↳ item 4'),
      itemContent5: figma.textContent('↳ item 5'),
      itemContent6: figma.textContent('↳ item 6'),
    },
    example: ({ size, itemContent1, itemContent2, itemContent3, itemContent4, itemContent5, itemContent6 }) => (
      <List tag='ol' size={size} marker={<CheckM color='icon-secondary-success' mt={1} />}>
        <List.Item>{itemContent1}</List.Item>
        <List.Item>{itemContent2}</List.Item>
        <List.Item>{itemContent3}</List.Item>
        <List.Item>{itemContent4}</List.Item>
        <List.Item>{itemContent5}</List.Item>
        <List.Item>{itemContent6}</List.Item>
      </List>
    ),
  },
);
