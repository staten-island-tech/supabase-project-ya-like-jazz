<template>
  <div>
    <h1 class="text-xl text-textcolor2">Theme</h1>
    <ul>
      <li class="cursor-pointer text-md text-textcolor2" @click="themePink()">Pink</li>
      <li class="cursor-pointer text-md text-textcolor2" @click="themeDefault()">default</li>
      <li class="cursor-pointer text-md text-textcolor2" @click="themeBlue()">Blue</li>
      <li class="cursor-pointer text-md text-textcolor2" @click="themeDesert()">Desert</li>
    </ul>
  </div>
</template>

<script setup>
import { useThemeStore } from '@/stores/chooseTheme'

const themeStore = useThemeStore()

function themePink() {
  themeStore.currentTheme = 'pink'
}
function themeDefault() {
  themeStore.currentTheme = 'default'
}
function themeBlue() {
  themeStore.currentTheme = 'blue'
}
function themeDesert() {
  themeStore.currentTheme = 'desert'
}
</script>

<style lang="scss" scoped></style>
