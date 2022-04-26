const request = require('request');
const util = require('util');
const fs = require('fs');
const path = require('path');
const React = require('react');
const ReactDOM = require('react-dom');

const post = util.promisify(request.post);
const config = {};

if (process.cwd().includes('semcore')) {
  config.path = path.resolve(process.cwd(), '../../.env');
}

require('dotenv').config(config);

if (!process.env.SCREENSHOT_URL) {
  throw new Error('Create .env file and insert SCREENSHOT_URL variable');
}

const DEFAULT_OPTIONS = { selector: '#root' };

async function snapshot(Component, options) {
  options = Object.assign({}, DEFAULT_OPTIONS, options);
  const _tmp = document.createElement('div');

  ReactDOM.render(Component, _tmp);

  const requestBody = _tmp.innerHTML;
  const style = document.head.innerHTML;
  const html = `
    <!DOCTYPE html>
    <html lang='en'>
        <head>
          <meta charset="UTF-8" />
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
          </style>${style}
        </head>
        <body>
            <div id='wrap'>
                <div id='root'>
                    ${requestBody}
                </div>
            </div>
        </body>
    </html>`;

  /* Uncomment line below to debug snapshot in your browser */
  // fs.writeFileSync('./tmp.html', html);
  const { body } = await post({
    url: process.env.SCREENSHOT_URL,
    encoding: null,
    form: {
      ...options,
      html,
    },
  });
  ReactDOM.unmountComponentAtNode(_tmp);
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

module.exports = snapshot;
