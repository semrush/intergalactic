import figma from '@figma/code-connect';
import { Flex } from '@semcore/ui/base-components';
import Textarea from '@semcore/ui/textarea';
import { Text } from '@semcore/ui/typography';

figma.connect(
  Textarea.Value,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=53577-8724&t=I48qqNRyVr8Tdi87-11',
  {
    props: {
      value: figma.textContent('↳ text'),
    },
  },
);

figma.connect(
  Textarea,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10217-100589&t=Q0bSsRErIQ7IEZAU-11',
  {
    props: {
      placeholder: figma.nestedProps('Textarea.Value', {
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
      disabled: figma.enum('state', { disabled: true }),
      readOnly: figma.boolean('read-only'),
      resize: figma.boolean('resize'),
    },
    example: ({ placeholder, size, state, disabled, readOnly, resize }) => <Textarea placeholder={placeholder.value} size={size} state={state} disabled={disabled} readOnly={readOnly} resize={resize} />,
  },
);

figma.connect(
  Textarea,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=11614-143876&t=Q0bSsRErIQ7IEZAU-11',
  {
    variant: { 'label position': 'top' },
    props: {
      label: figma.textContent('↳ label'),
      textarea: figma.children('Textarea'),
    },
    example: ({ label, textarea }) => (
      <Flex direction='column' gap={2}>
        <Flex justifyContent='space-between'>
          <Text tag='label' htmlFor='/* input id */' size='/* fontSize */'>
            {label}
          </Text>
          <Text size='/* fontSize */' color='text-secondary'>
            (optional)
          </Text>
        </Flex>
        {textarea}
      </Flex>
    ),
  },
);

figma.connect(
  Textarea,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=11614-143876&t=Q0bSsRErIQ7IEZAU-11',
  {
    variant: { 'label position': 'left' },
    props: {
      label: figma.textContent('↳ label'),
      textarea: figma.children('Textarea'),
    },
    example: ({ label, textarea }) => (
      <Flex gap={6}>
        <Flex direction='column' mt={/* value */}>
          <Text tag='label' htmlFor='/* input id */' size='/* fontSize */'>
            {label}
          </Text>
          <Text size='/* fontSize */' color='text-secondary'>
            (optional)
          </Text>
        </Flex>
        {textarea}
      </Flex>
    ),
  },
);
