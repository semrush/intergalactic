import { PortalProvider } from '@semcore/base-components';
import type { Preview } from '@storybook/react-vite';
import React from 'react';

import '@semcore/theme/light.css';

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
  if (import.meta.hot) {
    import.meta.hot.on('css-variables-update', (data) => {
      let styleTag = document.querySelector(`[data-vite-dev-id="${data.file}"]`);
      if (!styleTag) {
        styleTag = document.createElement('style');
        styleTag.setAttribute('data-vite-dev-id', data.file);
        document.head.appendChild(styleTag);
      }

      styleTag.innerHTML = data.css;
    });
  }

  return (
    <>
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
    strictMode: 'off',
  },
  decorators: [
    withStrictMode,
    withTheme,
    withPortalProvider,
    withLayout,
  ],
};

export default preview;
