<template>
  <div>
    <div></div>
    <div class="flex flex-col items-center gap-2 w-full p-2 border-2">
      <h1 class="text-lg font-semibold">{{ card.value }} OF {{ card.suit }}</h1>
      <img class="w-58 h-64" :src="card.image" />
    </div>
  </div>
</template>


<script setup>
import { Card } from 'primevue'

const props = defineProps({
  card: Object,
})
const test = ["5S"]
</script>

<style lang="scss" scoped></style>
