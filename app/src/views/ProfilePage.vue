<template>
  <div>
    <h1 class="text-textcolor2 font-bold text-8xl text-center">Your Profile</h1>
    <div>
      <h1 class="text-textcolor2 text-4xl text-center">Your Cards</h1>
      <div v-if="bubbles">
        <ProfileBubbly />
      </div>

      <div v-if="!bubbles">
        <ProfileNormal />
      </div>
    </div>
  </div>
</template>

<script setup>
import ProfileNormal from '@/components/ProfileNormal.vue'
import ProfileBubbly from '@/components/ProfileBubbly.vue'
import { useSettingsStore } from '@/stores/settings'
const settingsStore = useSettingsStore()
const bubbles = settingsStore.bubbles
</script>

<style lang="scss" scoped></style>
