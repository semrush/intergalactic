<script setup lang="ts">
import { Ref } from 'vue'
import {
  preferSemcoreUi,
  preferSemcoreUiKey
} from './preferences'

const toggleSemcoreUiPacakge = useToggleFn(
  preferSemcoreUiKey,
  preferSemcoreUi,
  'prefer-composition'
)

const props = defineProps<{
  paddings?: boolean
}>()

function useToggleFn(
  storageKey: string,
  state: Ref<boolean>,
  className: string
) {
  if (typeof localStorage === 'undefined') {
    return () => { }
  }
  const classList = document.documentElement.classList
  return (value = !state.value) => {
    if ((state.value = value)) {
      classList.add(className)
    } else {
      classList.remove(className)
    }
    localStorage.setItem(storageKey, String(state.value))
  }
}
</script>

<template>
  <button class="option" :class="{ highlited: !preferSemcoreUi, paddings: props.paddings }" @click="toggleSemcoreUiPacakge(false)">intergalactic</button>
  <button class="option" :class="{ highlited: preferSemcoreUi, paddings: props.paddings }" @click="toggleSemcoreUiPacakge(true)">@semcore/ui</button>
  <div class="divider" :class="{ negativeMargins: props.paddings }" ></div>
  <a class="details" :class="{ paddings: props.paddings }"  href="/intergalactic/blog/new-npm-package/">About API preference</a>
</template>

<style scoped>
.option {
  display: block;
  color: var(--vp-c-text-1);
  font-size: 14px;
  font-weight: 500;
  padding: 4px 0;
  width: 100%;
  text-align: left;
  border-radius: 6px;
}
.option.highlited {
  font-weight: 700;
}
.option:hover:not(.highlited), .option:focus:not(.highlited) {
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-default-soft);
}
.divider {
  border-bottom: 1px solid var(--vp-c-divider);
  margin: 8px 0;
}
.details {
  font-weight: 500;
  font-size: 14px;
  color: var(--vp-code-link-color);
}
.details:hover {
  text-decoration: underline;
}
.paddings {
  padding-left: 24px;
  padding-right: 24px;
}
.negativeMargins {
  margin-left: -12px;
  margin-right: -12px;
}
</style>
