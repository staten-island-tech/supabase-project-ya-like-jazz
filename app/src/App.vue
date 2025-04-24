<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { computed, ref, type Ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import router from '@/router/index'
import type { Credentials } from '@/types'

const verified = ref(false)

async function signOut() {
  console.log(verified.value)
  const { error } = await supabase.auth.signOut()
  console.log(error, verified.value)
}

function checkStatus() {
  console.log(verified.value)
}

async function addtoTable(id: string, email: string) {
  console.log(id, email)
  const { data, error } = await supabase
  .from('credentials')
  .insert([
    { id: `${id}`, email: `${email}` },
  ])
  .select('*')
}
const { data } = supabase.auth.onAuthStateChange((event, session) => {
  console.log(event, session)
  if (event === 'INITIAL_SESSION') {
    // handle initial session
  } else if (event === 'SIGNED_IN') {
    verified.value = true
    const identity = ref<Credentials[]>([
      { id: `${session?.user.id}`, email: `${session?.user.email}` },
    ])
    const id = `${session?.user.id}`
    const email = `${session?.user.email}`

    addtoTable(id, email)
  } else if (event === 'SIGNED_OUT') {
    localStorage.clear()
    sessionStorage.clear()
    router.push('/')
    verified.value = false
  } else if (event === 'PASSWORD_RECOVERY') {
    // handle password recovery event
  } else if (event === 'TOKEN_REFRESHED') {
    // handle token refreshed event
  } else if (event === 'USER_UPDATED') {
    // handle user updated event
  }
})
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/register"> Register </RouterLink>
      <button v-if="verified" @click="signOut()">Sign Out</button>
      <button @click="checkStatus()">Check verification </button>
      <h1>{{ verified }}</h1>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped></style>
