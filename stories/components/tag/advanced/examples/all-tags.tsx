import MathPlusM from '@semcore/icon/MathPlus/m';
import { Box, Flex } from '@semcore/ui/base-components';
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
      {SIZES.map((size) => (
        <Flex key={`themes-${size}`} gap={2} flexWrap alignItems='center'>
          <Tag size={size}>Primary</Tag>
          <Tag theme='secondary' size={size}>Secondary</Tag>
          <Tag disabled size={size}>Disabled</Tag>
        </Flex>
      ))}
      {SIZES.map((size) => (
        <Flex key={`themes-interactive-${size}`} gap={2} flexWrap alignItems='center'>
          <TagContainer size={size} interactive onClick={console.log}>
            <TagContainer.Tag>
              <TagContainer.Tag.Text>Primary interactive</TagContainer.Tag.Text>
            </TagContainer.Tag>
            <TagContainer.Close />
          </TagContainer>
          <TagContainer theme='secondary' size={size} interactive onClick={console.log}>
            <TagContainer.Tag>
              <TagContainer.Tag.Text>Secondary interactive</TagContainer.Tag.Text>
            </TagContainer.Tag>
            <TagContainer.Close />
          </TagContainer>
          <TagContainer theme='additional' size={size} interactive onClick={console.log}>
            <TagContainer.Tag addonLeft={MathPlusM}>
              <TagContainer.Tag.Text>Secondary interactive</TagContainer.Tag.Text>
            </TagContainer.Tag>
          </TagContainer>
        </Flex>
      ))}
      <Box
        p={4}
        style={{
          background: 'var(--intergalactic-bg-primary-invert)',
          borderRadius: 'var(--intergalactic-surface-rounded, 6px)',
        }}
      >
        <Flex direction='column' gap={4}>
          {SIZES.map((size) => (
            <Flex key={`themes-invert-${size}`} gap={2} flexWrap alignItems='center'>
              <Tag size={size} theme='primary' invert>
                <Tag.Text>Primary invert</Tag.Text>
              </Tag>
              <Tag theme='secondary' invert size={size}>
                <Tag.Text>Secondary invert</Tag.Text>
              </Tag>
            </Flex>
          ))}
          {SIZES.map((size) => (
            <Flex key={`themes-invert-interactive-${size}`} gap={2} flexWrap alignItems='center'>
              <TagContainer theme='primary' invert size={size} interactive onClick={console.log}>
                <TagContainer.Tag>
                  <TagContainer.Tag.Text>Primary invert interactive</TagContainer.Tag.Text>
                </TagContainer.Tag>
                <TagContainer.Close />
              </TagContainer>
              <TagContainer theme='secondary' invert size={size} interactive onClick={console.log}>
                <TagContainer.Tag>
                  <TagContainer.Tag.Text>Secondary invert interactive</TagContainer.Tag.Text>
                </TagContainer.Tag>
                <TagContainer.Close />
              </TagContainer>
              <TagContainer theme='additional' invert size={size} interactive onClick={console.log}>
                <TagContainer.Tag addonLeft={MathPlusM}>
                  <TagContainer.Tag.Text>Additional invert interactive</TagContainer.Tag.Text>
                </TagContainer.Tag>
              </TagContainer>
            </Flex>
          ))}
        </Flex>
      </Box>
      {SIZES.map((size) => (
        <Flex key={size} gap={2} flexWrap alignItems='center'>
          {COLORS.map((color) => (
            <Tag key={`${size}-${color}`} theme='primary' color={`${color}-500`} size={size}>
              {color}
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
