import figma from '@figma/code-connect';
import { List } from '@semcore/typography';

figma.connect(
  List.Item,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=11735-134804',
  {
    props: {
      size: figma.enum('font size', {
        '300 (16px)': 300,
        '200 (14px)': 200,
        '100 (12px)': 100,
      }),
      marker: figma.enum('list type', {
        'numbers (ol)': figma.textContent('number'),
        'custom marker (ul)': figma.instance('marker'),
      }),
      text: figma.string('↳ text'),
    },
    example: ({ size, marker, text }) => (
      <List.Item size={size} marker={marker}>
        {text}
      </List.Item>
    ),
  },
);

figma.connect(
  List,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=11735-135520',
  {
    props: {
      children: figma.children('*'),
      size: figma.enum('font size', {
        '300 (16px)': 300,
        '200 (14px)': 200,
        '100 (12px)': 100,
      }),
    },
    example: ({ children, size }) => (
      <List size={size}>
        {/* you can remove size from children */}
        {children}
      </List>
    ),
  },
);
