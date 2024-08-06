<script lang="ts" setup>
import { inject, ref, watchPostEffect } from 'vue'
import { useData } from 'vitepress/dist/client/theme-default/composables/data'
import VPSwitch from 'vitepress/dist/client/theme-default/components/VPSwitch.vue'
import Tooltip from './Tooltip.vue'

const { isDark, theme } = useData()

const toggleAppearance = inject('toggle-appearance', () => {
  isDark.value = !isDark.value
})

const switchTitle = ref('')

watchPostEffect(() => {
  switchTitle.value = isDark.value
    ? theme.value.lightModeSwitchTitle || 'Switch to light theme'
    : theme.value.darkModeSwitchTitle || 'Switch to dark theme'
})
</script>

<template>
  <Tooltip :tooltipText="switchTitle">

    <VPSwitch :aria-label="switchTitle" class="VPSwitchAppearance" :aria-checked="isDark" @click="toggleAppearance">
      <span class="vpi-sun sun" />
      <span class="vpi-moon moon" />
    </VPSwitch>
  </Tooltip>
</template>

<style scoped>
.sun {
  opacity: 1;
}

.moon {
  opacity: 0;
}

.dark .sun {
  opacity: 0;
}

.dark .moon {
  opacity: 1;
}

.dark .VPSwitchAppearance :deep(.check) {
  /*rtl:ignore*/
  transform: translateX(18px);
}
</style>