import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore(
  'main',
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
