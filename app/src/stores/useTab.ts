import { ref } from 'vue'

const tab = ref(2)

export function useTab() {
  return { tab }
}
