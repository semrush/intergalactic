import figma from '@figma/code-connect';
import { Flex } from '@semcore/ui/base-components';
import InputTags from '@semcore/ui/input-tags';
import { Text } from '@semcore/ui/typography';

figma.connect(
  InputTags.Value,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=53341-290243&t=I48qqNRyVr8Tdi87-11',
  {
    props: {
      value: figma.textContent('↳ text'),
    },
    example: ({ value }) => <InputTags.Value placeholder={value} id='/* id */' />,
  });

figma.connect(
  InputTags,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10367-194491&t=I48qqNRyVr8Tdi87-11',
  {
    props: {
      placeholder: figma.nestedProps('InputTags.Value', {
        value: figma.textContent('↳ text'),
      }),
      size: figma.enum('size', {
        M: 'm',
        L: 'l',
      }),
      state: figma.enum('state', {
        normal: 'normal',
        invalid: 'invalid',
        valid: 'valid',
      }),
      readOnly: figma.boolean('read-only'),
      // tags: figma.children('Tag'),
    },
    example: ({ placeholder, size, state, readOnly }) => <InputTags size={size} state={state}>{/* tag */}<InputTags.Value placeholder={placeholder.value} id='/* id */' readOnly={readOnly} /></InputTags>,
  },
);

// InputTags with label

figma.connect(
  InputTags,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=56367-4062&',
  {
    variant: { 'label position': 'top' },
    props: {
      label: figma.textContent('↳ label'),
      input: figma.children('InputTags'),
      optional: figma.boolean('optional', {
        true: (
          <Text size='/* fontSize */' color='text-secondary'>
            (optional)
          </Text>
        ),
        false: undefined,
      }),
      counter: figma.boolean('counter', {
        true: figma.children('Counter'),
        false: undefined,
      }),
      infoIcon: figma.boolean('informer', {
        true: figma.children('Info icon with tooltip (Informer)'),
        false: undefined,
      }),
    },
    example: ({ label, input, optional, counter, infoIcon }) => (
      <Flex direction='column' gap={2}>
        <Flex direction='row' justifyContent='space-between'>
          <Text tag='label' htmlFor='/* input id */' size='/* fontSize */'>
            {label}
          </Text>
          {counter}
          {infoIcon}
          {optional}
        </Flex>
        {input}
      </Flex>
    ),
  },
);

figma.connect(
  InputTags,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=56367-4062&',
  {
    variant: { 'label position': 'left' },
    props: {
      label: figma.textContent('↳ label'),
      input: figma.children('InputTags'),
      optional: figma.boolean('optional', {
        true: (
          <Text size='/* fontSize */' color='text-secondary'>
            (optional)
          </Text>
        ),
        false: undefined,
      }),
      counter: figma.boolean('counter', {
        true: figma.children('Counter'),
        false: undefined,
      }),
      infoIcon: figma.boolean('informer', {
        true: figma.children('Info icon with tooltip (Informer)'),
        false: undefined,
      }),
    },
    example: ({ label, input, optional, counter, infoIcon }) => (
      <Flex direction='row' gap={6}>
        <Flex direction='column' mt={/* value */}>
          <Text tag='label' htmlFor='/* input id */' size='/* fontSize */'>
            {label}
          </Text>
          {counter}
          {infoIcon}
          {optional}
        </Flex>
        {input}
      </Flex>
    ),
  },
);
