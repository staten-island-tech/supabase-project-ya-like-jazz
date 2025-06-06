<template>
  <div class="">
    <h1 class="text-8xl text-bold text-textcolor2 text-center">Theme</h1>
    <h1 class="text-sm text-textcolor2 p-2 text-center mb-4"> Change the theme of the website </h1>
    <ul>
    <li class="cursor-pointer text-xl w-40 p-2 transition-all duration-200 hover:text-2xl hover:italic" 
      :class="{
    'bg-2 text-textcolor rounded-lg': settingsStore.currentTheme === 'default',
    'text-textcolor2': settingsStore.currentTheme !== 'default'
  }"  @click="themeDefault()">Snowy Purple </li>
      <li class="cursor-pointer text-xl w-40 p-2 transition-all duration-200 hover:text-2xl hover:italic"
        :class="{
    'bg-2 text-textcolor rounded-lg': settingsStore.currentTheme === 'pink',
    'text-textcolor2': settingsStore.currentTheme !== 'pink'
  }"  @click="themePink()">Cotton Pink </li>
      <li class="cursor-pointer text-xl w-40 p-2 transition-all duration-200 hover:text-2xl hover:italic" 
        :class="{
    'bg-2 text-textcolor rounded-lg': settingsStore.currentTheme === 'blue',
    'text-textcolor2': settingsStore.currentTheme !== 'blue'
  }"
      @click="themeBlue()"> Ocean Blue </li>
      <li class="cursor-pointer text-xl w-40 p-2 transition-all duration-200 hover:text-2xl hover:italic" 
        :class="{
    'bg-2 text-textcolor rounded-lg': settingsStore.currentTheme === 'desert',
    'text-textcolor2': settingsStore.currentTheme !== 'desert'
  }"
      @click="themeDesert()">Ember Desert</li>
    </ul>
   

  </div>
</template>

<script setup>
import { useSettingsStore } from '@/stores/settings'

const settingsStore = useSettingsStore()

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
