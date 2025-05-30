<template>
  <div>
    <h1>Hello</h1>
    <div>
      <button @click="spinForSet()">Spin</button>
      <h1 v-if="number && suit">{{ number }} of {{ suit }}</h1>
      <img :src="imageURL" v-if="number && suit" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useDeckStore } from '@/stores/yourDeck'

const deckStore = useDeckStore()
const number = ref('')
const suit = ref('')
const code = computed(() => getCardCode(number.value, suit.value))
const imageURL = computed(() => `https://deckofcardsapi.com/static/img/${code.value}.png`)

function spinForSet() {
  spinForSuit()
  const randomNumber = Math.floor(Math.random() * 100 + 1)
  if (randomNumber <= 60) {
    number.value = getRandomFromArray([2, 3, 4, 5, 6])
    /*     number.value = '2-6' */
  } else if (randomNumber <= 80) {
    /*     number.value = '7-10' */
    number.value = getRandomFromArray([7, 8, 9, 10])
  } else if (randomNumber <= 100) {
    spinAceOrRoyal()
  }
}

function spinAceOrRoyal() {
  const randomNumber = Math.floor(Math.random() * 10 + 1)
  if (randomNumber < 10) {
    /*   console.log("J-K") */
    number.value = getRandomFromArray(['Jack', 'Queen', 'King'])
  } else {
    /*   console.log("Ace!") */
    number.value = 'Ace'
  }
}

function spinForSuit() {
  suit.value = getRandomFromArray(['Diamonds', 'Clubs', 'Hearts', 'Spades'])
}

function getRandomFromArray(arr) {
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

function getCardCode(number, suit) {
  const suitCodes = {
    Spades: 'S',
    Hearts: 'H',
    Diamonds: 'D',
    Clubs: 'C',
  }

  const numberCodes = {
    ACE: 'A',
    Jack: 'J',
    Queen: 'Q',
    King: 'K',
    10: '0', // in the api 10 === 0 for some reason
    9: '9',
    8: '8',
    7: '7',
    6: '6',
    5: '5',
    4: '4',
    3: '3',
    2: '2',
  }

  const numCode = numberCodes[number]
  const suitCode = suitCodes[suit]
  addToInventory(`${numCode}${suitCode}`)
  return `${numCode}${suitCode}`
}

async function addToInventory(code) {
  try {
    const res = await fetch(
      `https://deckofcardsapi.com/api/deck/${deckStore.yourDeckID}/pile/player/add/?cards=${code}`,
    )
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

// https://deckofcardsapi.com/api/deck/rrnwp5zoohxo/draw/?count=52
// idk why you need to do this but you have to, this needs to be done to a new pile before they can draw

// https://deckofcardsapi.com/api/deck/rrnwp5zoohxo/pile/player/add/?cards=4S,3S
// Use this link to add any card to the inventory

// https://deckofcardsapi.com/api/deck/rrnwp5zoohxo/pile/player/list/
// Use this link to view what is in the player's inventory

// Delete Inventory URL: https://deckofcardsapi.com/api/deck/rrnwp5zoohxo/pile/player/return/

// Player Deck: rrnwp5zoohxo
// Royal Family Deck: touj381sc2u6
// Ace Family Deck: n3fxmvtwhj6s
// 7-10 Family (name needed): xbm4zi4te6bu
// 2-6 Family (name needed): gptcy4vs0tut
</script>

<style lang="scss" scoped></style>
