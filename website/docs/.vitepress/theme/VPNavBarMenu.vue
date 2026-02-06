<script lang="ts" setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useData, useRouter } from 'vitepress';
import VPNavBarMenuLink from 'vitepress/dist/client/theme-default/components/VPNavBarMenuLink.vue'
import VPNavBarMenuGroup from 'vitepress/dist/client/theme-default/components/VPNavBarMenuGroup.vue'

import { getSwitcherData, getCurrentVersion } from './VersionSwitcher';

const { theme, page } = useData()
const { route } = useRouter()

const versionSwitcherSettings = ref<null | {text: string, items: any[]}>(null)

const handleHashChange = () => {
  versionSwitcherSettings.value = getSwitcherData(theme, route, getCurrentVersion(theme, route))
}

onMounted(() => {
  versionSwitcherSettings.value = getSwitcherData(theme, route, getCurrentVersion(theme, route))
  window.addEventListener('hashchange', handleHashChange)
})
onUnmounted(() => {
  window.removeEventListener('hashchange', handleHashChange)
})

watch(() => page.value, () => {
  versionSwitcherSettings.value = getSwitcherData(theme, route, getCurrentVersion(theme, route))
})

</script>

<template>
  <nav v-if="theme.nav" aria-labelledby="main-nav-aria-label" class="VPNavBarMenu">
    <span id="main-nav-aria-label" class="visually-hidden">Main Navigation</span>
    <VPNavBarMenuGroup v-if="versionSwitcherSettings" :item="versionSwitcherSettings" />
    <template v-for="item in theme.nav" :key="item.text">
      <VPNavBarMenuLink v-if="'link' in item" :item="item" />
      <VPNavBarMenuGroup v-else :item="item" />
    </template>
  </nav>
</template>

<style scoped>
.VPNavBarMenu {
  display: none;
}



@media (min-width: 768px) {
  .VPNavBarMenu {
    display: flex;
  }
}
</style>
