<template>
  <a href="https://developer.semrush.com/" class="devportal-logo" target="_blank" aria-label="Developer home page">
    <svg width="32" height="32" viewBox="0 0 32 32" class="devportal-logo-img" aria-label="Semrush Developer portal" role="img" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.0964 8.00213C24.5215 8.00213 28.1418 11.6472 28.1418 16.002C28.1418 20.3568 24.6588 23.8877 20.3005 24H8.79908L15.7525 20.307H2L14.4915 13.678H7.6173L16.0069 9.22973C17.5118 8.4474 18.8604 8 20.0964 8V8.00213Z" />
    </svg>
    Developer
  </a>
  <a :href="link" class="title intergalactic-logo" aria-label="Intergalactic Design System home page" @click.prevent="navigateAndReload">
    Intergalactic
  </a>
</template>
<script setup lang="ts">
import { useData, useRouter } from 'vitepress';
import { onMounted, onUnmounted } from 'vue';
import {
  initAmplitude, initGlobalEventsHandler, disposeGlobalEventsHandler
} from './amplitude/amplitude'
import { getCurrentVersion, getVersionedBaseLink } from './VersionSwitcher';

const { theme } = useData()
const router = useRouter()
const link = getVersionedBaseLink(getCurrentVersion(theme, router.route))

onMounted(() => {
  initAmplitude();
  initGlobalEventsHandler(router);
})
onUnmounted(() => {
  disposeGlobalEventsHandler();
});

const navigateAndReload = () => {
  window.location.reload();
};
</script>

<style scoped>
.devportal-logo-img {
  fill: #181E15;
}
.dark .devportal-logo-img {
  fill: #fff;
}
</style>
