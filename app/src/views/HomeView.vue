<template>
  <div>
    <div v-if="!userStore.loggedIn">
          <h1 class="text-textcolor2" @click="console.log(userStore.loggedIn)"> Hello </h1>
    </div>
    <div v-if="userStore.loggedIn">     
       <RouterLink to="/play" class="text-textcolor2"> Launch Game </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/loggedin'

const userStore = useUserStore()
</script>
