import figma from '@figma/code-connect';
import Select from '@semcore/ui/select';

// Default Select List

figma.connect(
  Select.Menu,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=47952-16111&t=TXEgCxM6iJO0FYiJ-11',
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
        true: figma.children('Item/Notice'),
        false: undefined,
      }),
    },

    example: ({ searchInput, notice, size }) => (
      <Select.Popper size={size} aria-label='/* Add your aria-label */'>
        {searchInput}
        <Select.List hMax={/* value */}>
          <Select.Option key={/* value */} value={/* value */}>
            {/* option */}
          </Select.Option>
        </Select.List>
        {notice}
      </Select.Popper>
    ),
  },
);

figma.connect(
  Select.Menu,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=47952-16111&t=TXEgCxM6iJO0FYiJ-11',
  {
    variant: { 'search input': 'false' },
    props: {
      size: figma.enum('size', {
        M: 'm',
        L: 'l',
      }),
      notice: figma.boolean('notice ↓', {
        true: figma.children('Item/Notice'),
        false: undefined,
      }),
    },

    example: ({ notice, size }) => (
      <Select.Menu size={size} hMax={/* value */}>
        <Select.Option key={/* value */} value={/* value */}>
          {/* option */}
        </Select.Option>
        {notice}
      </Select.Menu>
    ),
  },
);

// Country Select List

figma.connect(
  Select.Menu,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=47952-16880&t=TXEgCxM6iJO0FYiJ-11',
  {
    props: {
      size: figma.enum('size', {
        M: 'm',
        L: 'l',
      }),
      notice: figma.boolean('notice ↓', {
        true: figma.children('Item/Notice'),
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
  Select.Menu,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=47966-8771&t=TXEgCxM6iJO0FYiJ-11',
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
        true: figma.children('Item/Notice'),
        false: undefined,
      }),
    },

    example: ({ searchInput, notice, size }) => (
      <Select.Popper size={size} aria-label='/* Add your aria-label */'>
        {searchInput}
        <Select.Menu hMax={/* value */}>
          <Select.Option value='%all%'>
            <Text color='text-link'>
              {(currentValue as any).length ? 'Deselect all' : 'Select all'}
            </Text>
          </Select.Option>
          <Select.Option value={/* value */} key={/* value */}>
            <Select.Option.Checkbox />
            {/* option */}
          </Select.Option>
        </Select.Menu>
        {notice}
      </Select.Popper>
    ),
  },
);
