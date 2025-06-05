import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAnimationStore = defineStore(
  'animationStore',
  () => {
    const animation = ref(false)
    return { animation }
  },
  {
    persist: {
      storage: sessionStorage,
      pick: ['yourDeckID'],
    },
  },
)