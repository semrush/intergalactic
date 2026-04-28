import type Breadcrumbs from '@semcore/ui/breadcrumbs';
import type { Meta, StoryObj } from '@storybook/react-vite';

import TrimMiddleExample, { breadcrumbsEllipsisExampleProps } from './examples/trim_middle';
const meta: Meta<typeof Breadcrumbs> = {
  title: 'Components/Breadcrumbs/Advanced',
};
export default meta;
type Story = StoryObj<typeof Breadcrumbs>;
export const TrimMiddle: StoryObj<typeof breadcrumbsEllipsisExampleProps> = {
  render: TrimMiddleExample,
  argTypes: {
    active: {
      control: { type: 'boolean' },
    },
  },
  args: breadcrumbsEllipsisExampleProps,
  parameters: { sourceCode: 'import Breadcrumbs from \'@semcore/ui/breadcrumbs\';\nimport type { BreadcrumbsItemProps } from \'@semcore/ui/breadcrumbs\';\nimport React from \'react\';\n\nconst Demo = (props: BreadcrumbsItemProps) => (\n  <Breadcrumbs w={600}>\n    <Breadcrumbs.Item active={false} href=\'#\' role=\'link\'>\n      Ellipsis\n    </Breadcrumbs.Item>\n    <Breadcrumbs.Item active={false} href=\'#\' role=\'link\' ellipsis:cropPosition=\'middle\'>\n      This title is longer than a giraffe\'s neck, I bet it\'s been doing neck workouts!\n    </Breadcrumbs.Item>\n    <Breadcrumbs.Item ellipsis:cropPosition=\'middle\' active={props.active}>Current page</Breadcrumbs.Item>\n  </Breadcrumbs>\n);\n\nexport const breadcrumbsEllipsisExampleProps: BreadcrumbsItemProps = {\n  active: true,\n};\nDemo.defaultProps = breadcrumbsEllipsisExampleProps;\n\nexport default Demo;\n' },
};
