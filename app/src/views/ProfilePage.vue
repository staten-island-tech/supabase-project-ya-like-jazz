<template>
  <div>
    <h1 class="text-textcolor2 font-bold text-8xl text-center"> Your Profile </h1>
    <div>
      <h1 class="text-textcolor2 text-4xl text-center">Your Cards</h1>
    <div v-if="bubbles">
        <BubblyProfile />
    </div>
    
    <div v-if="!bubbles">
        <NormalProfile />
    </div>

    </div>
  </div>
</template>

<script setup>
import NormalProfile from '@/components/NormalProfile.vue'
import BubblyProfile from '@/components/BubblyProfile.vue'
import { useSettingsStore } from '@/stores/settings';
const settingsStore = useSettingsStore()
const bubbles = settingsStore.bubbles
</script>

<style lang="scss" scoped></style>
