<template>
  TypeView
</template>

<script setup lang="ts">
import { createMarkdownRenderer } from 'vitepress/dist/node/index';

const { type, types } = defineProps({ type: String, types: Object })
console.log({ type, types })
</script>