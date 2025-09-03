import figma from '@figma/code-connect/react';
import { List } from '@semcore/typography';
import React from 'react';

// TODO: Update links to actual nodes

figma.connect(
  List.Item,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=11735-134804&t=7VQMR7GRRdaXHBer-11',
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
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=11735-134804&t=7VQMR7GRRdaXHBer-11',
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
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=52745-1484&t=7VQMR7GRRdaXHBer-11',
  {
    props: {
      size: figma.enum('font size', {
        '12px (100)': 100,
        '14px (200)': 200,
        '16px (300)': 300,
      }),
      content: figma.children('List.Item'),
    },
    example: ({ size, content }) => (
      <List size={size}>
        {content}
      </List>
    ),
  },
);

// Ordered list

figma.connect(
  List,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=52745-1558&t=7VQMR7GRRdaXHBer-11',
  {
    props: {
      size: figma.enum('font size', {
        '12px (100)': 100,
        '14px (200)': 200,
        '16px (300)': 300,
      }),
      content: figma.children('List.Item'),
    },
    example: ({ size, content }) => (
      <List tag='ol' size={size}>
        {content}
      </List>
    ),
  },
);

// List with custom bullets

figma.connect(
  List,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=52745-1632&t=7VQMR7GRRdaXHBer-11',
  {
    props: {
      size: figma.enum('font size', {
        '12px (100)': 100,
        '14px (200)': 200,
        '16px (300)': 300,
      }),
      content: figma.children('List.Item'),
    },
    example: ({ size, content }) => (
      <List tag='ol' size={size} marker={<CheckM color='icon-secondary-success' mt={1} />}>
        {content}
      </List>
    ),
  },
);
