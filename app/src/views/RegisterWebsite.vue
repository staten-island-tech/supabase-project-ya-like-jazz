<template>
  <div>
    <h1 class="text-red-500">Hello</h1>
    <div class="flex justify-start flex-wrap">
      <label for="username">Username:</label>
      <input type="text" class="border-solid border-black" id="username" v-model="username" />
    </div>

    <div class="flex justify-start flex-wrap">
      <label for="Password">Password:</label>
      <input
        type="text"
        class="border-solid border-2 rounded-x border-black"
        id="password"
        v-model="password"
      />
    </div>

    <input type="submit" @click="signUpNewUser()" />
    <div>
      <h2>Returning User?</h2>
      <router-link to="/login"> Click here! </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { supabase } from '../lib/supabaseClient.ts'
import { ref } from 'vue'

import Button from 'primevue/button'
import Card from 'primevue/card'

const username = ref('')
const password = ref('')

async function signUpNewUser() {
  const { data, error } = await supabase.auth.signUp({
    email: username.value,
    password: password.value,
    options: {
      emailRedirectTo: '/emailverification',
    },
  })
  console.log(data, error)
}
</script>

<style lang="scss" scoped></style>
