<template>
  <div>
    <h1 class="text-xl text-textcolor2">Theme</h1>
    <ul>
      <li class="cursor-pointer text-md text-textcolor2 w-fit" @click="themePink()">Pink</li>
      <li class="cursor-pointer text-md text-textcolor2 w-fit" @click="themeDefault()">default</li>
      <li class="cursor-pointer text-md text-textcolor2 w-fit" @click="themeBlue()">Blue</li>
      <li class="cursor-pointer text-md text-textcolor2 w-fit" @click="themeDesert()">Desert</li>
    </ul>
    <h1 class="text-xl text-textcolor2">Card Collection Style</h1>
    <ul>
      <li class="cursor-pointer text-md text-textcolor2 w-fit" @click="activateBubbles()">
        Activate Bubbly Profile
      </li>
      <li class="cursor-pointer text-md text-textcolor2 w-fit" @click="deactivateBubbles()">
        Activate Normal Profile
      </li>
    </ul>
    <h1 class="text-xl text-textcolor2"> Change Profile Picture </h1>
    <RouterLink to="/changepfp" class="text-md text-textcolor2 w-24"> Click here </RouterLink>
  </div>
</template>

<script setup>
import { useSettingsStore } from '@/stores/settings'

const settingsStore = useSettingsStore()

function activateBubbles() {
  settingsStore.bubbles = true
}
function deactivateBubbles() {
  settingsStore.bubbles = false
}
function themePink() {
  settingsStore.currentTheme = 'pink'
}
function themeDefault() {
  settingsStore.currentTheme = 'default'
}
function themeBlue() {
  settingsStore.currentTheme = 'blue'
}
function themeDesert() {
  settingsStore.currentTheme = 'desert'
}
</script>

<style lang="scss" scoped></style>
