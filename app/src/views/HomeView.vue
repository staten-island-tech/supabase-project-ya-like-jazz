<template>
  <div>
    <h1>Counter: {{ counterStore.count }}</h1>
    <h2>Double: {{ counterStore.doubleCount }}</h2>
    <button @click="counterStore.increment">Increment</button>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'

// Access the counter store
const counterStore = useCounterStore()
</script>
