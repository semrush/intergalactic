<template>
  <div ref="containerRef">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
const containerRef = ref<HTMLElement>();

onMounted(() => {
  const innerHTML = containerRef.value?.innerHTML;
  const shadowRoot = containerRef.value?.attachShadow({ mode: 'open' });
  if (shadowRoot) {
    shadowRoot.innerHTML = innerHTML || '';
  }
});
</script>