<template>
  <div>
    <h1>Hello welcome to the profile</h1>
    <div>

      <h1>Your Cards</h1>

      <div> 
        <h1> Aces </h1>
          <div class="grid grid-cols-4 gap-4">
            <YourInventory v-for="ace in aces" :card="ace" :key="ace.code" :ownedCards="obtained" />
          </div>
      </div>

      <div>
        <h1> Royal Family </h1>
          <div class="grid grid-cols-3 gap-4">
           <YourInventory v-for="royalCard in royalCards" :card="royalCard" :key="royalCard.code" :ownedCards="obtained" />
          </div>
      </div>

      <div>
        <h1> 7-10 Family </h1>
          <div class="grid grid-cols-4 gap-4">
           <YourInventory v-for="book in books" :card="book" :key="book.code" :ownedCards="obtained"/>
          </div>
      </div>

      <div>
        <h1> 2-6 Family </h1>
          <div class="grid grid-cols-4 gap-4">
           <YourInventory v-for="tray in trays" :card="tray" :key="tray.code" :ownedCards="obtained"/>
          </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import YourInventory from '@/components/YourInventory.vue'
import { ref, onMounted } from 'vue'
const aces = ref([])
const royalCards = ref([])
const books = ref([])
const trays = ref([])
const count = ref(0)
const obtained = ref([])    // This will hold the owned card codes

async function fetchInventory() {
  try {
    const res = await fetch('https://deckofcardsapi.com/api/deck/rrnwp5zoohxo/pile/player/list/')
        if (res.status > 200) {
      throw new Error(res)
    } else {
    const data = await res.json()
    obtained.value = data.piles.player.cards.map(card => card.code)
    return { data }
    }
  } catch (error) {
    alert(error)
  }
}

// Call once when component mounts
onMounted(() => {
  fetchInventory()
})



async function displaySets(deck) {
  try {
    const res = await fetch(`https://deckofcardsapi.com/api/deck/${deck}/pile/player/list/`)
    if (res.status > 200) {
      throw new Error(res)
    } else {
      const data = await res.json()
    organizeSet(data)
      return { data }
    }
  } catch (error) {
    alert(error)
  }
}

function organizeSet(data){
  if (count.value === 0){
    aces.value = data.piles.player.cards
  } else if (count.value === 1){
    royalCards.value = data.piles.player.cards
  } else if (count.value === 2){
    books.value = data.piles.player.cards
  } else if (count.value === 3){
    trays.value = data.piles.player.cards
  }

}

async function beginLoading() {
  const decks = [ "n3fxmvtwhj6s", "touj381sc2u6", "xbm4zi4te6bu", "gptcy4vs0tut"]
  for (const deck of decks) {
    await displaySets(deck)
    count.value++
  }
}

beginLoading()
// Player Deck: rrnwp5zoohxo
// Royal Family Deck: touj381sc2u6
// Ace Family Deck: n3fxmvtwhj6s
// 7-10 Family (name needed): xbm4zi4te6bu
// 2-6 Family (name needed): gptcy4vs0tut
// Next: figure out how to change organization for different decks

//picture of supabase tables, code given 10 discarded. finish project !!
</script>

<style lang="scss" scoped></style>
