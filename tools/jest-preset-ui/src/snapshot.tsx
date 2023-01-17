import * as request from 'request';
import * as util from 'util';
import * as path from 'path';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from './testing';
import { expect } from 'vitest';
import * as axeMatchers from 'vitest-axe/matchers';
import { toHaveStyle } from '@testing-library/jest-dom/matchers';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
expect.extend({ toMatchImageSnapshot, toHaveStyle });
expect.extend(axeMatchers);
class NamedNodeMap {}
window.NamedNodeMap = NamedNodeMap;

const post = util.promisify(request.post);
const config: { path?: string } = {};

if (process.cwd().includes('semcore')) {
  config.path = path.resolve(process.cwd(), '../../.env');
}

global.HTMLElement.prototype.detachEvent = function (type, listener) {
  this.removeEventListener(type.replace('on', ''), listener);
};

require('dotenv').config(config);

const DEFAULT_OPTIONS = { selector: '#root' };

export async function snapshot(Component, options?: {}) {
  options = Object.assign({}, DEFAULT_OPTIONS, options);
  const _tmp = document.createElement('div');
  const root = createRoot(_tmp);
  jest.useFakeTimers();
  act(() => root.render(Component));
  if (!options) {
    act(() => jest.runAllTimers());
  }
  jest.useRealTimers();
  // ReactDOM.render(Component, _tmp);
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

  /* Uncomment line below to debug snapshot in your browser */
  // const fs = require('fs');
  // fs.writeFileSync('./tmp.html', html);
  const retires = 3;
  let body = null;
  let lastError = null;
  for (let retry = 0; retry < retires; retry++) {
    try {
      const response = await post({
        url: 'https://intergalactic-docker-ygli5wg7pq-uk.a.run.app/',
        encoding: null,
        form: {
          ...options,
          html,
          token: process.env.SCREENSHOT_TOKEN,
          // noCache: true
        },
      });
      body = response.body;
      break;
    } catch (error) {
      lastError = error;
    }
  }
  act(() => root.unmount());

  if (body === null) {
    throw lastError;
  }

  return body;
}

snapshot.ProxyProps = function (props) {
  const { children, ...others } = props;
  return React.Children.map(children, (child, i) =>
    React.cloneElement(child, {
      key: i,
      ...others,
    }),
  );
};

snapshot.Row = (props) => <div {...props} />;
