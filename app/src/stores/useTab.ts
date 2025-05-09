import { ref } from 'vue'

const tab = ref(1)

export function useTab() {
  return { tab }
}