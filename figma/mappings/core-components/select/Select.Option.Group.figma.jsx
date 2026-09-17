import figma from '@figma/code-connect';
import Select from '@semcore/ui/select';

// TODO: Add addons

figma.connect(
  Select.Group,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=11950-115223',
  {
    props: {
      size: figma.enum('size', {
        M: 'm',
        L: 'l',
      }),
      title: figma.textContent('↳ title'),
      subTitle: figma.boolean('subTitle', {
        true: figma.textContent('↳ subTitle'),
        false: undefined,
      }),
    },
    example: ({ size, title, subTitle }) => (
      <Select.Group size={size} title={title} subTitle={subTitle}>
        {/* options */}
      </Select.Group>
    ),
  },
);
