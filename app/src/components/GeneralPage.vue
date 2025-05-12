<template>
    <div>
          <h1 class="text-xl">Theme </h1>
         <ul>
          <li class="cursor-pointer text-md" @click="themePink()"> Pink </li>
          <li class="cursor-pointer text-md" @click="themeDefault()"> default </li>
          <li class="cursor-pointer text-md" @click="themeBlue()"> Blue </li>
         </ul>
    </div>
</template>

<script setup>
import { chooseTheme } from '@/stores/chooseTheme'

function themePink(){
  currentTheme.value = "pink"
}
function themeDefault(){
  currentTheme.value = "default"
}
function themeBlue(){
  currentTheme.value = "blue"
}
const { currentTheme } = chooseTheme()
</script>

<style lang="scss" scoped>

</style>