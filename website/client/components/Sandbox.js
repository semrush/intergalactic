import React from 'react';
import Tooltip from '@semcore/tooltip';
import { getParameters } from 'codesandbox/lib/api/define';

export default ({ raw: { code: ExampleRawComponent, path } }) => {
  let dependencies = ExampleRawComponent.match(/from.+/g);
  if (!dependencies) return null;
  dependencies = dependencies
    .map((str) => str.match(/'.+'/g))
    .flat()
    .map((str) => str && str.slice(1, -1))
    .reduce((acc, str) => {
      if (str) {
        return { ...acc, [str.replace(/icon\/lib.+/g, 'icon')]: 'latest' };
      }
      return acc;
    }, {});

  const parameters = getParameters({
    files: {
      'src/index.js': {
        content: `import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
    <App />,
  rootElement
);
`,
      },
      'src/App.js': {
        content: `//https://github.com/semrush/intergalactic/tree/master/website/docs/${path}
${ExampleRawComponent}`,
      },
      'package.json': {
        content: {
          dependencies: {
            ...dependencies,
            'react-dom': 'latest',
            '@semcore/core': 'latest',
            'react-scripts': 'latest',
          },
        },
      },
    },
  });

  return (
    <Tooltip
      title="Open in CodeSandbox"
      tag="a"
      target="__blank"
      href={`https://codesandbox.io/api/v1/sandboxes/define?parameters=${parameters}`}
    >
      <svg viewBox="0 0 1024 1024" fill="currentColor">
        <path d="M755 140.3l0.5-0.3h0.3L512 0 268.3 140h-0.3l0.8 0.4L68.6 256v512L512 1024l443.4-256V256L755 140.3z m-30 506.4v171.2L548 920.1V534.7L883.4 341v215.7l-158.4 90z m-584.4-90.6V340.8L476 534.4v385.7L300 818.5V646.7l-159.4-90.6zM511.7 280l171.1-98.3 166.3 96-336.9 194.5-337-194.6 165.7-95.7L511.7 280z"></path>
      </svg>
    </Tooltip>
  );
};
