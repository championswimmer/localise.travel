import type { LangCode } from '@/data/languages'
import { defineStore } from 'pinia'
import { getCurrentInstance, ref } from 'vue'
import posthog from 'posthog-js'

export const useLangStore = defineStore(
  'lang-select',
  () => {
    const getPostHog = () => getCurrentInstance()?.appContext.config.globalProperties.$posthog

    const selector = ref<boolean>(false)
    const toggleSelector = () => {
      selector.value = !selector.value
      getPostHog()?.capture('toggle_language_selector', { open: selector.value })
    }

    const voiceSelector = ref<boolean>(false)
    const toggleVoiceSelector = () => {
      voiceSelector.value = !voiceSelector.value
      Promise.resolve().then(() => {
        posthog.capture('toggle_voice_selector', { open: voiceSelector.value })
      })
    }

    const lang = ref<LangCode>('fr')
    const setLang = (newLang: LangCode) => {
      lang.value = newLang
      getPostHog()?.capture('change_language', { lang: newLang })
    }

    const selectedVoices = ref<{ [key: string]: SpeechSynthesisVoice | null }>({})

    const setVoice = (lang: LangCode, voice: SpeechSynthesisVoice) => {
      selectedVoices.value[lang] = voice
    }

    return { lang, setLang, selector, toggleSelector, voiceSelector, toggleVoiceSelector, selectedVoices, setVoice }
  },
  {
    persist: {
      pick: ['lang', 'selectedVoices'],
    },
  },
)
