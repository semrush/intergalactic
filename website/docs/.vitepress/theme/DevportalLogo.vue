<template>
  <a href="https://developer.semrush.com/" class="devportal-logo" target="_blank" aria-label="Developer home page">
    <img src="/devportal-logo.svg" width="32" height="32" class="devportal-logo-img" alt="Semrush Developer portal" />
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
