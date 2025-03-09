<script setup lang="ts">
import { ref } from 'vue'

interface Toast {
  id: number
  message: string
  type: 'success' | 'warning' | 'danger' | 'info'
  title: string
}

const toasts = ref<Toast[]>([])
let nextId = 0

const showToast = (message: string, type: Toast['type'], title: string, duration = 5000) => {
  const id = nextId++
  const toast = { id, message, type, title }
  toasts.value.push(toast)

  setTimeout(() => {
    removeToast(id)
  }, duration)
}

const removeToast = (id: number) => {
  const index = toasts.value.findIndex((t) => t.id === id)
  if (index > -1) {
    toasts.value.splice(index, 1)
  }
}

defineExpose({
  success: (message: string, title = 'Success') => showToast(message, 'success', title),
  warning: (message: string, title = 'Warning') => showToast(message, 'warning', title),
  error: (message: string, title = 'Error') => showToast(message, 'danger', title),
  info: (message: string, title = 'Info') => showToast(message, 'info', title),
})
</script>

<template>
  <div class="toast-container position-fixed top-0 end-0 p-3">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      class="toast show"
      :class="`text-bg-${toast.type}`"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="toast-header">
        <strong class="me-auto">{{ toast.title }}</strong>
        <button
          type="button"
          class="btn-close"
          @click="removeToast(toast.id)"
          aria-label="Close"
        ></button>
      </div>
      <div class="toast-body">
        {{ toast.message }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.toast-container {
  z-index: 1050;
}
</style>
