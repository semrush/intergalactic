<script setup lang="ts">
import { useData } from 'vitepress/dist/client/theme-default/composables/data';
import { useSidebar } from 'vitepress/dist/client/theme-default/composables/sidebar';
import VPImage from 'vitepress/dist/client/theme-default/components/VPImage.vue';

const { site, theme } = useData();
const { hasSidebar } = useSidebar();
</script>

<template>
  <div class="VPNavBarTitle" :class="{ 'has-sidebar': hasSidebar }">
    <div class="title">
      <slot name="nav-bar-title-before" />
      <VPImage v-if="theme.logo" class="logo" :image="theme.logo" />
      <template v-if="theme.siteTitle"><span>{{ theme.siteTitle }}</span></template>
      <template v-else-if="theme.siteTitle === undefined"><span>{{ site.title }}</span></template>
      <slot name="nav-bar-title-after" />
    </div>
    </div>
</template>

<style scoped>
.title {
  display: flex;
  align-items: center;
  border-bottom: 1px solid transparent;
  width: 100%;
  height: var(--vp-nav-height);
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  transition: opacity 0.25s;
}

@media (min-width: 960px) {
  .title {
    flex-shrink: 0;
  }

  .VPNavBarTitle.has-sidebar .title {
    border-bottom-color: var(--vp-c-divider);
  }
}

:deep(.logo) {
  margin-right: 8px;
  height: var(--vp-nav-logo-height);
}
</style>