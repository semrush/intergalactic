import React from 'react';
import type { Preview } from "@storybook/react";

import { PortalProvider } from '@semcore/portal';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story, params) => {
      const rootRef = React.useRef<HTMLDivElement>(null);

      return (
          <div style={{display: 'grid', gridTemplateRows: '20px 70vh 20px'}}>
            <div tabIndex={0}/>
            <PortalProvider value={rootRef}>
              <div ref={rootRef}>
                <Story/>
              </div>
            </PortalProvider>
            <div tabIndex={0}/>
          </div>
      );
    },
  ],
};

export default preview;
