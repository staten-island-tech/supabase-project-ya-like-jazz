<template>
  <div>
    <h1 class="text-textcolor2">Counter: {{ counterStore.count }}</h1>
    <h2 class="text-textcolor2">Double: {{ counterStore.doubleCount }}</h2>
    <button class="text-textcolor2" @click="counterStore.increment">Increment</button>
   <div>
     <RouterLink to="/play"> Game </RouterLink>
   </div>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'

// Access the counter store
const counterStore = useCounterStore()
</script>
