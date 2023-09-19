<template>
  <div>
    <shadow-root>
      <div v-html="compiledCode"></div>
    </shadow-root>
    <div class="code-wrapper">
      <span v-html="sourceCode"></span>
    </div>
  </div>
</template>

<script setup lang="ts">
const { compiledCode: encodedCompiledCode, sourceCode: encodedSourceCode } = defineProps({ compiledCode: String, sourceCode: String })
const compiledCode = decodeURIComponent(atob(encodedCompiledCode!));
const sourceCode = decodeURIComponent(atob(encodedSourceCode!));
</script>