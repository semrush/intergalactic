<template>
  <div :id="playgroundId" :class="{ 'playground-runtime': !hideCode, 'documentation-sandbox': true }"></div>
  <div class="code-wrapper" v-if="!hideCode">
    <span v-html="htmlCode"></span>
    <a title="Open CodeSandbox" class="open-codesandbox" target="_blank" rel='noopener noreferrer'
      :href="codesandboxUrl"></a>
  </div>
</template>

<style>
.playground-runtime {
  padding-top: 20px;
  margin-top: 20px;
  padding-bottom: 20px;
  margin-bottom: -5px;
  border-radius: 8px;
  padding-left: 4px;
  padding-right: 4px;
}

.dark .playground-runtime {
  /* background-color: white; */
}

@media (min-width: 640px) {
  .playground-runtime {
    padding-left: 24px;
    padding-right: 24px;
  }
}

.code-wrapper {
  position: relative;
}

.open-codesandbox {
  color: white;
  position: absolute;
  top: 0;
  right: 64px;
  direction: ltr;
  position: absolute;
  top: 12px;
  z-index: 3;
  border: 1px solid var(--vp-code-copy-code-border-color);
  border-radius: 4px;
  width: 40px;
  height: 40px;
  background-color: var(--vp-code-copy-code-bg);
  opacity: 0;
  cursor: pointer;
  background-image: url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024' fill='rgba(128,128,128,1)'%3E%3Cpath d='M755 140.3l0.5-0.3h0.3L512 0 268.3 140h-0.3l0.8 0.4L68.6 256v512L512 1024l443.4-256V256L755 140.3z m-30 506.4v171.2L548 920.1V534.7L883.4 341v215.7l-158.4 90z m-584.4-90.6V340.8L476 534.4v385.7L300 818.5V646.7l-159.4-90.6zM511.7 280l171.1-98.3 166.3 96-336.9 194.5-337-194.6 165.7-95.7L511.7 280z' /%3E%3C/svg%3E");
  background-position: 50%;
  background-size: 20px;
  background-repeat: no-repeat;
  transition: border-color 0.25s, background-color 0.25s, opacity 0.25s;
}

.open-codesandbox:hover,
.open-codesandbox:focus,
.open-codesandbox:active {
  opacity: 1;
  border-color: var(--vp-code-copy-code-hover-border-color);
  background-color: var(--vp-code-copy-code-hover-bg);
}

.code-wrapper:hover .open-codesandbox,
.code-wrapper:hover .copy.copy.copy.copy {
  opacity: 1;
}

.documentation-sandbox {
  margin-top: 20px;
}
</style>

<script setup lang="ts">
import { createRoot as createReactRoot } from 'react-dom/client'
import lzString from 'lz-string';
const { compressToBase64: lzCompressToBase64 } = lzString;

(globalThis as any).createReactRoot = createReactRoot;
const { playgroundId, htmlCode: codeEncoded, rawCode: rawCodeEncoded, hideCode, } = defineProps({ playgroundId: String, htmlCode: String, rawCode: String, hideCode: String })
const htmlCode = JSON.parse(codeEncoded!);
const rawCode = JSON.parse(rawCodeEncoded!);

console.log({
  htmlCode,
  rawCode
})


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

const dependencies = {};
const lines = rawCode!.split('\n');
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

const codesandboxParameters = dataToLzCompressedJson({
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
    'src/index.tsx': {
      content: `import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

const root = createRoot(document.getElementById("root"));
root.render(<App />);
`,
    },
    'src/App.tsx': {
      content: rawCode + '\n\nexport const App = () => <Demo />;\n',
    },
  },
});

const codesandboxUrl = `https://codesandbox.io/api/v1/sandboxes/define?parameters=${codesandboxParameters}`;
</script>