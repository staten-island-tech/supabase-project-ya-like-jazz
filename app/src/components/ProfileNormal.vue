<template>
  <div>
    <div>
      <h1 class="text-center text-textcolor2"> Click on a card for more information </h1>
    </div>
    <div>
      <h1 class="text-textcolor2 text-center text-4xl font-bold">Aces</h1>
      <div class="grid grid-cols-4 gap-4">
        <YourInventory v-for="ace in aces" :card="ace" :key="ace.code" :ownedCards="obtained" />
      </div>
    </div>

    <div>
      <h1 class="text-textcolor2 text-center text-4xl font-bold">Royal Family</h1>
      <div class="grid grid-cols-3 gap-4">
        <YourInventory
          v-for="royalCard in royalCards"
          :card="royalCard"
          :key="royalCard.code"
          :ownedCards="obtained"
        />
      </div>
    </div>

    <div>
      <h1 class="text-textcolor2 text-center text-4xl font-bold">7-10 Family</h1>
      <div class="grid grid-cols-4 gap-4">
        <YourInventory v-for="book in books" :card="book" :key="book.code" :ownedCards="obtained" />
      </div>
    </div>

    <div>
      <h1 class="text-textcolor2 text-center text-4xl font-bold">2-6 Family</h1>
      <div class="grid grid-cols-4 gap-4">
        <YourInventory v-for="tray in trays" :card="tray" :key="tray.code" :ownedCards="obtained" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import YourInventory from '@/components/YourInventory.vue'
import { ref, onMounted } from 'vue'
import { useDeckStore } from '@/stores/yourDeck'
import type { CardCollection } from '@/types'

const deckStore = useDeckStore()
console.log('Deck ID:', deckStore.yourDeckID)
const aces = ref<CardCollection[]>([])
const royalCards = ref<CardCollection[]>([])
const books = ref<CardCollection[]>([])
const trays = ref<CardCollection[]>([])
const count = ref(0)
const obtained = ref([]) // This will hold the owned card codes

async function fetchInventory() {
  try {
    const res = await fetch(
      `https://deckofcardsapi.com/api/deck/${deckStore.yourDeckID}/pile/player/list/`,
    )
    if (res.status > 200) {
      throw new Error('ogirkjtbrfmikoltpe')
    } else {
      const data = await res.json()
      obtained.value = data.piles.player.cards.map((card: { code: string }) => card.code)
      return { data }
    }
  } catch (error) {
    console.log('player has not obtained any cards yet, normal error')
  }
}

onMounted(() => {
  fetchInventory()
})

async function displaySets(collectionDeck: string) {
  try {
    const res = await fetch(
      `https://deckofcardsapi.com/api/deck/${collectionDeck}/pile/player/list/`,
    )
    if (!res.ok) {
      const errorText = await res.text()
      console.log(`${errorText}`)
    } else {
      const data = await res.json()
      console.log(data.piles.player.cards)
      organizeSet(data.piles.player.cards)
      return { data }
    }
  } catch (error) {
    alert(error)
  }
}

function organizeSet(data: CardCollection[]) {
  if (count.value === 0) {
    aces.value = data
  } else if (count.value === 1) {
    royalCards.value = data
  } else if (count.value === 2) {
    books.value = data
  } else if (count.value === 3) {
    trays.value = data
  }
}

async function beginLoading() {
  const collectionDecks = ['n3fxmvtwhj6s', 'touj381sc2u6', 'mcahu5100ua3', 'gptcy4vs0tut']
  for (const collectionDeck of collectionDecks) {
    await displaySets(collectionDeck)
    count.value++
  }
}

beginLoading()
// Player Deck: rrnwp5zoohxo
// Royal Family Deck: touj381sc2u6
// Ace Family Deck: n3fxmvtwhj6s
// 7-10 Family (name needed): mcahu5100ua3
// 2-6 Family (name needed): gptcy4vs0tut
// Next: figure out how to change organization for different decks

//picture of supabase tables, code given 10 discarded. finish project !!
</script>

<style lang="scss" scoped></style>
