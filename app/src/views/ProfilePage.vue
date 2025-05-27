<template>
  <div>
    <h1>Hello welcome to the profile</h1>
    <div>
      <h1>Your Cards</h1>
      <div class="grid grid-cols-4 gap-4">
        <YourInventory v-for="card in cards" :card="card" :key="card" />
      </div>
    </div>
  </div>
</template>

<script setup>
import YourInventory from '@/components/YourInventory.vue'
import { ref } from 'vue'
const cards = ref('')
async function getCard2(deck) {
  try {
    const res = await fetch(`https://deckofcardsapi.com/api/deck/${deck}/pile/player/list/`)
    if (res.status > 200) {
      throw new Error(res)
    } else {
      const data = await res.json()
      console.log(data)
      cards.value = data.piles.player.cards
/*       cards.forEach((card) => {
        console.log(card.code)
      }) */
      return { cards }
      /*     data.forEach(card => {
        console.log(data)
    }) */
    }
  } catch (error) {
    alert(error)
  }
}
getCard2(deck)
const deck = "gptcy4vs0tut"

// Player Deck: rrnwp5zoohxo
// Royal Family Deck: touj381sc2u6
// Ace Family Deck: n3fxmvtwhj6s
// 7-10 Family (name needed): xbm4zi4te6bu
// 2-6 Family (name needed): gptcy4vs0tut
// Next: figure out how to change organization for different decks

//picture of supabase tables, code given 10 discarded. finish project !!
</script>

<style lang="scss" scoped></style>
