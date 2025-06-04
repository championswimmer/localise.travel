<script setup lang="ts">
import type { Translation } from '@/data/words'
import { useLangStore } from '@/stores/lang'
import { Volume2, AudioLines } from 'lucide-vue-next'
import { inject } from 'vue'
import { AppLanguages } from '@/data/languages'
import type { ToastMethods } from '@/components/ToastNotification.vue'

const props = defineProps<{
  word: string
  translation: Translation
}>()

const langStore = useLangStore()
const toast = inject<ToastMethods>('toast')

const pronounce = () => {
  setTimeout(() => {
    const utterance = new SpeechSynthesisUtterance(props.translation.translation)
    utterance.lang = langStore.lang

    const voices = window.speechSynthesis.getVoices()
    const languageSupported = voices.some((voice) => voice.lang.startsWith(langStore.lang))

    if (!languageSupported && toast) {
      const languageName = AppLanguages[langStore.lang]?.name_en || langStore.lang
      toast.warning(
        `Text-to-speech is not available for ${languageName}. Please install appropriate language pack in your system settings.`,
        'Language Pack Required',
      )
      return
    }

    utterance.rate = 0.7
    const selectedVoice = langStore.selectedVoices[langStore.lang]
    if (selectedVoice) {
      utterance.voice = selectedVoice
    }
    window.speechSynthesis.speak(utterance)
  }, 100)
}
</script>

<template>
  <BCard class="my-3">
    <BCardBody class="p-2">
      <div class="row align-items-center">
        <div class="col me-auto">
          <h2 class="card-title fs-5 fw-medium text-dark-emphasis">{{ props.word }}</h2>
          <p class="card-text fs-4 fw-light text-primary mb-0">
            {{ props.translation.translation }}
          </p>
          <p class="card-text fs-6 fw-light text-primary-emphasis">
            <AudioLines :size="18" :stroke-width="1" /> {{ props.translation.phonetic }}
          </p>
        </div>
        <div class="col-auto text-end pointer" @click="pronounce()">
          <Volume2 class="mt-2 d-block mx-auto" :size="32" />
        </div>
      </div>
    </BCardBody>
  </BCard>
</template>
