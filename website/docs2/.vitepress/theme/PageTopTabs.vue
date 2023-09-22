
<template>
  <div class="page-title-container" v-if="title">
    <h1 class="page-title">{{ title }}</h1>
  </div>
  <div class="page-top-tabs-container">
    <div class="page-top-tabs-content">
      <VPFeature v-for="tab in tabs" :title="tab.title" :link="tab.url" :data-current="tab.current" />
    </div>
    <div class="page-top-tabs-fake-aside"></div>
  </div>
</template>

<style>
.page-top-tabs-container,
.page-title-container {
  display: flex;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
}

.page-title {
  width: 100%;
  max-width: 688px;
  font-weight: 600;

  letter-spacing: -0.02em;
  line-height: 40px;
  font-size: 28px;

  margin-bottom: 20px;
}

.page-top-tabs-content {
  width: 100%;
  max-width: 688px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  flex-direction: column;
}

.page-top-tabs-fake-aside {
  display: none;
  position: relative;
  flex-grow: 1;
  padding-left: 32px;
  width: 100%;
  max-width: 256px;
}

@media (min-width: 680px) and (max-width: 1280px) {
  .page-top-tabs-container {
    margin-bottom: 20px;
  }
}

@media (min-width: 1280px) {
  .page-top-tabs-fake-aside {
    display: block;
  }
}

@media (min-width: 768px) {
  .page-top-tabs-content {
    flex-direction: row;
  }
}

.VPFeature {
  flex: 1;
}

.VPFeature[data-current="true"] {
  border-color: var(--vp-c-brand);
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
const title = computed(() => frontmatter.value.title);
</script>