<template>
  <div>
    <h1>Hello welcome to the profile</h1>
    <div>
      <h1> Your Cards </h1>
<YourInventory v-for="card in cards" :card="card" :key="card"> Hello </YourInventory>
    </div>
  </div>
</template>

<script setup>
import YourInventory from '@/components/YourInventory.vue'
import { ref } from 'vue'
const cards = ref('')
async function getCard2() {
  try {
    const res = await fetch(
      `https://deckofcardsapi.com/api/deck/rrnwp5zoohxo/pile/player/list/`,
    )
    if (res.status > 200) {
      throw new Error(res)
    } else {
      const data = await res.json()
      console.log(data)
      cards.value = data.piles.player.cards
      cards.forEach (card => {
        console.log(card.code)
      })
      return { cards }
/*     data.forEach(card => {
        console.log(data)
    }) */
    }
  } catch (error) {
    alert(error)
  }
}
getCard2()
</script>

<style lang="scss" scoped></style>
