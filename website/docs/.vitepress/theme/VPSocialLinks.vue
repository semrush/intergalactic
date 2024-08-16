<script lang="ts" setup>
import type { DefaultTheme } from 'vitepress/theme'
import VPSocialLink from 'vitepress/dist/client/theme-default/components/VPSocialLink.vue'
import Tooltip from './Tooltip.vue'

defineProps<{
  links: DefaultTheme.SocialLink[]
}>()
</script>

<template>
  <div class="VPSocialLinks">
    <Tooltip v-for="{ link, icon, ariaLabel } in links" :key="link" :tooltipText="ariaLabel">
      <VPSocialLink :icon="icon" :link="link" :ariaLabel="ariaLabel" />
    </Tooltip>
  </div>
</template>

<style scoped>
.VPSocialLinks {
  display: flex;
  justify-content: center;
}
</style>