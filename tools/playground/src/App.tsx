import React from 'react';

// eslint-disable-next-line import/no-unresolved
import { playgrounds } from '@playgrounds';
import { useLocationHash } from './components/useLocationHash';
import { Nav } from './components/Nav';
import './app.css';
import { ErrorBoundary } from './components/ErrorBoundary';

export const PlaygroundWrapper: React.FC = () => {
  const [playground] = useLocationHash();

  if (!playground) {
    return (
      <div>
        <h2>Welcome to Intergalactic playground</h2>
        <div>To get started:</div>
        <ol>
          <li>
            copy-paste <strong>./tools/playground/examples/index.tsx</strong> file
          </li>
          <li>rename it to anything meaninfgul</li>
          <li>
            edit it as you need: created playground will be displayed in panel above after page
            reload and every playground is fully rebuilt on every page reload
          </li>
        </ol>
      </div>
    );
  }

  if (!playgrounds[playground]) {
    return (
      <div>
        Playgorund <strong>{playground}</strong> not found. Pick one in the list above or{' '}
        <a href="#">create new</a>
      </div>
    );
  }

  const Playground = playgrounds[playground];

  if (typeof Playground !== 'function') {
    // eslint-disable-next-line no-console
    console.log({ Playground });
    return (
      <div>
        Playgorund <strong>{playground}</strong> has no function in default export (what we got see
        in developer console)
      </div>
    );
  }

  return (
    <ErrorBoundary id={playground}>
      <Playground />
    </ErrorBoundary>
  );
};

export const App: React.FC = () => {
  return (
    <div>
      <Nav />
      <div className="intergalactic-playground_playground-view">
        <PlaygroundWrapper />
      </div>
    </div>
  );
};
