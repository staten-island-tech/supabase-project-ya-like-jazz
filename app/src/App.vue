<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from './lib/supabaseClient'

const instruments = ref([])

async function getInstruments() {
  const { data } = await supabase.from('instruments').select()
  instruments.value = data
}

onMounted(() => {
  getInstruments()
})

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

function test() {
  console.log(username.value, password.value)
}

const username = ref('')
const password = ref('')
</script>

<template>
  <ul>
    <h1> Hello</h1>
<!--     <li v-for="instrument in instruments" :key="instrument.id">
      {{ instrument.name }} {{ instrument.id }}
    </li>
    <input type="text" v-model="username" />
    <input type="text" v-model="password" />
    <input type="submit" @click="signUpNewUser()" />
    <p>Your Username: {{ username }}</p>
    <p>Your password: {{ password }}</p> -->
  </ul>
</template>
