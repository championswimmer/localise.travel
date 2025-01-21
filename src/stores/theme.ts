import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref('system')

  const toggleTheme = () => {
    const themeModes = ['light', 'dark', 'system']
    const currentIndex = themeModes.indexOf(theme.value)
    const nextIndex = (currentIndex + 1) % themeModes.length
    theme.value = themeModes[nextIndex]
    document.body.setAttribute('data-theme', theme.value)
  }

  return { theme, toggleTheme }
}, {
  persist: true
})
