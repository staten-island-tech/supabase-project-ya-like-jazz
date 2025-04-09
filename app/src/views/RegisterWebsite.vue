<template>
  <div>
    <h1>Hello</h1>
    <input type="text" v-model="username" />
    <input type="text" v-model="password" />
    <input type="submit" @click="signUpNewUser()" />
      <div>
    <h1> Returning User? </h1>
    <router-link to="/login"> Click here! </router-link>
    </div>
  </div>

</template>

<script setup lang="ts">
import { supabase } from '../lib/supabaseClient.ts'
import { ref } from 'vue'
const username = ref('')
const password = ref('')

async function signUpNewUser() {
  const { data, error } = await supabase.auth.signUp({
    email: username.value,
    password: password.value,
    /*     options: {
      emailRedirectTo: 'https://example.com/welcome',
    }, */
  })
  console.log(data, error)
}

</script>

<style lang="scss" scoped></style>
