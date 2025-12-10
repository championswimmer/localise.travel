import type { LangCode } from '@/data/languages'
import { defineStore } from 'pinia'
import { getCurrentInstance, ref } from 'vue'

export const useSettingsStore = defineStore(
  'settings',
  () => {
    const getPostHog = () => getCurrentInstance()?.appContext.config.globalProperties.$posthog

    const settingsModal = ref<boolean>(false)
    const toggleSettings = () => {
      settingsModal.value = !settingsModal.value
      getPostHog()?.capture('toggle_settings', { open: settingsModal.value })
    }

    // Store voice preferences per language
    // Format: { 'fr': 'voiceName', 'es': 'voiceName', ... }
    const voicePreferences = ref<Record<LangCode, string>>({} as Record<LangCode, string>)
    
    const setVoiceForLanguage = (lang: LangCode, voiceName: string) => {
      voicePreferences.value[lang] = voiceName
      getPostHog()?.capture('set_voice_preference', { lang, voiceName })
    }

    const getVoiceForLanguage = (lang: LangCode): string | undefined => {
      return voicePreferences.value[lang]
    }

    return { 
      settingsModal, 
      toggleSettings, 
      voicePreferences,
      setVoiceForLanguage,
      getVoiceForLanguage
    }
  },
  {
    persist: {
      pick: ['voicePreferences'],
    },
  },
)
