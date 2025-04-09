<script setup lang="ts">
import HomeView from './views/HomeView.vue'
import { ref, onMounted } from 'vue'
import { supabase } from './lib/supabaseClient.ts'
import type { Instruments } from '@/types.ts'

/* const instruments = ref([]) */

/* async function getInstruments() {
  const { instruments } = ref<Instruments[]>([await supabase.from('instruments').select()])
  console.log(instruments)
  return { instruments }
}

onMounted(() => {
  getInstruments()
})
 */
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



const username = ref('')
const password = ref('')
</script>

<template>
  <ul>
    <h1>Hello</h1>
<!--    <li v-for="instrument in instruments" :key="instrument.id">
      {{ instrument.name }} {{ instrument.id }}
    </li> -->
    <input type="text" v-model="username" />
    <input type="text" v-model="password" />
    <input type="submit" @click="signUpNewUser()" />
    <p>Your Username: {{ username }}</p>
    <p>Your password: {{ password }}</p>
    <HomeView />
  </ul>
</template>
