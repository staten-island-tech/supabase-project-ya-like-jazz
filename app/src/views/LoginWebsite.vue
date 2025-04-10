<template>
  <div>
    <h1>Hello</h1>
    <input type="text" v-model="username" />
    <input type="text" v-model="password" />
    <input type="submit" @click="signInWithEmail()" />
    <div>
      <h2>New User?</h2>
      <router-link to="/Register"> Click here! </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
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
</script>

<style lang="scss" scoped></style>
