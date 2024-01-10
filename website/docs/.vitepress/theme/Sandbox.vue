<template>
  <div :id="playgroundId" :class="{ 'playground-runtime': !hideCode, 'documentation-sandbox': true }">
  </div>
  <div class="code-wrapper" v-if="!hideCode">
    <span v-html="htmlCode"></span>
    <a title="Open CodeSandbox" class="open-codesandbox" target="_blank" rel='noopener noreferrer'
      :href="codesandboxUrl"></a>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { createRoot as createReactRoot } from 'react-dom/client'
import lzString from 'lz-string';
const { compressToBase64: lzCompressToBase64 } = lzString;

(globalThis as any).createReactRoot = createReactRoot;

const { playgroundId, htmlCode: codeEncoded, rawCode: rawCodeEncoded, hideCode: hideCodeEncoded, } = defineProps({ playgroundId: String, htmlCode: String, rawCode: String, hideCode: String })
const htmlCode = atob(codeEncoded!);
const rawCode = atob(rawCodeEncoded!);
const hideCode = hideCodeEncoded === 'true';

onMounted(() => {
  if (!playgroundId) return;
  const wrapper = document.querySelector(`#${playgroundId}`);
  if (!wrapper) return;
  wrapper.attachShadow({ mode: "open" });
  const shadowRoot = wrapper.shadowRoot!;
  const element = document.createElement("div");
  shadowRoot.appendChild(element);
  const reshadowContainer = document.querySelector("#__reshadow__");
  if (reshadowContainer) {
    shadowRoot.adoptedStyleSheets.push(...[...reshadowContainer.children].map((node) => {
      const sheet = new CSSStyleSheet()
      const styleNode = node as HTMLStyleElement
      const cssRules = [...(styleNode.sheet?.cssRules ?? [])];
      const cssText = cssRules.reduce((acc, rule) => acc + rule.cssText, '');
      sheet.replaceSync(cssText)
      return sheet;
    }))
  }
  globalThis[`render_${playgroundId}`]?.(element)
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