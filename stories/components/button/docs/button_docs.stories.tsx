import Button from '@semcore/ui/button';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { ButtonAccessibilityTest } from './__tests__/ButtonAccessibility.test';
import AddonsExample from './examples/addons';
import ButtonAccessibilityExample from './examples/button_accessibility';
import ButtonLinkExample from './examples/button_link';
import ButtonWithIconExample from './examples/button_with_icon';
import ButtonLoadingExample from './examples/button_with_loading';
import { playWrapper } from '../../../utils/playWrapper';
const meta: Meta<typeof Button> = {
  title: 'Components/Button/Documentation',
  component: Button,
};
export default meta;
type Story = StoryObj<typeof Button>;
export const Addons: Story = {
  render: AddonsExample,
  parameters: { sourceCode: 'import CheckM from \'@semcore/icon/Check/m\';\nimport Badge from \'@semcore/ui/badge\';\nimport Button from \'@semcore/ui/button\';\nimport React from \'react\';\n\nconst Demo = () => {\n  return (\n    <>\n      <Button addonLeft={CheckM}>Button</Button>\n      <Button ml={2}>\n        <Button.Text>Button</Button.Text>\n        <Button.Addon>\n          <Badge type=\'new\' />\n        </Button.Addon>\n      </Button>\n    </>\n  );\n};\n\nexport default Demo;\n' },
  parameters: { sourceCode: 'import CheckM from \'@semcore/icon/Check/m\';\nimport Badge from \'@semcore/ui/badge\';\nimport Button from \'@semcore/ui/button\';\nimport React from \'react\';\n\nconst Demo = () => {\n  return (\n    <>\n      <Button addonLeft={CheckM}>Button</Button>\n      <Button ml={2}>\n        <Button.Text>Button</Button.Text>\n        <Button.Addon>\n          <Badge type=\'new\' />\n        </Button.Addon>\n      </Button>\n    </>\n  );\n};\n\nexport default Demo;\n' },
};
export const IconOnlyButton: Story = {
  render: ButtonWithIconExample,
  parameters: { sourceCode: 'import CheckM from \'@semcore/icon/Check/m\';\nimport Button from \'@semcore/ui/button\';\nimport React from \'react\';\n\nconst Demo = () => {\n  return (\n    <Button title=\'Confirm\'>\n      <Button.Addon>\n        <CheckM />\n      </Button.Addon>\n    </Button>\n  );\n};\n\nexport default Demo;\n' },
  parameters: { sourceCode: 'import CheckM from \'@semcore/icon/Check/m\';\nimport Button from \'@semcore/ui/button\';\nimport React from \'react\';\n\nconst Demo = () => {\n  return (\n    <Button title=\'Confirm\'>\n      <Button.Addon>\n        <CheckM />\n      </Button.Addon>\n    </Button>\n  );\n};\n\nexport default Demo;\n' },
};
export const ButtonLikeALink: Story = {
  render: ButtonLinkExample,
  parameters: { sourceCode: 'import CheckL from \'@semcore/icon/Check/l\';\nimport CheckM from \'@semcore/icon/Check/m\';\nimport CloseM from \'@semcore/icon/Close/m\';\nimport { Flex } from \'@semcore/ui/base-components\';\nimport { ButtonLink } from \'@semcore/ui/button\';\nimport React from \'react\';\n\nconst Demo = () => {\n  return (\n    <Flex direction=\'column\' gap={6} alignItems=\'flex-start\'>\n      <ButtonLink addonLeft={CheckM}>Primary ButtonLink</ButtonLink>\n      <ButtonLink addonRight={CloseM} color=\'text-critical\'>\n        Colored primary ButtonLink\n      </ButtonLink>\n      <ButtonLink use=\'secondary\'>\n        <ButtonLink.Addon>\n          <CheckM />\n        </ButtonLink.Addon>\n        <ButtonLink.Text>Secondary ButtonLink</ButtonLink.Text>\n      </ButtonLink>\n      <ButtonLink use=\'secondary\' addonLeft={CheckM} disabled>\n        Disabled secondary ButtonLink\n      </ButtonLink>\n      <ButtonLink addonLeft={CheckM} aria-label=\'Icon-only button\' />\n      <ButtonLink addonLeft={CheckL} size={500}>\n        ButtonLink with another text size\n      </ButtonLink>\n    </Flex>\n  );\n};\n\nexport default Demo;\n' },
  parameters: { sourceCode: 'import CheckL from \'@semcore/icon/Check/l\';\nimport CheckM from \'@semcore/icon/Check/m\';\nimport CloseM from \'@semcore/icon/Close/m\';\nimport { Flex } from \'@semcore/ui/base-components\';\nimport { ButtonLink } from \'@semcore/ui/button\';\nimport React from \'react\';\n\nconst Demo = () => {\n  return (\n    <Flex direction=\'column\' gap={6} alignItems=\'flex-start\'>\n      <ButtonLink addonLeft={CheckM}>Primary ButtonLink</ButtonLink>\n      <ButtonLink addonRight={CloseM} color=\'text-critical\'>\n        Colored primary ButtonLink\n      </ButtonLink>\n      <ButtonLink use=\'secondary\'>\n        <ButtonLink.Addon>\n          <CheckM />\n        </ButtonLink.Addon>\n        <ButtonLink.Text>Secondary ButtonLink</ButtonLink.Text>\n      </ButtonLink>\n      <ButtonLink use=\'secondary\' addonLeft={CheckM} disabled>\n        Disabled secondary ButtonLink\n      </ButtonLink>\n      <ButtonLink addonLeft={CheckM} aria-label=\'Icon-only button\' />\n      <ButtonLink addonLeft={CheckL} size={500}>\n        ButtonLink with another text size\n      </ButtonLink>\n    </Flex>\n  );\n};\n\nexport default Demo;\n' },
};
export const ButtonWithNoVisibleText: Story = {
  render: ButtonAccessibilityExample,
  play: playWrapper(ButtonAccessibilityTest),
  parameters: { sourceCode: 'import CheckM from \'@semcore/icon/Check/m\';\nimport CloseM from \'@semcore/icon/Close/m\';\nimport Button from \'@semcore/ui/button\';\nimport React from \'react\';\n\nconst Demo = () => {\n  return (\n    <>\n      <Button addonLeft={CheckM} aria-label=\'Confirm action\' mr={2} />\n      <Button addonLeft={CloseM} aria-label=\'Close notification\' />\n    </>\n  );\n};\n\nexport default Demo;\n' },
  parameters: { sourceCode: 'import CheckM from \'@semcore/icon/Check/m\';\nimport CloseM from \'@semcore/icon/Close/m\';\nimport Button from \'@semcore/ui/button\';\nimport React from \'react\';\n\nconst Demo = () => {\n  return (\n    <>\n      <Button addonLeft={CheckM} aria-label=\'Confirm action\' mr={2} />\n      <Button addonLeft={CloseM} aria-label=\'Close notification\' />\n    </>\n  );\n};\n\nexport default Demo;\n' },
};
export const ButtonWithLoadingState: Story = {
  render: ButtonLoadingExample,
  parameters: { sourceCode: 'import Button from \'@semcore/ui/button\';\nimport Spin from \'@semcore/ui/spin\';\nimport React from \'react\';\n\nconst Demo = () => {\n  return (\n    <>\n      <Button loading>Loading</Button>\n      {\' \'}\n      <Button disabled>\n        <Button.Addon>\n          <Spin size=\'xs\' />\n        </Button.Addon>\n        <Button.Text>Loading</Button.Text>\n      </Button>\n    </>\n  );\n};\n\nexport default Demo;\n' },
  parameters: { sourceCode: 'import Button from \'@semcore/ui/button\';\nimport Spin from \'@semcore/ui/spin\';\nimport React from \'react\';\n\nconst Demo = () => {\n  return (\n    <>\n      <Button loading>Loading</Button>\n      {\' \'}\n      <Button disabled>\n        <Button.Addon>\n          <Spin size=\'xs\' />\n        </Button.Addon>\n        <Button.Text>Loading</Button.Text>\n      </Button>\n    </>\n  );\n};\n\nexport default Demo;\n' },
};
