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
    <html>
        <head>
          <meta charset="UTF-8" />
          <style>
            /* cyrillic */
            /*@font-face {*/
              /*font-family: 'Ubuntu';*/
              /*font-style: normal;*/
              /*font-weight: 400;*/
              /*src: local('Ubuntu Regular'), local('Ubuntu-Regular'), url(https://fonts.gstatic.com/s/ubuntu/v12/4iCs6KVjbNBYlgoKew72nU6AF7xm.woff2) format('woff2');*/
              /*unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;*/
            /*}*/
            
            body, html {
              color: #333;
              font-size: 12px;
              /*font-family: Ubuntu, sans-serif;*/
              /*-webkit-font-smoothing: antialiased;*/
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
            <div id="wrap">
                <div id="root">
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
