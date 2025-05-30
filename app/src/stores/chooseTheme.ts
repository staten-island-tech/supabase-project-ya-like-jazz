import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore(
  'themeStore',
  () => {
    const currentTheme = ref('default')
    return { currentTheme }
  },
  {
    persist: {
      storage: sessionStorage,
      pick: ['currentTheme'],
    },
  },
)
