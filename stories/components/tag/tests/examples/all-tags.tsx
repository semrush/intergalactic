import MathPlusM from '@semcore/icon/MathPlus/m';
import { Flex } from '@semcore/ui/base-components';
import Tag, { TagContainer } from '@semcore/ui/tag';
import React from 'react';

const COLORS = [
  'gray',
  'blue',
  'green',
  'red',
  'orange',
  'yellow',
  'violet',
  'pink',
  'salad',
] as const;

const SIZES = ['m', 'l', 'xl'] as const;

export default function AllTags() {
  return (
    <Flex direction='column' gap={4}>
      <Flex gap={2} flexWrap alignItems='center'>
        <Tag>
          <Tag.Text>Primary</Tag.Text>
        </Tag>
        <Tag theme='secondary'>
          <Tag.Text>Secondary</Tag.Text>
        </Tag>
        <Tag theme='additional' addonLeft={MathPlusM}>
          <Tag.Text>Additional</Tag.Text>
        </Tag>
        <Tag disabled>
          <Tag.Text>Disabled</Tag.Text>
        </Tag>
      </Flex>
      {SIZES.map((size) => (
        <Flex key={size} gap={2} flexWrap alignItems='center'>
          {COLORS.map((color) => (
            <Tag key={`${size}-${color}`} theme='primary' color={`${color}-500`} size={size}>
              <Tag.Text>{color}</Tag.Text>
            </Tag>
          ))}
        </Flex>
      ))}
      {SIZES.map((size) => (
        <Flex key={`closable-${size}`} gap={2} flexWrap alignItems='center'>
          {COLORS.map((color) => (
            <TagContainer
              key={`${size}-${color}-closable`}
              theme='primary'
              color={`${color}-500`}
              size={size}
              interactive
            >
              <TagContainer.Tag>
                <TagContainer.Tag.Text>{color}</TagContainer.Tag.Text>
              </TagContainer.Tag>
              <TagContainer.Close />
            </TagContainer>
          ))}
        </Flex>
      ))}
    </Flex>
  );
}
