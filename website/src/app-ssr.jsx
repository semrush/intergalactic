import React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { App } from './App';
import { sstyled as semcoreSstyled } from '@semcore/core';

globalThis.renderApp = () => {
  return {
    html: ReactDOMServer.renderToString(<App />),
    semcoreCss: semcoreSstyled.getStyles().css,
  };
};
