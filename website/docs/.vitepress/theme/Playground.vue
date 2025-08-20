<template>
  <div id="playground-container" ref="root" />
</template>

<script setup lang="tsx">
import * as ReactDOM from 'react-dom/client'
import { ref, onMounted, onBeforeUnmount, defineProps, onUnmounted } from 'vue'
import Playground from '../../../../playground/components/Playground';
import { logEvent } from './amplitude/amplitude';

const props = defineProps<{
  for: React.ComponentProps<typeof Playground>['componentName'];
}>()

const events = [
  'playground_view-source-btn-click',
  'playground_copy-code-btn-click',
  'playground_show-code-btn-click',
  'playground_hide-code-btn-click'
]

const root = ref<HTMLElement | null>(null)
let reactRoot: ReactDOM.Root | null = null
const eventsAbortController = new AbortController();

const mountReact = () => {
  if (!props.for || !root.value) return

  events.forEach(event => {
    root.value!.addEventListener(event, () => {
      logEvent(event);
    }, { signal: eventsAbortController.signal })
  })

  reactRoot = ReactDOM.createRoot(root.value)
  reactRoot.render(<Playground componentName={props.for} />)
}

onMounted(mountReact)

onUnmounted(() => {
  eventsAbortController.abort();
})

onBeforeUnmount(() => {
  if (reactRoot) reactRoot.unmount()
})
</script>
