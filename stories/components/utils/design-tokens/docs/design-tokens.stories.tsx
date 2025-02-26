import type { Meta, StoryObj } from '@storybook/react';

import ThemeProviderExample from './examples/themeprovider';
import TokensWithCustomComponentExample from './examples/tokens-with-custom-component';

const meta: Meta = {
  title: 'Components/DesignTokens/Documentation',
};

export const ThemeProvider: StoryObj = {
  render: ThemeProviderExample,
};

export const TokensWithCustomComponent: StoryObj = {
    render: TokensWithCustomComponentExample,
  };

export default meta;
