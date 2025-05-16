import { ref } from 'vue'
import { defineStore } from 'pinia'
/* const currentTheme = ref('default')

export function chooseTheme() {
  return { currentTheme }
} */

export const useThemeStore = defineStore(
  'store',
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
