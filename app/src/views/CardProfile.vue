<template>
  <div>
    <div>
      <h1 class="text-textcolor2 text-center text-8xl">{{ cardName }}</h1>
      <div
        class="flex justify-center p-2"
        :class="{ 'opacity-100': ownedStatus, 'opacity-30': !ownedStatus }"
      >
        <div class="relative">
          <img :src="cardImage" class="w-full h-full filter brightness-100" draggable="false" />
          <div class="absolute inset-0 bg-gradient-to-r from-1 to-gradient opacity-30"></div>
        </div>
      </div>
      <h1 class="text-textcolor2 text-center text-2xl">{{ description }}</h1>
      <h1 class="text-textcolor2 text-center">{{ ownedAmount }}</h1>
    </div>
    <div class="flex justify-center p-8">
      <RouterLink
        to="/profile"
        class="text-textcolor2 p-18 text-6xl p-2 rounded-lg border-2 w-fit transition-all duration-200 hover:text-8xl hover:italic"
      >
        Return
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { supabase } from '@/lib/supabaseClient'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import cardDescriptions from '@/lib/cardDescriptions.json'

const route = useRoute()
const cardImage = `https://deckofcardsapi.com/static/img/${route.params.code}.png`
const cardName = getCardName(route.params.code)
const description = cardDescriptions[`${route.params.code}`] // I did use gpt for this!! I ain't writing allat
const ownedAmount = ref('')
const ownedStatus = ref(true)
async function fetchCardFromSupabase() {
  const { data, error } = await supabase
    .from('user_cards')
    .select()
    .eq('card_code', `${route.params.code}`)
  console.log(data)
  if (!data) {
    console.log(error)
  } else if (data.length === 0) {
    ownedAmount.value = 'You do not own this card yet...'
    ownedStatus.value = false
  } else if (data[0].quantity === 1) {
    ownedAmount.value = `You own ${data[0].quantity} copy of this card!`
    ownedStatus.value = true
  } else {
    ownedAmount.value = `You own ${data[0].quantity} copies of this card!`
    ownedStatus.value = true
  }
}

function getCardName(code) {
  console.log(code)
  const number = code.slice(0, 1)
  const suit = code.slice(1, 2)
  console.log(number)
  console.log(suit)
  const suitCodes = {
    S: 'Spades',
    H: 'Hearts',
    C: 'Clubs',
    D: 'Diamonds',
  }

  const numberCodes = {
    A: 'Ace',
    K: 'King',
    Q: 'Queen',
    J: 'Jack',
    0: '10',
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
  return `${numCode} of ${suitCode}`
}

onMounted(() => {
  fetchCardFromSupabase()
})
</script>

<style lang="scss" scoped></style>
