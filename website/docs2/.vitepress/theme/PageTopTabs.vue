
<template>
  <div class="page-top-tabs">
    <VPFeature v-for="tab in tabs" :title="tab.title" :link="tab.url" :data-current="tab.current" />
  </div>
</template>

<style>
.page-top-tabs {
  width: 100%;
  max-width: 688px;
  margin-left: 80px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.VPFeature {
  flex: 1;
}

.VPFeature[data-current="true"] {
  border-color: var(--vp-c-brand);
}

.page-top-tabs .VPFeature .box {
  padding: 12px;
}
</style>
<script setup>
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'
import VPFeature from 'vitepress/dist/client/theme-default/components/VPFeature.vue';
const { frontmatter } = useData();
const route = useRoute();
const tabs = computed(() => (typeof frontmatter.value.tabs === 'string') ? frontmatter.value.tabs.split(',').map(tab => {
  const urlLastPart = tab.substring(tab.lastIndexOf("('") + 2, tab.lastIndexOf("')")).trim()
  const title = tab.substring(0, tab.indexOf("('")).trim()
  const url = route.path.split('/').slice(0, -1).join('/') + '/' + urlLastPart
  const current = route.path === url || route.path === (url + '.html');
  return { url, title, current }
}) : []);
</script>