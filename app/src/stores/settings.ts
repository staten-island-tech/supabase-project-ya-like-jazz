import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSettingsStore = defineStore(
  'settingsStore',
  () => {
    const bubbles = ref(false)
    return { bubbles }
  },
  {
    persist: {
      storage: sessionStorage,
      pick: ['bubbles'],
    },
  },
)
