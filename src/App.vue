<script setup lang="ts">
import { RouterView } from 'vue-router'
import ReloadPrompt from '@/components/ReloadPrompt.vue'
import NavBar from '@/components/NavBar.vue'
import LanguageSelector from '@/components/modals/LanguageSelector.vue'
import MainFooter from '@/components/MainFooter.vue'
import VoiceSelectorModal from '@/components/VoiceSelectorModal.vue'
import { provide, ref } from 'vue'
import ToastNotification from '@/components/ToastNotification.vue'

const toastRef = ref<InstanceType<typeof ToastNotification> | null>(null)

provide('toast', {
  warning: (message: string, title: string) => toastRef.value?.warning(message, title),
  success: (message: string, title: string) => toastRef.value?.success(message, title),
  error: (message: string, title: string) => toastRef.value?.error(message, title),
  info: (message: string, title: string) => toastRef.value?.info(message, title),
})
</script>

<template>
  <ToastNotification ref="toastRef" />
  <div class="d-flex flex-column min-vh-100">
    <NavBar />

    <main class="flex-shrink-0 mb-4">
      <RouterView />
    </main>
    <ReloadPrompt />
    <LanguageSelector />
    <VoiceSelectorModal />
    <MainFooter />
  </div>
</template>

<style scoped></style>
