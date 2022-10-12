import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

// eslint-disable-next-line ssr-friendly/no-dom-globals-in-module-scope
const root = createRoot(document.getElementById('root'));
root.render(<App />);
