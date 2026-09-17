import figma from '@figma/code-connect/react';
import AddFilter from '@semcore/ui/add-filter';
import Select from '@semcore/ui/select';

figma.connect(
  Select,
  'https://www.figma.com/design/1zWWz7R5Lt9tt9BM6Bzf6W/%F0%9F%90%8B-Filter-Patterns?node-id=1546-1937',
  {
    props: {
      filterTrigger: figma.children('FilterTrigger'),
      selectMenu: figma.children('Select.Menu'),
    },
    example: ({ filterTrigger, selectMenu }) => (
      <Select>
        {filterTrigger}
        {selectMenu}
      </Select>
    ),
  },
);

figma.connect(
  AddFilter,
  'https://www.figma.com/design/1zWWz7R5Lt9tt9BM6Bzf6W/%F0%9F%90%8B-Filter-Patterns?node-id=1546-1931',
  {
    props: {
      trigger: figma.children('Button'),
      selectMenu: figma.children('Select.Menu'),
    },
    example: ({ trigger, selectMenu }) => (
      <AddFilter.Select>
        <AddFilter.Select.Trigger
          placeholder='/* Add placeholder */'
          aria-label='/* Add aria-label */'
        >
          {trigger}
        </AddFilter.Select.Trigger>
        <AddFilter.Select.Menu aria-label='/* Add aria-label */'>
          {selectMenu}
          <AddFilter.Select.Option>
            {/* Add option */}
          </AddFilter.Select.Option>
        </AddFilter.Select.Menu>
      </AddFilter.Select>
    ),
  },
);

figma.connect(
  AddFilter,
  'https://www.figma.com/design/1zWWz7R5Lt9tt9BM6Bzf6W/%F0%9F%90%8B-Filter-Patterns?node-id=1546-1920',
  {
    props: {
      content: figma.children('*'),
    },
    example: ({ content }) => (
      <AddFilter>
        {content}
      </AddFilter>
    ),
  },
);
