<template>
  <div :id="playgroundId" :class="{ 'playground-runtime': !hideCode, 'documentation-sandbox': true }" aria-label="Playground" :role="!hideCode ? null : 'region'">
  </div>
  <div class="code-wrapper" v-if="!hideCode">
    <span v-html="htmlCode"></span>
    <a title="Open CodeSandbox" class="open-codesandbox" target="_blank" rel='noopener noreferrer'
      :href="codesandboxUrl"></a>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { createRoot as createReactRoot } from 'react-dom/client'
import lzString from 'lz-string';
import { isolateStyles } from './isolateStyles';
const { compressToBase64: lzCompressToBase64 } = lzString;

(globalThis as any).createReactRoot = createReactRoot;

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

const { playgroundId, htmlCode: codeEncoded, rawCode: rawCodeEncoded, hideCode: hideCodeEncoded, stylesIsolation } = defineProps({ playgroundId: String, htmlCode: String, rawCode: String, hideCode: String, stylesIsolation: Boolean })
const htmlCode = computed(() => {
  let code = atob(codeEncoded!).replace(/intergalactic\//g, "@semcore/ui/");
  return code.replace('tabindex="0" v-pre=""><code>', 'v-pre=""><code>');
});
const codesandboxUrl = computed(() => {
  let code = rawCode.replace(/'intergalactic\//g, "'@semcore/ui/");
  const dependencies = {};
  const lines = code!.split('\n');
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
  /*
  <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
      rel="stylesheet"
    />*/

  const codesandboxParameters = dataToLzCompressedJson({
    files: {
      'package.json': {
        content: {
          dependencies: {
            ...dependencies,
            react: '18',
            'react-dom': '18',
            '@types/react': '18',
            '@fontsource/inter': '5'
          },
        },
      },
      'src/index.tsx': {
        content: `import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./styles.css"
import "@fontsource/inter";

const root = createRoot(document.getElementById("root"));
root.render(<App />);
`,
      },
      'src/styles.css': {
        content: `body {
  font-family: 'Inter', sans-serif;
}`
      },
      'src/App.tsx': {
        content: code + '\n\nexport const App = () => <Demo />;\n',
      },
    },
  });

  return `https://codesandbox.io/api/v1/sandboxes/define?parameters=${codesandboxParameters}`;
})

let rawCode = atob(rawCodeEncoded!);
const hideCode = hideCodeEncoded === 'true';

onMounted(() => {
  if (!playgroundId) return;
  const wrapper = document.querySelector(`#${playgroundId}`) as HTMLDivElement | undefined;
  if (!wrapper) return;
  let element = stylesIsolation ? isolateStyles(wrapper) : wrapper;

  globalThis[`render_${playgroundId}`]?.(element)
})
</script>
