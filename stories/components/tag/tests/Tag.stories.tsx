import Tag from '@semcore/ui/tag';
import type { Meta, StoryObj } from '@storybook/react-vite';

import BasicExample, { defaultProps } from './examples/basic_usage';
import StylesThemeSizesExample from './examples/styles-themes-sizes';
import StylesThemeSizesAddonsInteractiveExample from './examples/styles-themes-sizes-addons-interactive';
import DisabledStylesThemeSizesExample from './examples/styles-themes-sizes-disabled';
import StylesThemeSizesInteractiveExample from './examples/styles-themes-sizes-interactive';
import StylesThemeSizesWithAddonAndCloseActiveExample from './examples/styles-themes-sizes-with-addon-and-X-active-part';
import StylesThemeSizesWithAddonAndCloseDisabledExample from './examples/styles-themes-sizes-with-addon-and-X-disabled';
import StylesThemeSizesWithAddonAndCloseInteractiveExample from './examples/styles-themes-sizes-with-addon-and-X-interactive';
import StylesThemeSizesWithAddonInteractiveExample from './examples/styles-themes-sizes-with-addon-interactive';
import StylesThemeSizesWithDisabledXExample from './examples/styles-themes-sizes-with-icon-and-disabled-X';
import StylesThemeSizesWithIconAndXExample from './examples/styles-themes-sizes-with-icon-and-X';
import StylesThemeSizesWithXExample from './examples/styles-themes-sizes-with-X';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag/Tests',
  component: Tag,
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Basic: StoryObj<typeof BasicExample> = {
  args: defaultProps,
  argTypes: {
    text: {
      control: 'text',
      description: 'Text content of the tag',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the tag is disabled',
    },
    active: {
      control: 'boolean',
      description: 'Whether the tag is in active state',
    },
    interactive: {
      control: 'boolean',
      description: 'Whether the tag is interactive (hoverable/clickable)',
    },
    theme: {
      control: 'select',
      options: ['primary', 'secondary', 'muted', 'invert'],
      description: 'Theme variant of the tag',
    },
    color: {
      control: 'text',
      description: 'Custom color for the tag (CSS color value)',
    },
    size: {
      control: 'select',
      options: ['m', 'l', 'xl'],
      description: 'Size of the tag',
    },
    showAddonLeft: {
      control: 'boolean',
      description: 'Show left addon (icon)',
    },
    showAddonRight: {
      control: 'boolean',
      description: 'Show right addon (icon)',
    },
    locale: {
      control: 'text',
      description: 'Locale for internationalization',
    },
  },
  render: BasicExample,
};

export const StylesThemeSizes: Story = {
  render: StylesThemeSizesExample,
};

export const StylesThemeSizesAddonsInteractive: Story = {
  render: StylesThemeSizesAddonsInteractiveExample,
};

export const StylesThemeSizesInteractive: Story = {
  render: StylesThemeSizesInteractiveExample,
};

export const DisabledStylesThemeSizes: Story = {
  render: DisabledStylesThemeSizesExample,
};

export const StylesThemeSizesWithAddonAndCloseInteractive: Story = {
  render: StylesThemeSizesWithAddonAndCloseInteractiveExample,
};

export const StylesThemeSizesWithAddonAndCloseActive: Story = {
  render: StylesThemeSizesWithAddonAndCloseActiveExample,
};

export const StylesThemeSizesWithAddonAndCloseDisabled: Story = {
  render: StylesThemeSizesWithAddonAndCloseDisabledExample,
};

export const StylesThemeSizesWithX: Story = {
  render: StylesThemeSizesWithXExample,
};

export const StylesThemeSizesWithIconAndX: Story = {
  render: StylesThemeSizesWithIconAndXExample,
};

export const StylesThemeSizesWithDisabledX: Story = {
  render: StylesThemeSizesWithDisabledXExample,
};

export const StylesThemeSizesWithAddonInteractive: Story = {
  render: StylesThemeSizesWithAddonInteractiveExample,
};
