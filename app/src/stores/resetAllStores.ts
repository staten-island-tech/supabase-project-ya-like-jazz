import { useUserStore } from '@/stores/loggedin'
import { useSettingsStore } from '@/stores/settings'
import { useAnimationStore } from '@/stores/animation'
import { useDeckStore } from '@/stores/yourDeck'

export function resetAllStores() {
  const userStore = useUserStore()
  const settingsStore = useSettingsStore()
  const animationStore = useAnimationStore()
  const deckStore = useDeckStore()

  userStore.$reset()
  settingsStore.$reset()
  animationStore.$reset()
  deckStore.$reset()
}
