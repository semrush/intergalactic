import React from 'react';
import { createBreakpoints } from '@semcore/breakpoints';

const meadiaQueries = [
  '(max-width: 300px)',
  '(max-width: 500px)',
  '(max-width: 700px)',
  '(max-width: 900px)',
  '(max-width: 1100px)',
];

const mockedScreenQuery = '(max-width: 700px)';
const noop: any = () => {};
if (globalThis.window) {
  const realMatchMedia = window.matchMedia;
  window.matchMedia = (query): any => {
    if (meadiaQueries.includes(query)) {
      return {
        matches: query === mockedScreenQuery,
        meadia: query,
        onchange: null,
        addListener: noop,
        removeListener: noop,
        addEventListener: noop,
        removeEventListener: noop,
        dispatchEvent: noop,
      };
    }
    return realMatchMedia(query);
  };
}

const Breakpoints = createBreakpoints(meadiaQueries);

const Example = () => {
  const index = React.useContext(Breakpoints.Context);

  return (
    <div>Media matches '{(index !== undefined && meadiaQueries[index]) || 'ZOOM WINDOW'}'</div>
  );
};

const Demo = () => {
  return (
    <Breakpoints>
      <Example />
    </Breakpoints>
  );
};

export default Demo;
