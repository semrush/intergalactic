<script lang="ts" setup>
import VPNavScreenMenuLink from 'vitepress/dist/client/theme-default/components/VPNavScreenMenuLink.vue'
import VPNavScreenMenuGroup from 'vitepress/dist/client/theme-default/components/VPNavScreenMenuGroup.vue'
import VPNavScreenMenuGroupSection from 'vitepress/dist/client/theme-default/components/VPNavScreenMenuGroupSection.vue'
import { watch, ref, onMounted, onUnmounted } from 'vue'
import { useData, useRouter } from 'vitepress';

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
  <nav v-if="theme.nav" class="VPNavScreenMenu">
    <VPNavScreenMenuGroupSection v-if="versionSwitcherSettings" :text="versionSwitcherSettings.text" :items="versionSwitcherSettings.items" />
    <template v-for="item in theme.nav" :key="JSON.stringify(item)">
      <VPNavScreenMenuLink v-if="'link' in item" :item="item" />
      <component
          v-else-if="'component' in item"
          :is="item.component"
          v-bind="item.props"
          screen-menu
      />
      <VPNavScreenMenuGroup
          v-else
          :text="item.text || ''"
          :items="item.items"
      />
    </template>
  </nav>
</template>
