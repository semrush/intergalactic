import figma from '@figma/code-connect';
import Tag, { TagContainer } from '@semcore/tag';
import React from 'react';

const vanityProps = {
  label: figma.textContent('↳ text'),
  size: figma.enum('size', {
    XL: 'xl',
    L: 'l',
    M: 'm',
  }),
  theme: figma.enum('theme', {
    primary: 'primary',
    secondary: 'secondary',
  }),
  color: figma.enum('color', {
    'gray-500': 'gray-500',
    'blue-500': 'blue-500',
    'green-500': 'green-500',
    'orange-500': 'orange-500',
    'red-500': 'red-500',
    'invert': 'invert',
  }),
  active: figma.enum('state', {
    active: true,
  }),
  addonLeft: figma.boolean('← addon', {
    true: figma.instance('{ ↳ AddonLeft }'),
  }),
  textAddon: figma.boolean('↳ textAddon', {
    true: figma.instance('{ ↳ textAddon }'),
  }),
};

figma.connect(
  Tag,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring--%E2%9D%96-Core-Components?node-id=44497-213147&t=0hjqYEp7RXqjnbR7-11',
  {
    variant: { 'close button': 'false' },
    props: {
      ...vanityProps,
      disabled: figma.boolean('disabled'),
    },
    example: (props) => (
      <Tag
        size={props.size}
        theme={props.theme}
        color={props.color}
        active={props.active}
        disabled={props.disabled}
      >
        <Tag.Circle><img src='#' /></Tag.Circle>
        <Tag.Addon>{props.addonLeft}</Tag.Addon>
        <Tag.Text>{props.label}</Tag.Text>
        <Tag.Addon>{props.textAddon}</Tag.Addon>
      </Tag>
    ),
  },
);

figma.connect(
  TagContainer,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring--%E2%9D%96-Core-Components?node-id=44497-213147&t=0hjqYEp7RXqjnbR7-11',
  {
    variant: { 'close button': 'true' },
    props: {
      ...vanityProps,
    },
    example: (props) => (
      <TagContainer theme={props.theme} color={props.color} size={props.size}>
        <TagContainer.Tag>
          <Tag.Circle><img src='#' /></Tag.Circle>
          <TagContainer.Tag.Addon>{props.addonLeft}</TagContainer.Tag.Addon>
          <TagContainer.Tag.Text>{props.label}</TagContainer.Tag.Text>
          <TagContainer.Tag.Addon>{props.textAddon}</TagContainer.Tag.Addon>
        </TagContainer.Tag>
        <TagContainer.Close onClick={handleEditTag} />
      </TagContainer>
    ),
  },
);
