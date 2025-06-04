<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { BModal, BFormSelect } from 'bootstrap-vue-next'
import { useLangStore } from '@/stores/lang'
import { AppLanguages, type LangCode } from '@/data/languages'

const langStore = useLangStore()
const selectedVoiceNames = ref<{ [key: string]: string }>({})
const availableVoices = ref<SpeechSynthesisVoice[]>([])

const getVoicesForLang = (lang: LangCode) => {
  return availableVoices.value.filter(voice => voice.lang.startsWith(lang))
}

const getVoiceOptionsForLang = (lang: LangCode) => {
  const voices = getVoicesForLang(lang)
  return voices.map(voice => ({
    value: voice.name,
    text: `${voice.name} (${voice.lang})`
  }))
}

const updateSelectedVoice = (lang: LangCode, voiceName: string) => {
  const voice = availableVoices.value.find(v => v.name === voiceName)
  if (voice) {
    selectedVoiceNames.value[lang] = voiceName
    langStore.setVoice(lang, voice)
  }
}

const loadVoices = () => {
  availableVoices.value = window.speechSynthesis.getVoices()
  
  // Initialize selected voices with the first available voice for each language
  for (const lang of Object.keys(AppLanguages)) {
    const voices = getVoicesForLang(lang as LangCode)
    if (voices.length > 0 && !selectedVoiceNames.value[lang]) {
      selectedVoiceNames.value[lang] = voices[0].name
      langStore.setVoice(lang as LangCode, voices[0])
    }
  }
}

onMounted(() => {
  // Load voices immediately if available
  loadVoices()
  
  // Also listen for voices changed event (some browsers load voices asynchronously)
  window.speechSynthesis.onvoiceschanged = loadVoices
})
</script>

<template>
  <BModal
    centered
    v-model="langStore.voiceSelector"
    id="modal-voice-selector"
    title="Select Voice"
    @cancel="langStore.voiceSelector = false"
    @ok="langStore.voiceSelector = false"
  >
    <div v-for="lang in Object.keys(AppLanguages)" :key="lang" class="mb-3">
      <label :for="'voice-select-' + lang" class="form-label">{{ AppLanguages[lang].name }}</label>
      <BFormSelect
        :id="'voice-select-' + lang"
        v-model="selectedVoiceNames[lang]"
        :options="getVoiceOptionsForLang(lang as LangCode)"
        @change="updateSelectedVoice(lang as LangCode, selectedVoiceNames[lang])"
        class="form-select"
      />
      <small v-if="getVoicesForLang(lang as LangCode).length === 0" class="text-muted">
        No voices available for this language
      </small>
    </div>
  </BModal>
</template>
