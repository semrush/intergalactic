import figma from '@figma/code-connect';
import { Flex } from '@semcore/ui/base-components';
import BulkTextarea from '@semcore/ui/bulk-textarea';
import { Text } from '@semcore/ui/typography';

// add placeholder somehow, for now Figma Code Connect doesn't see placeholder

figma.connect(
  BulkTextarea,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=48599-7546&t=tjfdRa8KRbX0lwpz-11',
  {
    props: {
      // placeholder: figma.textContent('↳ text'),
      label: figma.textContent('↳ label'),
      size: figma.enum('size', {
        M: 'm',
        L: 'l',
      }),
      state: figma.enum('state', {
        normal: 'normal',
        invalid: 'invalid',
      }),
      readonly: figma.enum('state', {
        'read-only': true,
      }),
    },

    example: ({ size, readonly, label }) => (
      <BulkTextarea
        size={size}
        readonly={readonly}
        placeholder='/* Add your placeholder */'
      >
        <Flex alignItems='center' justifyContent='flex-start' mb={2} gap={1}>
          <Text tag='label' size={/* font size */}>
            {label}
          </Text>
          <BulkTextarea.Counter />
        </Flex>
        <BulkTextarea.InputField
          commonErrorMessage={/* Add error message */}
        />
        <Flex alignItems='center' justifyContent='space-between' mt={2}>
          <BulkTextarea.ErrorsNavigation />
          <BulkTextarea.ClearAll />
        </Flex>
      </BulkTextarea>
    ),
  },
);
