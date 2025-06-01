<template>
  <div>
    <h1 class="text-xl text-textcolor2">Theme</h1>
    <ul>
      <li class="cursor-pointer text-md text-textcolor2" @click="themePink()">Pink</li>
      <li class="cursor-pointer text-md text-textcolor2" @click="themeDefault()">default</li>
      <li class="cursor-pointer text-md text-textcolor2" @click="themeBlue()">Blue</li>
      <li class="cursor-pointer text-md text-textcolor2" @click="themeDesert()">Desert</li>
    </ul>
    <h1>Card Collection Style</h1>
    <ul>
      <li class="cursor-pointer text-md text-textcolor2" @click="activateBubbles()">
        Activate Bubbly Profile
      </li>
      <li class="cursor-pointer text-md text-textcolor2" @click="deactivateBubbles()">
        Activate Normal Profile
      </li>
    </ul>
    <RouterLink to="/changepfp"> Change Profile Picture </RouterLink>
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
