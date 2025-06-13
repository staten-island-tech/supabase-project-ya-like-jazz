<template>
  <div>
    <h1 class="text-textcolor2 text-center text-8xl">Click this button to log out</h1>
    <div class="flex justify-center p-16">
      <button
        class="text-textcolor2 border-2 p-4 rounded-lg text-4xl transition-all duration-200 hover:text-6xl hover:italic"
        @click="signOut()"
      >
        Log out
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'vue-router'
import { useSettingsStore } from '@/stores/settings'
import { useUserStore } from '@/stores/loggedin'
import { resetAllStores } from '@/stores/resetAllStores'

const userStore = useUserStore()
const settingsStore = useSettingsStore()
const router = useRouter()

async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error(error.message)
  } else {
    router.push('/')
  settingsStore.pfp = ""
  settingsStore.currentTheme = 'default'
  userStore.loggedIn = false
  userStore.notLogged = true
  resetAllStores()
  localStorage.clear()
  sessionStorage.clear()
  userStore.logout()
  }
}
</script>

<style scoped></style>
