import { ref } from 'vue'

const currentTheme = ref('default')

export function chooseTheme() {
    return { currentTheme }
  }