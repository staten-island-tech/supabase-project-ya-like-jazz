<template>
  <div>
    <h1 class="text-xl">Theme</h1>
    <ul>
      <li class="cursor-pointer text-md" @click="themePink()">Pink</li>
      <li class="cursor-pointer text-md" @click="themeDefault()">default</li>
      <li class="cursor-pointer text-md" @click="themeBlue()">Blue</li>
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
</script>

<style lang="scss" scoped></style>
