<template>
  <div>
    <h1>Normal Profile</h1>
    <h1 class="text-textcolor2 text-center text-4xl font-bold">Aces</h1>
    <div class="flex justify-center flex-col">
      <div v-for="ace in aces" :card="ace" :key="ace.code" class="">
        <h1 class="text-lg font-semibold text-textcolor2">{{ ace.value }} OF {{ ace.suit }}</h1>
        <div class="relative w-58 h-64 flex items-center justify-center">
          <img
            :src="ace.image"
            class="w-full h-full object-contain filter brightness-100"
            draggable="false"
          />
          <div class="absolute inset-0 bg-gradient-to-r from-1 to-gradient opacity-30"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import YourInventory from '@/components/YourInventory.vue'
import { ref, onMounted } from 'vue'
import type { CardCollection } from '@/types'

const aces = ref<CardCollection[]>([
  { code: 'AS', image: 'https://deckofcardsapi.com/static/img/AS.png', suit: 'SPADES', value: 1 },
])
</script>

<style scoped></style>
