import figma from '@figma/code-connect';
import Notice from '@semcore/ui/notice';
import Select from '@semcore/ui/select';
import React from 'react';

// TODO: When we add mappings for Notice, we can import Notice here, so I left import for Notice.

figma.connect(
  Select.Menu,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=47952-16111&t=TXEgCxM6iJO0FYiJ-11',
  {
    props: {
      searchInput: figma.boolean('search input', {
        true: <Select.InputSearch value={/* value */} onChange={/* onChange */} aria-describedby={/* aria-describedby */} />,
        false: undefined,
      }),
      notice: figma.boolean('notice ↓', {
        true: figma.children('Item/Notice'),
        false: undefined,
      }),
    },

    example: ({ searchInput, notice }) => (
      <Select.Popper aria-label='/* aria-label */'>
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
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=47952-16880&t=TXEgCxM6iJO0FYiJ-11',
  {
    props: {
      notice: figma.boolean('notice ↓', {
        true: figma.children('Item/Notice'),
        false: undefined,
      }),
    },

    example: ({ notice }) => (
      <Select.Popper aria-label='/* aria-label */'>
        <Select.InputSearch value={/* value */} onChange={/* onChange */} aria-describedby={/* aria-describedby */} />
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
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=47966-8771&t=TXEgCxM6iJO0FYiJ-11',
  {
    props: {
      searchInput: figma.boolean('search input', {
        true: <Select.InputSearch value={/* value */} onChange={/* onChange */} aria-describedby={/* aria-describedby */} />,
        false: undefined,
      }),
      notice: figma.boolean('notice ↓', {
        true: figma.children('Item/Notice'),
        false: undefined,
      }),
    },

    example: ({ searchInput, notice }) => (
      <Select.Popper aria-label='/* aria-label */'>
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
