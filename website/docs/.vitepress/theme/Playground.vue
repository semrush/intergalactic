<template>
  <div ref="root" />
</template>

<script setup lang="tsx">
import * as ReactDOM from 'react-dom/client'
import { ref, onMounted, onBeforeUnmount, defineProps } from 'vue'
import Playground from '../../../../playground/components/Playground';

const props = defineProps<{
  for: React.ComponentProps<typeof Playground>['componentName'];
}>()

const root = ref<HTMLElement | null>(null)
let reactRoot: ReactDOM.Root | null = null

const mountReact = () => {
  if (!props.for || !root.value) return

  reactRoot = ReactDOM.createRoot(root.value)
  reactRoot.render(<Playground componentName={props.for}/>)
}

onMounted(mountReact)

onBeforeUnmount(() => {
  if (reactRoot) reactRoot.unmount()
})
</script>
