<template>
  <div :id="playgroundId" :class="{ 'playground-runtime': !hideCode, 'documentation-sandbox': true }">
  </div>
  <div class="code-wrapper" v-if="!hideCode">
    <button type="button" title="Open in StackBlitz" aria-label="Open in StackBlitz" class="open-stackblitz" @click="openStackblitz" />
    <span v-html="htmlCode"></span>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted } from 'vue';
import { createRoot as createReactRoot } from 'react-dom/client'
import { isolateStyles } from './isolateStyles';

(globalThis as any).createReactRoot = createReactRoot;

const { playgroundId, htmlCode: codeEncoded, rawCode: rawCodeEncoded, hideCode: hideCodeEncoded, stylesIsolation, mockData: mockDataEncoded } = defineProps({ playgroundId: String, htmlCode: String, rawCode: String, hideCode: String, stylesIsolation: Boolean, mockData: String })

const decodeBase64 = (str: string) => new TextDecoder().decode(Uint8Array.from(atob(str), c => c.charCodeAt(0)));

const htmlCode = computed(() => {
  let code = decodeBase64(codeEncoded!);
  return code.replace('tabindex="0" v-pre=""><code>', 'v-pre=""><code>');
});

const stackblitzFiles = computed(() => {
  const code = rawCode;
  const dependencies: Record<string, string> = {};
  const codeWithMockData = mockData ? `${rawCode}\n${mockData}` : rawCode;
  const lines = codeWithMockData.split('\n');

  for (const line of lines) {
    for (const quote of ["'", '"']) {
      if (line.includes(`from ${quote}./mock${quote}`)) continue;

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

  const files: Record<string, string> = {
    'package.json': JSON.stringify({
      name: 'intergalactic-example',
      private: true,
      scripts: {
        dev: 'vite',
      },
      stackblitz: {
        installDependencies: false,
        startCommand: 'pnpm install && pnpm run dev',
      },
      dependencies: {
        ...dependencies,
        react: '18',
        'react-dom': '18',
        '@fontsource/inter': '5',
        '@semcore/base-components': 'latest',
        '@semcore/core': 'latest',
        '@semcore/theme': 'latest',
        '@semcore/icon': 'latest',
        '@semcore/illustration': 'latest',
      },
      devDependencies: {
        vite: 'latest',
        typescript: 'latest',
        '@types/react': '18',
        '@types/react-dom': '18',
      },
    }, null, 2),
    'index.html': `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Intergalactic example<\/title>
  <\/head>
  <body>
    <div id="root"><\/div>
    <script type="module" src="/src/index.tsx"><\/script>
  <\/body>
<\/html>
`,
    'src/index.tsx': `import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./styles.css"
import "@fontsource/inter";

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
`,
    'src/styles.css': `body {
  font-family: 'Inter', sans-serif;
}`,
    'src/App.tsx': code + '\n\nexport const App = () => <Demo />;\n',
  };

  if (mockData) {
    files['src/mock.ts'] = mockData;
  }

  return files;
});


const openStackblitz = () => {
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = 'https://stackblitz.com/run?file=src/App.tsx';
  form.target = '_blank';
  form.style.display = 'none';

  const fields: Record<string, string> = {
    'project[title]': 'Intergalactic example',
    'project[template]': 'node',
  };

  for (const [path, content] of Object.entries(stackblitzFiles.value)) {
    fields[`project[files][${path}]`] = content;
  }

  for (const [name, value] of Object.entries(fields)) {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = value;
    form.appendChild(input);
  }

  document.body.appendChild(form);
  form.submit();
  form.remove();
};

let rawCode = decodeBase64(rawCodeEncoded!);
const hideCode = hideCodeEncoded === 'true';
const mockData = mockDataEncoded && decodeBase64(mockDataEncoded);

let reactRoot;

onMounted(() => {
  if (!playgroundId) return;
  const wrapper = document.querySelector(`#${playgroundId}`) as HTMLDivElement | undefined;
  if (!wrapper) return;
  let element = stylesIsolation ? isolateStyles(wrapper) : wrapper;

  reactRoot = globalThis[`render_${playgroundId}`]?.(element);
});

onBeforeUnmount(() => {
  reactRoot?.unmount();
});
</script>
