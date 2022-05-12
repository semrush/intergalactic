import React from 'react';
import * as ReactDOMServer from 'react-dom/umd/react-dom-server.browser.production.min.js';
import { App } from './App';

globalThis.renderApp = () => ReactDOMServer.renderToString(<App />);
