import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

// eslint-disable-next-line ssr-friendly/no-dom-globals-in-module-scope
ReactDOM.render(<App />, document.getElementById('root'));

// import React from 'react';
// import { createRoot } from 'react-dom/client';
// import { App } from './App';
//
// const root = createRoot(document.getElementById('root'));
// root.render(<App />);
