import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { supabase } from '@/lib/supabaseClient'

export const useSettingsStore = defineStore(
  'settingsStore',
  () => {
    const bubbles = ref(false)
    const currentTheme = ref('default')
    const pfp = ref('https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1024px-Default_pfp.svg.png')

    watch([currentTheme, bubbles, pfp], async () => {
      const uid = await getUserUid()
      if (!uid) return

      const { error } = await supabase.from('user_settings').upsert({
        uid: uid,
        theme: currentTheme.value,
        bubbles: bubbles.value,
        pfp: pfp.value,
      })

      if (error) console.error('Upsert error:', error)
    })

    return { currentTheme, bubbles, pfp }
  },
  {
    persist: {
      storage: sessionStorage,
      pick: ['currentTheme', 'bubbles', 'pfp'],
    },
  },
)

async function getUserUid() {
  const { data, error } = await supabase.auth.getSession()
  return data?.session?.user?.id || null
}
