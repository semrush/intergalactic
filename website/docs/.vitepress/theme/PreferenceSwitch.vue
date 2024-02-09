<script setup lang="ts">
import { useRoute } from 'vitepress'
import { ref, computed, inject, Ref } from 'vue'
import {
  preferSemcoreUi,
  preferSemcoreUiKey
} from './preferences'

const route = useRoute()
const show = computed(() =>
  /^\/intergalactic\/(components|data-display|table-group|filter-group|patterns|utils)\//.test(route.path)
)

let isOpen = ref(true)

const toggleOpen = () => {
  isOpen.value = !isOpen.value
}

const removeOutline = (event) => {
  (event.target as HTMLElement).classList.add('no-outline')
}

const restoreOutline = (event) => {
  (event.target as HTMLElement).classList.remove('no-outline')
}

const toggleSemcoreUiPacakge = useToggleFn(
  preferSemcoreUiKey,
  preferSemcoreUi,
  'prefer-composition'
)
const closeSideBar = inject('close-sidebar') as () => void

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
  <div v-if="show" class="preference-switch" :class="{ open: isOpen }">
    <button class="toggle" aria-label="preference switches toggle" aria-controls="preference-switches"
      :aria-expanded="isOpen" @click="toggleOpen" @mousedown="removeOutline" @blur="restoreOutline">
      <span>API Preference</span>
      <svg class="vp-link-icon" :class="{ open: isOpen }" aria-hidden="true" focusable="false" viewBox="0 0 24 24">
        <path
          d="M12,16c-0.3,0-0.5-0.1-0.7-0.3l-6-6c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l5.3,5.3l5.3-5.3c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-6,6C12.5,15.9,12.3,16,12,16z" />
      </svg>
    </button>
    <div :hidden="!isOpen" :aria-hidden="!isOpen">
      <div class="switch-container">
        <label class="label" :class="{ highlited: !preferSemcoreUi }"
          @click="toggleSemcoreUiPacakge(false)">intergalactic</label>
        <button class="vp-switch api-switch" aria-label="prefer @semcore/ui package" :aria-checked="preferSemcoreUi"
          @click="toggleSemcoreUiPacakge()" type="button" role="switch">
          <span class="vp-switch-check" :class="{ switchChecked: preferSemcoreUi }"></span>
        </button>
        <label class="label" :class="{ highlited: preferSemcoreUi }"
          @click="toggleSemcoreUiPacakge(true)">@semcore/ui</label>
        <a class="switch-link" title="About API preference"
          href="/get-started-guide/dev-starter-guide/dev-starter-guide#semcore-ui-package" @click="closeSideBar">?</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.preference-switch {
  font-size: 12px;
  border-bottom: 1px solid var(--vp-c-divider);
  transition: border-color 0.5s, background-color 0.5s ease;
  margin-top: 20px;
  position: sticky;
  top: -0.5px;
  padding-top: 10px;
  padding-bottom: 4px;
  z-index: 10;
  background-color: var(--vp-sidebar-bg-color);
  transition: background-color 0.5s;
  font-weight: 600;
}

.preference-switch.open {
  padding-bottom: 12px;
}

.toggle {
  color: var(--vp-c-text-2);
  transition: color 0.5s;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 2px;
  width: 100%;
  font-weight: 600;
}

.toggle:hover {
  color: var(--vp-c-text-1);
}

.no-outline {
  outline: 0;
}

.vp-link-icon {
  display: inline-block;
  margin-top: -2px;
  margin-left: 4px;
  width: 11px;
  height: 11px;
  fill: var(--vp-c-text-3);
  transition: fill .25s
}

.vp-link-icon {
  position: relative;
  top: 1px;
}

.vp-link-icon.open {
  transform: rotate(180deg);
}

.switch-container {
  display: flex;
  align-items: center;
  background-color: var(--vp-c-bg);
  padding: 8px;
  border-radius: 8px;
}

.switch-container:nth-child(2) {
  margin-top: 10px;
}

.vp-switch {
  margin-right: 5px;
  transform: scale(0.8);
}


.vp-switch {
  position: relative;
  border-radius: 11px;
  display: block;
  width: 40px;
  height: 22px;
  flex-shrink: 0;
  border: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg-soft);
  transition: border-color .25s, background-color .25s
}

.vp-switch:hover {
  border-color: var(--vp-c-gray)
}

.vp-switch-check {
  position: absolute;
  top: 1px;
  left: 1px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: var(--vp-c-white);
  box-shadow: var(--vp-shadow-1);
  transition: background-color .25s, transform .25s
}

.dark .vp-switch-check {
  background-color: var(--vp-c-black)
}

.vp-switch-icon {
  position: relative;
  display: block;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  overflow: hidden
}

.vp-switch-icon svg {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 12px;
  height: 12px;
  fill: var(--vp-c-text-2)
}

.dark .vp-switch-icon svg {
  fill: var(--vp-c-text-1);
  transition: opacity .25s
}

.vp-switch-appearance-sun {
  opacity: 1
}

.vp-switch-appearance-moon,
.dark .vp-switch-appearance-sun {
  opacity: 0
}

.dark .vp-switch-appearance-moon {
  opacity: 1
}

.dark .vp-switch-appearance .vp-switch-check {
  transform: translate(18px)
}

.switch-link {
  margin-left: 8px;
  font-size: 11px;
  min-width: 14px;
  height: 14px;
  line-height: 13px;
  text-align: center;
  color: var(--vp-c-brand);
  border: 1px solid var(--vp-c-brand);
  border-radius: 50%;
}

.switchChecked {
  transform: translate(18px)
}

.label {
  transition: color .5s;
  cursor: pointer;
  color: var(--vp-c-text-3);
  font-weight: 400;
  padding-right: 3px;
}

.label.highlited {
  color: var(--vp-c-text-1);
  font-weight: 600;
  padding-right: 0px;
}
</style>
