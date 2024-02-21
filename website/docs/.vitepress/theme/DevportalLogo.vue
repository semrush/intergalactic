<template>
  <a href="https://developer.semrush.com/" class="devportal-logo" target="_blank"
    aria-label="Go to Semrush Developer portal">
    <img src="/devportal-logo.svg" width="30" height="30" class="devportal-logo" />
    Developer
  </a>
  <a .href="homeUrl" class="title intergalactic-logo" aria-label="Go to Intergalactic Design System main page">
    Intergalactic
  </a>
</template>
<script setup lang="ts">
const homeUrl = process.env.NODE_ENV === 'development' ? '/' : '/intergalactic/';

import { useRouter } from 'vitepress';
import { onMounted, onUnmounted } from 'vue';
import {
  initAmplitude, initGlobalEventsHandler, disposeGlobalEventsHandler
} from './amplitude/amplitude'

onMounted(() => {
  const router = useRouter();
  initAmplitude();
  initGlobalEventsHandler(router);
})
onUnmounted(() => {
  disposeGlobalEventsHandler();
});
</script>
