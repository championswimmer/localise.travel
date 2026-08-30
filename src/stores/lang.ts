import type { LangCode } from '@/data/languages'
import { defineStore } from 'pinia'
import { getCurrentInstance, ref } from 'vue'

export const useLangStore = defineStore(
  'lang-select',
  () => {
    const getPostHog = () => getCurrentInstance()?.appContext.config.globalProperties.$posthog

    const selector = ref<boolean>(false)
    const toggleSelector = () => {
      selector.value = !selector.value
      getPostHog()?.capture('toggle_language_selector', { open: selector.value })
    }

    const lang = ref<LangCode>('fr')
    const setLang = (newLang: LangCode) => {
      lang.value = newLang
      getPostHog()?.capture('change_language', { lang: newLang })
    }

    return { lang, setLang, selector, toggleSelector }
  },
  {
    persist: {
      pick: ['lang'],
    },
  },
)
