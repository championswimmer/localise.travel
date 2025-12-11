import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useSettingsStore } from '../settings'

describe('Settings Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('initializes with default values', () => {
    const store = useSettingsStore()
    expect(store.settingsModal).toBe(false)
    expect(store.voicePreferences).toEqual({})
  })

  it('toggles settings modal', () => {
    const store = useSettingsStore()
    expect(store.settingsModal).toBe(false)
    
    store.toggleSettings()
    expect(store.settingsModal).toBe(true)
    
    store.toggleSettings()
    expect(store.settingsModal).toBe(false)
  })

  it('saves voice preferences per language', () => {
    const store = useSettingsStore()
    
    store.setVoiceForLanguage('fr', 'French Voice')
    store.setVoiceForLanguage('es', 'Spanish Voice')
    
    expect(store.getVoiceForLanguage('fr')).toBe('French Voice')
    expect(store.getVoiceForLanguage('es')).toBe('Spanish Voice')
    expect(store.getVoiceForLanguage('de')).toBeUndefined()
  })

  it('persists voice preferences', () => {
    const store = useSettingsStore()
    
    store.setVoiceForLanguage('fr', 'French Voice 1')
    store.setVoiceForLanguage('es', 'Spanish Voice 1')
    
    expect(store.voicePreferences).toEqual({
      fr: 'French Voice 1',
      es: 'Spanish Voice 1',
    })
  })
})
