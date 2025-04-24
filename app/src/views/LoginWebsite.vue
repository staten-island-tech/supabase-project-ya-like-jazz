<template>
  <div
    class="container flex justify-center items-center justify-self-center border-solid border-2 border-black rounded-lg object-cover w-auto"
  >
    <div class="object-contain m-2 p-2 justify-items-center">
      <h1 class="text-green-500 font-bold text-[20px]">Log In</h1>
      <div>
        <label for="username">Username:</label>
        <input type="text" class="border-solid border-2" v-model="username" />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="text" class="border-solid border-2" v-model="password" />
      </div>
      <Button label="Login" @click="signInWithEmail()" class="m-2 p-2" severity="success"></Button>
      <div class="justify-items-center">
        <h2>Don't have an account?</h2>
        <router-link to="/register" class="text-green-500 hover:text-green-800 font-bold"
          >Register</router-link
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { supabase } from '../lib/supabaseClient.ts'
import { ref } from 'vue'
import Button from 'primevue/button'
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
