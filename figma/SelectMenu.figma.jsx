import figma from '@figma/code-connect';
import Select from '@semcore/ui/select';

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
