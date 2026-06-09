import { PortalProvider } from '@semcore/base-components';
import type { Preview } from '@storybook/react-vite';
import React from 'react';

// import '@semcore/theme/lib/highlights-light.css';

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
    (Story, params) => {
      const rootRef = React.useRef<HTMLDivElement>(null);
      const stylesheet = params.globals.theme === 'new'
        ? 'assets/theme/light.css'
        : 'assets/core/light.css';

      const stylesheetHighlight = params.globals.theme === 'new'
        ? 'assets/theme/highlights-light.css'
        : 'assets/core/highlights-light.css';

      const story = params.globals.strictMode === 'on'
        ? (
            <React.StrictMode>
              <Story />
            </React.StrictMode>
          )
        : <Story />;

      if (params.parameters.layout === 'fullscreen') {
        return (
          <>
            <link rel='stylesheet' href={stylesheet} />
            <link rel='stylesheet' href={stylesheetHighlight} />
            <PortalProvider value={rootRef}>
              <div ref={rootRef}>
                {story}
              </div>
            </PortalProvider>
          </>
        );
      }

      return (
        <>
          <link rel='stylesheet' href={stylesheet} />
          <link rel='stylesheet' href={stylesheetHighlight} />
          <div style={{ display: 'grid', gridTemplateRows: '20px auto 20px' }}>
            <div tabIndex={0} />
            <PortalProvider value={rootRef}>
              <div ref={rootRef}>
                {story}
              </div>
            </PortalProvider>
            <div tabIndex={0} />
          </div>
        </>
      );
    },
  ],
};

export default preview;
