import { Box, Flex } from '@semcore/flex-box';
import InputTags from '@semcore/input-tags';
import React from 'react';

const Demo = () => {
  return (
    <Flex direction='column' gap={2}>
      <Flex direction='column' gap={2} data-testid='normal-state' w={200}>
        <InputTags size='m' state='normal' data-testid='normal-state-m'>
          {[1, 2, 3, 4, 5, 6, 7].map((item) => (
            <InputTags.Tag key={item}>{`tag ${item}`}</InputTags.Tag>
          ))}
          <InputTags.Value placeholder='Placeholder' />
        </InputTags>

        <InputTags size='l' data-testid='normal-state-l'>
          {[1, 2, 3, 4].map((item) => (
            <InputTags.Tag key={item}>{`tag ${item}`}</InputTags.Tag>
          ))}
          <InputTags.Value />
        </InputTags>

      </Flex>

      <Flex direction='column' gap={2} data-testid='normal-state-readonly'>
        <InputTags size='m' state='normal' data-testid='normal-state-readonly-m'>
          {[1, 2, 3, 4].map((item) => (
            <InputTags.Tag key={item}>{`tag ${item}`}</InputTags.Tag>
          ))}
          <InputTags.Value readOnly />
        </InputTags>

        <InputTags size='l' data-testid='normal-state-readonly-l'>
          {[1, 2, 3, 4].map((item) => (
            <InputTags.Tag key={item}>{`tag ${item}`}</InputTags.Tag>
          ))}
          <InputTags.Value readOnly />
        </InputTags>

      </Flex>

      <Flex direction='column' gap={2} data-testid='invalid-state' w={200}>
        <InputTags size='m' state='invalid' data-testid='invalid-state-m'>
          {[1, 2, 3, 4].map((item) => (
            <InputTags.Tag key={item}>{`tag ${item}`}</InputTags.Tag>
          ))}
          <InputTags.Value />
        </InputTags>
        <InputTags size='l' state='invalid' data-testid='invalid-state-l'>
          {[1, 2, 3, 4].map((item) => (
            <InputTags.Tag key={item}>{`tag ${item}`}</InputTags.Tag>
          ))}
          <InputTags.Value />

        </InputTags>
      </Flex>

      <Flex direction='column' gap={2} data-testid='invalid-state-readonly'>
        <InputTags size='m' state='invalid' data-testid='invalid-state-readonly-m'>
          {[1, 2, 3, 4].map((item) => (
            <InputTags.Tag key={item}>{`tag ${item}`}</InputTags.Tag>
          ))}
          <InputTags.Value readOnly />
        </InputTags>
        <InputTags size='l' state='invalid' data-testid='invalid-state-readonly-l'>
          {[1, 2, 3, 4].map((item) => (
            <InputTags.Tag key={item}>{`tag ${item}`}</InputTags.Tag>
          ))}
          <InputTags.Value readOnly />

        </InputTags>
      </Flex>

      <Flex direction='column' gap={2} data-testid='valid-state'>
        <InputTags size='m' state='valid' data-testid='valid-state-m'>
          {[1, 2, 3, 4].map((item) => (
            <InputTags.Tag key={item}>{`tag ${item}`}</InputTags.Tag>
          ))}
          <InputTags.Value />

        </InputTags>
        <InputTags size='l' state='valid' data-testid='valid-state-l'>
          {[1, 2, 3, 4].map((item) => (
            <InputTags.Tag key={item}>{`tag ${item}`}</InputTags.Tag>
          ))}
          <InputTags.Value />
        </InputTags>
      </Flex>

      <Flex direction='column' gap={2} data-testid='valid-state-readonly'>
        <InputTags size='m' state='valid' data-testid='valid-state-readonly-m'>
          {[1, 2, 3, 4].map((item) => (
            <InputTags.Tag key={item}>{`tag ${item}`}</InputTags.Tag>
          ))}
          <InputTags.Value readOnly />

        </InputTags>
        <InputTags size='l' state='valid' data-testid='valid-state-readonly-l'>
          {[1, 2, 3, 4].map((item) => (
            <InputTags.Tag key={item}>{`tag ${item}`}</InputTags.Tag>
          ))}
          <InputTags.Value readOnly />
        </InputTags>
      </Flex>

    </Flex>
  );
};

const tags = ['vk', 'fk', 'twitter', 'instagram'];

export default Demo;
