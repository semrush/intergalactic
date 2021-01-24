import React from 'react';
import ReactDOM from 'react-dom';
import FpsEmitter from 'fps-emitter';

const fps = new FpsEmitter();

// Get the current FPS, as an integer between 0 and 60:
// var currentFps = fps.get()

// Or get notified whenever it changes:
// fps.on('update', function (newFps) {
//   console.log('FPS is: ', newFps)
// });

document.title = 'React Desktop Playground';
document.body.style.backgroundSize = 'cover';
document.body.style.margin = '0';
document.body.style.padding = '0';
document.body.style.overflow = 'auto';
document.body.style.height = '200vh';

document.body.innerHTML = `
  <div id="root" style="width: 100%; height: 100%;"></div>
`;

const startTime = Date.now();
const render = (Component, fn) =>
  ReactDOM.render(<Component />, document.getElementById('root'), fn);
try {
  render(require('./Playground.js').default, () => {
    console.info('Render time ms:', Date.now() - startTime);
  });
} catch (e) {
  console.error(e);
  render(() => <h1>Create file playground/Playground.js and export default React component</h1>);
}

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./Playground.js', function() {
    render(require('./Playground.js').default);
  });
}
