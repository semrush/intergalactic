
<template>
  <div class="page-title-container" v-if="title">
    <h1 class="page-title">{{ title }}</h1>
  </div>
  <div class="page-top-tabs-container">
    <div class="page-top-tabs-content">
      <a class="page-top-tabs-tab" v-for="tab in tabs" :href="tab.url" :data-current="tab.current" @click="handleClick">{{ tab.title }}</a>
    </div>
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
  gap: 16px;
  border-bottom: 1px solid var(--vp-c-divider);
  overflow: auto;
}

@media (min-width: 680px) and (max-width: 1280px) {
  .page-top-tabs-container {
    margin-bottom: 20px;
  }
}

.page-top-tabs-tab {
  border-bottom: 3px solid transparent;
  font-weight: 600;
  padding-bottom: 5px;
}

.page-top-tabs-tab:hover {
  border-color: var(--vp-c-divider);
}

.page-top-tabs-tab[data-current=true]:not(.page-top-tabs-tab[data-current=true] ~ .page-top-tabs-tab[data-current=true]) {
  border-color: var(--vp-c-brand);
}

</style>
<script setup>
import { computed } from 'vue'
import { useData, useRoute, useRouter } from 'vitepress'
const { frontmatter } = useData();
const route = useRoute();
const router = useRouter();
const tabs = computed(() => (typeof frontmatter.value.tabs === 'string') ? frontmatter.value.tabs.split(',').map(tab => {
  const urlLastPart = tab.substring(tab.lastIndexOf("('") + 2, tab.lastIndexOf("')")).trim()
  const title = tab.substring(0, tab.indexOf("('")).trim()
  const url = route.path.split('/').slice(0, -1).join('/') + '/' + urlLastPart
  const current = route.path === url || route.path === (url + '.html');
  return { url, title, current }
}) : []);
const title = computed(() => frontmatter.value.title);

async function handleClick(event) {
    event.preventDefault();
    await router.go(event.target.href);
    event.target.focus()
}

</script>