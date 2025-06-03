import * as path from 'path';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from './testing-library';

import playwright from 'playwright';
import { mockIllustrationsRequest } from './shared/mockIllustrationsRequest';

let browser: playwright.Browser | null = null;

const config: { path?: string } = {};

if (process.cwd().includes('semcore')) {
  config.path = path.resolve(process.cwd(), '../../.env');
}

require('dotenv').config(config);

const DEFAULT_OPTIONS = { selector: '#root' };

export const snapshot = async (
  Component: any,
  { ...options } = {} as {
    selector?: string;
    width?: number;
    height?: number;
    actions?: {
      hover?: string;
      active?: string;
      focus?: string;
    };
  },
) => {
  browser = await playwright.chromium.launch();
  const page = await browser.newPage();

  await mockIllustrationsRequest(page);

  options = Object.assign({}, DEFAULT_OPTIONS, options);
  const _tmp = document.createElement('div');
  const root = createRoot(_tmp);
  act(() => root.render(Component));
  const componentHtml = _tmp.innerHTML;
  const componentStyle = document.head.innerHTML;
  const html = `
    <!DOCTYPE html>
    <html lang='en'>
        <head>
          <meta charset='UTF-8' />
          <link href='https://fonts.googleapis.com/css2?family=Inter:slnt,wght@-10..0,100..900&amp;family=Ubuntu:wght@300;400;500;700&amp;display=swap' rel='stylesheet'>
          <style>
            html {
              font-family: Inter, sans-serif;
              -webkit-font-smoothing: antialiased;
            }

            body {
              min-height: 100vh;
              margin: 0;
            }

            #wrap {
              display: flex;
            }
            #root {
              margin: auto;
              padding: 5px;
              position: relative;
            }
            * {
              animation: none !important;
              transition: none !important;
              transition-delay: 0ms !important;
            }
            *::after {
              animation: none !important;
              transition: none !important;
              transition-delay: 0ms !important;
            }

            *::before {
              animation: none !important;
              transition: none !important;
              transition-delay: 0ms !important;
            }
          </style>${componentStyle}
        </head>
        <body>
            <div id='wrap'>
                <div id='root'>
                    ${componentHtml}
                </div>
            </div>
        </body>
    </html>`;

  await page.setContent(html);
  const mainElement = await page.$(options.selector! || 'body');

  if (options.width && options.height)
    await page.setViewportSize({ width: options.width, height: options.height });
  await page.waitForLoadState('networkidle');

  if (options.actions?.active) {
    await page.click(options.actions.active);
    await page.mouse.down();
  }
  if (options.actions?.hover) {
    await page.hover(options.actions.hover);
  }
  if (options.actions?.focus) {
    const element = page.locator(options.actions.focus);
    const elementTabIndex = await element.getAttribute('tabindex');
    if (elementTabIndex !== '-1') {
      await element.focus();
    }
  }
  const boundingBox = await mainElement?.boundingBox();
  const pageSize = await page.viewportSize();
  const clip = {
    x: boundingBox?.x ?? 0,
    y: boundingBox?.y ?? 0,
    width: boundingBox?.width ?? pageSize?.width ?? 300,
    height: boundingBox?.height ?? pageSize?.height ?? 300,
  };
  const screenshot = await page.screenshot({ clip });

  await page.close();

  return screenshot;
};

snapshot.ProxyProps = function (props: any) {
  const { children, ...others } = props;
  return React.Children.map(children, (child: any, i: number) =>
    React.cloneElement(child, {
      key: `${i}`,
      ...others,
    }),
  );
};

snapshot.Row = (props: any) => <div {...props} />;
