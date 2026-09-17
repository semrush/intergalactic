import figma from '@figma/code-connect';
import Select from '@semcore/ui/select';
import { Text } from '@semcore/ui/typography';

// Default Select List

figma.connect(
  Select.List,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactored--%E2%9D%96-Core-Components?node-id=47952-16111',
  {
    variant: { 'country select': 'false' },
    props: {
      size: figma.enum('size', {
        M: 'm',
        L: 'l',
      }),
      searchInput: figma.boolean('search input', {
        true: <Select.InputSearch value={/* value */} onChange={/* onChange */} aria-describedby={/* aria-describedby */} />,
        false: undefined,
      }),
      notice: figma.boolean('notice ↓', {
        true: figma.children('Notice'),
        false: undefined,
      }),
    },

    example: ({ searchInput, notice, size }) => (
      <Select.List size={size} hMax={/* value */}>
        {searchInput}
        <Select.Option key={/* value */} value={/* value */}>
          {/* option */}
        </Select.Option>
        {notice}
      </Select.List>
    ),
  },
);

// Country Select List

figma.connect(
  Select.List,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=47952-16111',
  {
    variant: { 'country select': 'true' },
    props: {
      size: figma.enum('size', {
        M: 'm',
        L: 'l',
      }),
      notice: figma.boolean('notice ↓', {
        true: figma.children('Notice'),
        false: undefined,
      }),
    },

    example: ({ notice, size }) => (
      <Select.Popper size={size} aria-label='/* Add your aria-label */'>
        <Select.InputSearch value={/* value */} onChange={/* onChange */} aria-describedby={/* aria-describedby */} />
        <Select.List hMax={/* value */}>
          {/* Options map */}
          {/* Options length + ScreenReaderOnly */}
        </Select.List>
        {notice}
      </Select.Popper>
    ),
  },
);

// Multiselect

figma.connect(
  Select.List,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactored--%E2%9D%96-Core-Components?node-id=57511-1992',
  {
    props: {
      size: figma.enum('size', {
        M: 'm',
        L: 'l',
      }),
      searchInput: figma.boolean('search input', {
        true: <Select.InputSearch value={/* value */} onChange={/* onChange */} aria-describedby={/* aria-describedby */} />,
        false: undefined,
      }),
      notice: figma.boolean('notice ↓', {
        true: figma.children('Notice'),
        false: undefined,
      }),
    },

    example: ({ searchInput, notice, size }) => (
      <Select.Popper size={size} aria-label='/* Add your aria-label */'>
        {searchInput}
        <Select.List hMax={/* value */}>
          <Select.Option value='%all%'>
            <Text color='text-link'>
              {currentValue.length ? 'Deselect all' : 'Select all'}
            </Text>
          </Select.Option>
          <Select.Option value={/* value */} key={/* value */}>
            <Select.Option.Checkbox />
            {/* option */}
          </Select.Option>
        </Select.List>
        {notice}
      </Select.Popper>
    ),
  },
);
