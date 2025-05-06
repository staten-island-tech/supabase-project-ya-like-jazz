<template>
  <div class="container flex justify-center flex-flow">
    <h1>Hello</h1>
    <input type="text" class="border-solid border-2" v-model="username" />
    <input type="text" class="border-solid border-2" v-model="password" />
    <input type="submit" @click="signInWithEmail()" />
    <div>
      <h2>New User?</h2>
      <router-link to="/register"> Click here! </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router/index.ts'
import { supabase } from '../lib/supabaseClient.ts'
import { ref } from 'vue'
const username = ref('')
const password = ref('')
async function signInWithEmail() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: username.value,
    password: password.value,
  })
  console.log(data, error)
}

supabase.auth.onAuthStateChange((event) => {
  if (event === 'SIGNED_IN') router.push('/profile')
})
</script>

<style lang="scss" scoped></style>
