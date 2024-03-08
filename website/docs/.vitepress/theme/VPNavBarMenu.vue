<script lang="ts" setup>
import { useData } from 'vitepress'
import VPNavBarMenuLink from 'vitepress/dist/client/theme-default/components/VPNavBarMenuLink.vue'
import VPNavBarMenuGroup from 'vitepress/dist/client/theme-default/components/VPNavBarMenuGroup.vue'
import VPFlyout from 'vitepress/dist/client/theme-default/components/VPFlyout.vue'
import PreferenceSwitch from './PreferenceSwitch.vue';
import { preferSemcoreUi } from './preferences'

const { theme } = useData()
</script>

<template>
  <nav v-if="theme.nav" aria-labelledby="main-nav-aria-label" class="VPNavBarMenu">
    <span id="main-nav-aria-label" class="visually-hidden">Main Navigation</span>
    <template v-for="item in theme.nav" :key="item.text">
      <VPNavBarMenuLink v-if="'link' in item" :item="item" />
      <VPNavBarMenuGroup v-else :item="item" />
    </template>
    <VPFlyout
      :class="{
        VPNavBarMenuGroup: true,
        active: false
      }"
      :button="preferSemcoreUi ? '@semcore/ui' : 'intergalactic'"
      :items="[]"
    >
      
      <PreferenceSwitch :paddings="true" />
    </VPFlyout>
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