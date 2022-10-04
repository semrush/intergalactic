import React, { useCallback } from 'react';
import Tooltip from '@semcore/tooltip';
import { compressToBase64 as lzCompressToBase64 } from 'lz-string';

const dataToLzCompressedJson = (data) => {
  /**
   * Ejected from
   * "codesandbox-import-utils/lib/api/define" from
   * "codesandbox/lib/api/define"
   */
  const json = JSON.stringify(data);
  const base64 = lzCompressToBase64(json)
    .replace(/\+/g, '-') // Convert '+' to '-'
    .replace(/\//g, '_') // Convert '/' to '_'
    .replace(/=+$/, ''); // Remove ending '='

  return base64;
};

export default ({ raw: { code: ExampleRawComponent, path } }) => {
  const dependencies = {};
  const lines = ExampleRawComponent.split('\n');
  for (const line of lines) {
    for (const quote of ["'", '"']) {
      const importStatementStart = line.indexOf(`from ${quote}`);
      if (importStatementStart === -1) continue;
      if (line[importStatementStart - 1] !== ' ' && importStatementStart !== 0) continue;
      const importStatementPart = line.substring(importStatementStart + `from ${quote}`.length);
      const importStatementEnd = importStatementPart.indexOf(quote);
      let dependency = importStatementPart.substring(0, importStatementEnd);
      if (dependency.startsWith('@')) {
        dependency = dependency.split('/').slice(0, 2).join('/');
      } else {
        dependency = dependency.split('/')[0];
      }
      dependencies[dependency] = 'latest';
      break;
    }
  }

  const parameters = dataToLzCompressedJson({
    files: {
      'package.json': {
        content: {
          dependencies: {
            ...dependencies,
            react: '18',
            'react-dom': '18',
            '@semcore/core': 'latest',
          },
        },
      },
      'src/index.js': {
        content: `import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(<App />);
`,
      },
      'src/App.js': {
        content: `//https://github.com/semrush/intergalactic/tree/master/website/docs/${path}
${ExampleRawComponent}`,
      },
    },
  });

  const openHandler = useCallback(() => {
    if (window.dataLayer) {
      dataLayer.push({
        event: 'semrush',
        eventCategory: 'intergalactic:example',
        eventAction: 'click:sandbox',
        eventLabel: path,
      });
    }
  }, [path]);

  return (
    <Tooltip
      title="Open in CodeSandbox"
      tag="a"
      rel="noopener noreferrer nofollow"
      target="__blank"
      href={`https://codesandbox.io/api/v1/sandboxes/define?parameters=${parameters}`}
      onClick={openHandler}
    >
      <svg viewBox="0 0 1024 1024" fill="currentColor">
        <path d="M755 140.3l0.5-0.3h0.3L512 0 268.3 140h-0.3l0.8 0.4L68.6 256v512L512 1024l443.4-256V256L755 140.3z m-30 506.4v171.2L548 920.1V534.7L883.4 341v215.7l-158.4 90z m-584.4-90.6V340.8L476 534.4v385.7L300 818.5V646.7l-159.4-90.6zM511.7 280l171.1-98.3 166.3 96-336.9 194.5-337-194.6 165.7-95.7L511.7 280z"></path>
      </svg>
    </Tooltip>
  );
};
