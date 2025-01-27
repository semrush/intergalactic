<template>
  <div>
    <ShadowRoot>
      <div v-html="compiledCode"></div>
    </ShadowRoot>
    <div class="code-wrapper">
      <span v-html="sourceCode"></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import ShadowRoot from './ShadowRoot.vue';
const { compiledCode: encodedCompiledCode, sourceCode: encodedSourceCode } = defineProps({
  compiledCode: String,
  sourceCode: String,
});
const compiledCode = decodeURIComponent(atob(encodedCompiledCode!));
const sourceCode = decodeURIComponent(atob(encodedSourceCode!));
</script>