import { PortalProvider } from '@semcore/base-components';
import type { Preview } from '@storybook/react-vite';
import React from 'react';

type PreviewDecorator = NonNullable<Preview['decorators']>[number];

type StorybookStory = Parameters<PreviewDecorator>[0];

type StorybookDecoratorParams = Parameters<PreviewDecorator>[1] & {
  globals: Record<string, unknown> & {
    theme?: 'new' | 'old';
    strictMode?: 'on' | 'off';
  };
  parameters: Record<string, unknown> & {
    layout?: string;
  };
};

const withStrictMode = (
  Story: StorybookStory,
  params: StorybookDecoratorParams,
) => {
  return params.globals.strictMode === 'on'
    ? (
        <React.StrictMode>
          <Story />
        </React.StrictMode>
      )
    : <Story />;
};

const withLayout = (
  Story: StorybookStory,
  params: StorybookDecoratorParams,
) => {
  if (params.parameters.layout === 'fullscreen') {
    return <Story />;
  }

  return (
    <div style={{ display: 'grid', gridTemplateRows: '20px auto 20px' }}>
      <div tabIndex={0} />
      <Story />
      <div tabIndex={0} />
    </div>
  );
};

const withTheme = (
  Story: StorybookStory,
  params: StorybookDecoratorParams,
) => {
  const stylesheet = params.globals.theme === 'new'
    ? 'assets/theme/light.css'
    : 'assets/core/light.css';

  const stylesheetHighlight = params.globals.theme === 'new'
    ? 'assets/theme/highlights-light.css'
    : 'assets/core/highlights-light.css';

  return (
    <>
      <link rel='stylesheet' href={stylesheet} />
      <link rel='stylesheet' href={stylesheetHighlight} />
      <Story />
    </>
  );
};

const withPortalProvider = (
  Story: StorybookStory,
  params: StorybookDecoratorParams,
) => {
  const rootRef = React.useRef<HTMLDivElement>(null);

  return (
    <PortalProvider value={rootRef}>
      <div ref={rootRef}>
        <Story />
      </div>
    </PortalProvider>
  );
};

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        method: 'alphabetical',
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: false },
          { id: 'html-has-lang', enabled: false },
          { id: 'html-lang-valid', enabled: false },
          { id: 'meta-viewport', enabled: false },
          { id: 'video-caption', enabled: false },
          { id: 'scope-attr-valid', enabled: true },
        ],
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'Theme',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: [
          {
            value: 'old',
            icon: 'circle',
            title: 'Old theme',
          },
          {
            value: 'new',
            icon: 'circle',
            title: 'New theme',
          },
        ],
        dynamicTitle: true,
      },
    },
    strictMode: {
      description: 'React StrictMode',
      toolbar: {
        title: 'StrictMode',
        icon: 'circle',
        items: [
          {
            value: 'off',
            title: 'StrictMode off',
          },
          {
            value: 'on',
            title: 'StrictMode on',
          },
        ],
        dynamicTitle: true,
      },
    },
  },

  initialGlobals: {
    theme: 'new',
    strictMode: 'off',
  },
  decorators: [
    withStrictMode,
    withTheme,
    withLayout,
    withPortalProvider,
  ],
};

export default preview;
