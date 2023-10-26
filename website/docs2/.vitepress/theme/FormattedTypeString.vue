<template>
  <span v-for="token in type" v-if="!(type.length === 1 && type[0] === '{...}')">
    <button class="anchor-like-button types-view-reference" v-if="typeof token === 'object'"
      @click.prevent="handleDialogOpen(token.referenceTo, token.displayText)">
      {{ token.displayText }}
    </button>
    <span v-if="!(typeof token === 'object')">{{ token }}</span>
  </span>

  <dialog ref="dialog" @click="handleDialogClick">
    <TypesView :type="subTypeModal.referenceTo" :types="types" v-if="subTypeModal && types[subTypeModal.referenceTo]" />
    <button @click="handleDialogClose" aria-label="close dialog" class="close-dialog">✕</button>
  </dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const { type, types } = defineProps({ type: Array, types: Object }) as { type: (string | { displayText: string; referenceTo: string })[], types: any }
const subTypeModal = ref<{ referenceTo: string, displayText: string } | null>(null)
const dialog = ref<HTMLDialogElement | null>(null)
const handleDialogOpen = (referenceTo: string, displayText: string) => {
  if (dialog.value) {
    dialog.value.showModal()
    dialog.value.classList.remove('closing')
  }
  subTypeModal.value = { referenceTo, displayText }
}
const handleDialogClose = () => {
  if (dialog.value) {
    dialog.value.classList.add('closing')
    setTimeout(() => {
      if (!dialog.value) return
      dialog.value.close()
      dialog.value.classList.remove('closing')
    }, 100)
  }
  subTypeModal.value = null
}
const handleDialogClick = (event: MouseEvent) => {
  if (dialog.value !== event.target)
    return
  const dialogRect = dialog.value?.getBoundingClientRect()
  const clickOutside = dialogRect && !(
    event.clientX >= dialogRect.left &&
    event.clientX <= dialogRect.right &&
    event.clientY >= dialogRect.top &&
    event.clientY <= dialogRect.bottom
  )
  if (clickOutside) {
    handleDialogClose()
  }
}
</script>