<template>
  <div>
    <h1 class="text-8xl text-textcolor2 text-center">Card Collection Style</h1>
    <h1 class="text-sm text-textcolor2 text-center p-2 mb-4">
      Changes the way your profile is displayed
    </h1>
    <ul>
      <li
        class="cursor-pointer text-xl w-48 p-2 transition-all duration-200 hover:text-2xl hover:italic"
        :class="{
          'bg-2 text-textcolor rounded-lg': settingsStore.bubbles === true,
          'text-textcolor2': settingsStore.bubbles === false,
        }"
        @click="activateBubbles()"
      >
        Bubbly Profile
      </li>
      <li
        class="cursor-pointer text-xl w-48 p-2 transition-all duration-200 hover:text-2xl hover:italic"
        :class="{
          'bg-2 text-textcolor rounded-lg': settingsStore.bubbles === false,
          'text-textcolor2': settingsStore.bubbles === true,
        }"
        @click="deactivateBubbles()"
      >
        Normal Profile
      </li>
    </ul>
    <div class="relative flex items-center justify-center w-full h-full">
      <div
        class="w-96 h-96 flex justify-center text-center border-2 rounded-lg -translate-y-2"
        v-if="settingsStore.bubbles"
      >
        <exampleBubbly />
      </div>
      <div
        class="w-96 h-96 flex justify-center text-center border-2 rounded-lg -translate-y-2"
        v-if="!settingsStore.bubbles"
      >
        <exampleNormal />
      </div>
    </div>
  </div>
</template>

<script setup>
import exampleBubbly from './exampleProfiles/exampleBubbly.vue'
import exampleNormal from './exampleProfiles/exampleNormal.vue'
import { useSettingsStore } from '@/stores/settings'

const settingsStore = useSettingsStore()

function activateBubbles() {
  settingsStore.bubbles = true
}
function deactivateBubbles() {
  settingsStore.bubbles = false
}
</script>

<style lang="scss" scoped></style>
