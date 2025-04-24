<template>
  <div
    class="flex container justify-center items-center justify-self-center border-solid border-2 border-black rounded-lg object-cover w-auto h-full"
  >
    <div class="object-contain p-2 m-2 justify-items-center">
      <h1 class="text-green-500 font-bold text-[20px]">Welcome!</h1>
      <div class="justify-start">
        <label for="username">Username </label>
        <input type="text" class="border-solid border-4" v-model="username" />
      </div>
      <div class="justify-start">
        <label for="password">Password </label>
        <input type="text" class="border-solid border-4" v-model="password" />
      </div>

      <div>
        <Button
          label="Register"
          @click="signUpNewUser()"
          class="m-2 p-2"
          severity="success"
        ></Button>
      </div>
      <div class="justify-center">
        <router-link to="/login" class="text-green-500 hover:text-green-800 font-semibold"
          >Go to Login page</router-link
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router/index.ts'
import { supabase } from '../lib/supabaseClient.ts'
import { ref } from 'vue'

import Button from 'primevue/button'

const username = ref('')
const password = ref('')

async function signUpNewUser() {
  const { data, error } = await supabase.auth.signUp({
    email: username.value,
    password: password.value,
    options: {
      emailRedirectTo: 'http://localhost:5173/login',
    },
  })
  console.log(data, error)
}
</script>

<style lang="scss" scoped></style>
