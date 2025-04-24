<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { computed, ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import router from '@/router/index'
const verified = ref(true)

supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN') console.log('SIGNED_IN', session)
  verified.value = true
})
async function signOut() {
  console.log(verified.value)
  const { error } = await supabase.auth.signOut()
  verified.value = false
  console.log(error, verified.value)
  router.push('/')
}

function checkStatus() {
  console.log(verified.value)
}
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/register"> Register </RouterLink>
      <button v-if="verified" @click="signOut()">Sign Out</button>
      <button @click="checkStatus()">CLick here</button>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped></style>
