import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useSettingsStore } from '@/stores/settings'
import { useLangStore } from '@/stores/lang'

describe('SettingsModal Integration', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('can save voice preference for a language', () => {
    const settingsStore = useSettingsStore()
    const langStore = useLangStore()
    
    langStore.setLang('fr')
    settingsStore.setVoiceForLanguage('fr', 'French Voice 1')
    
    expect(settingsStore.getVoiceForLanguage('fr')).toBe('French Voice 1')
  })

  it('maintains separate voice preferences for different languages', () => {
    const settingsStore = useSettingsStore()
    
    settingsStore.setVoiceForLanguage('fr', 'French Voice')
    settingsStore.setVoiceForLanguage('es', 'Spanish Voice')
    settingsStore.setVoiceForLanguage('de', 'German Voice')
    
    expect(settingsStore.getVoiceForLanguage('fr')).toBe('French Voice')
    expect(settingsStore.getVoiceForLanguage('es')).toBe('Spanish Voice')
    expect(settingsStore.getVoiceForLanguage('de')).toBe('German Voice')
  })

  it('returns undefined for languages without saved preferences', () => {
    const settingsStore = useSettingsStore()
    
    expect(settingsStore.getVoiceForLanguage('fr')).toBeUndefined()
  })

  it('can update existing voice preference', () => {
    const settingsStore = useSettingsStore()
    
    settingsStore.setVoiceForLanguage('fr', 'French Voice 1')
    expect(settingsStore.getVoiceForLanguage('fr')).toBe('French Voice 1')
    
    settingsStore.setVoiceForLanguage('fr', 'French Voice 2')
    expect(settingsStore.getVoiceForLanguage('fr')).toBe('French Voice 2')
  })
})
