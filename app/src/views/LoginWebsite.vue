<template>
  <div
    class="flex container justify-center items-center justify-self-center border-solid border-2 border-black rounded-lg object-cover w-[20%] h-full mt-6"
  >
    <div class="object-contain p-2 m-2 justify-items-center">
      <h1 class="text-color-3 font-bold text-[40px]">Welcome!</h1>
      <div class="flex justify-end p-2">
        <label for="username">Username </label>
        <input type="text" class="border-solid border-4" v-model="username" />
      </div>
      <div class="flex justify-end">
        <label for="password">Password </label>
        <input type="text" class="border-solid border-4" v-model="password" />
      </div>

      <div class="">
        <Button
          label="Login"
          @click="signInWithEmail()"
          class="m-2 p-2 color-3 text-white"
        ></Button>
      </div>
      <div>
        <h2>New User?</h2>
        <router-link to="/register" class="text-color-3 font-bold"> Click here! </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router/index'
import { supabase } from '../lib/supabaseClient.ts'
import { ref } from 'vue'
import { useUserStore } from '../stores/loggedin.ts'
import { useDeckStore } from '../stores/yourDeck.ts'

const username = ref('') // Should convert this to TypeScript
const password = ref('')
const userStore = useUserStore()
const deckStore = useDeckStore()

async function signInWithEmail() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: username.value,
    password: password.value,
  })

  console.log(data, error)

  if (!error) {
    userStore.login({ uid: data.user.id, email: data.user.email! }, data.session.access_token)
    router.push('/')
  } else {
    alert('Login failed!')
  }
  // userStore.login() = Needs fixing
}
</script>

<style scoped>
.p-button.color-3 { background-color: var(--color-3); color: var(--text-color) }

</style>
