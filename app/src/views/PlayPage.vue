<template>
  <div>
    <h1>Hello</h1>
    <button @click="getCard(firstLink)">Hi</button>
    <button @click="getCard(secondLink)">Hi</button>
    <button @click="getCard(thirdLink)">Hi</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const firstLink = ref('https://deckofcardsapi.com/api/deck/rrnwp5zoohxo/draw/?count=52')
const secondLink = ref('https://deckofcardsapi.com/api/deck/rrnwp5zoohxo/pile/player/add/?cards=4S,3S')
const thirdLink = ref('https://deckofcardsapi.com/api/deck/rrnwp5zoohxo/pile/player/list/')

async function getCard(link) {
  try {
    const res = await fetch(link)
    if (res.status > 200) {
      throw new Error(res)
    } else {
      const data = await res.json()
      console.log(data)
    }
  } catch (error) {
    alert(error)
  }
}
// End game URL: https://deckofcardsapi.com/api/deck/rrnwp5zoohxo/pile/player/return/

</script>

<style lang="scss" scoped></style>
