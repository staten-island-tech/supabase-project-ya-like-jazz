import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDeckStore = defineStore(
  'deckStore',
  () => {
    const yourDeckID = ref('')
    return { yourDeckID }
  },
  {
    persist: {
      storage: sessionStorage,
      pick: ['yourDeckID'],
    },
  },
)