<script setup lang="ts">
import { AppLanguages, type LangCode } from '@/data/languages'
import { useLangStore } from '@/stores/lang'
import { useSettingsStore } from '@/stores/settings'
import { BModal, BListGroup } from 'bootstrap-vue-next'
import { Volume2, Check } from 'lucide-vue-next'
import { computed, ref, watch, onMounted } from 'vue'

const settingsStore = useSettingsStore()
const langStore = useLangStore()

const availableVoices = ref<SpeechSynthesisVoice[]>([])
const selectedVoice = ref<string | undefined>(undefined)

// Filter voices for the current language
const voicesForCurrentLang = computed(() => {
  return availableVoices.value.filter((voice) => 
    voice.lang.startsWith(langStore.lang)
  )
})

const loadVoices = () => {
  const voices = window.speechSynthesis.getVoices()
  availableVoices.value = voices
  
  // Load saved voice preference for current language
  const savedVoice = settingsStore.getVoiceForLanguage(langStore.lang)
  if (savedVoice && voices.some(v => v.name === savedVoice)) {
    selectedVoice.value = savedVoice
  } else if (voicesForCurrentLang.value.length > 0) {
    // Default to first available voice for the language
    selectedVoice.value = voicesForCurrentLang.value[0].name
  } else {
    selectedVoice.value = undefined
  }
}

// Load voices on mount
onMounted(() => {
  loadVoices()
  
  // Some browsers need this event to populate voices
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = loadVoices
  }
})

// Reload voices when language changes
watch(() => langStore.lang, () => {
  const savedVoice = settingsStore.getVoiceForLanguage(langStore.lang)
  if (savedVoice && availableVoices.value.some(v => v.name === savedVoice)) {
    selectedVoice.value = savedVoice
  } else if (voicesForCurrentLang.value.length > 0) {
    selectedVoice.value = voicesForCurrentLang.value[0].name
  } else {
    selectedVoice.value = undefined
  }
})

const selectVoice = (voiceName: string) => {
  selectedVoice.value = voiceName
  settingsStore.setVoiceForLanguage(langStore.lang, voiceName)
}

const testVoice = (voiceName: string) => {
  const voice = availableVoices.value.find(v => v.name === voiceName)
  if (voice) {
    const utterance = new SpeechSynthesisUtterance('Hello')
    utterance.voice = voice
    utterance.lang = voice.lang
    utterance.rate = 0.7
    window.speechSynthesis.speak(utterance)
  }
}

const currentLangName = computed(() => AppLanguages[langStore.lang]?.name_en || langStore.lang)
</script>

<template>
  <BModal
    centered
    v-model="settingsStore.settingsModal"
    id="modal-settings"
    title="Settings"
    @cancel="settingsStore.settingsModal = false"
    @ok="settingsStore.settingsModal = false"
  >
    <div class="mb-3">
      <h6 class="fw-bold">Text-to-Speech Voice</h6>
      <p class="text-muted small">
        Select voice for {{ currentLangName }} ({{ langStore.lang }})
      </p>
    </div>

    <div v-if="voicesForCurrentLang.length === 0" class="alert alert-warning">
      <p class="mb-0">
        No voices available for {{ currentLangName }}. Please install appropriate language pack in your system settings.
      </p>
    </div>

    <BListGroup v-else>
      <BListGroupItem
        :class="{ 'bg-success-subtle': selectedVoice === voice.name }"
        v-for="voice of voicesForCurrentLang"
        :key="voice.name"
        @click="selectVoice(voice.name)"
        class="d-flex align-items-center"
      >
        <div class="flex-grow-1">
          <div class="fw-medium">{{ voice.name }}</div>
          <div class="text-muted small">{{ voice.lang }}</div>
        </div>
        <button
          class="btn btn-sm btn-outline-primary me-2"
          @click.stop="testVoice(voice.name)"
          title="Test this voice"
        >
          <Volume2 :size="16" />
        </button>
        <Check
          :stroke-width="3"
          v-if="selectedVoice === voice.name"
          class="text-success"
        />
      </BListGroupItem>
    </BListGroup>
  </BModal>
</template>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
