<template>
  <div>
    <h1 class="text-[32px] font-bold text-center">Play!</h1>
    <div class="containers flex flex-wrap justify-start mr-4 rounded-xl">
      <div class="border-2 border-black rounded-xl ml-4 p-2 justify-center">
        <Button
          class="m-2 bg-black"
          @click="(resetAnimations(), spinForSet())"
          raised
          severity="contrast"
          >Spin</Button
        >
        <h1 v-if="number && suit">{{ number }} of {{ suit }}</h1>
        <img :src="imageURL" v-if="number && suit" />
        <img :src="defaultImage" v-if="!number && !suit" class="mt-4" />
      </div>

      <div class="border-2 border-black ml-4 rounded-xl w-[70%] object-contain">
        <div v-if="showRings">
          <HighTierCardAnimation ref="ringRef" />
        </div>

        <div v-if="showSines">
          <LowTierCardAnimation ref="sineRef" />
        </div>

        <div v-if="showSuits">
          <RoyalCardAnimation ref="suitsRef" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import { ref, computed, onMounted } from 'vue'
import { useDeckStore } from '@/stores/yourDeck'
/* import { gsap } from 'gsap'  */
import { supabase } from '@/lib/supabaseClient'
import type { Suits, Numbers } from '@/types'
import { error } from 'console'
import LowTierCardAnimation from '@/components/LowTierCardAnimation.vue'
import HighTierCardAnimation from '@/components/HighTierCardAnimation.vue'
import RoyalCardAnimation from '@/components/RoyalCardAnimation.vue'

const deckStore = useDeckStore()
const number = ref<Numbers>()
const suit = ref<Suits>()
const code = computed(() => getCardCode(number.value!, suit.value!))
const imageURL = computed(() => `https://deckofcardsapi.com/static/img/${code.value}.png`)
const defaultImage = 'https://deckofcardsapi.com/static/img/back.png'
const quantity = ref(1)

const ringRef = ref<InstanceType<typeof HighTierCardAnimation> | null>(null)
const sineRef = ref<InstanceType<typeof LowTierCardAnimation> | null>(null)
const suitRef = ref<InstanceType<typeof RoyalCardAnimation> | null>(null)

const showRings = ref(false)
const showSines = ref(false)
const showSuits = ref(false)

onMounted(() => {
  if (ringRef.value) {
    ringRef.value.animateRings()
  }
})

function ringAnimation() {
  if (ringRef.value) {
    ringRef.value.animateRings()
  }
}

onMounted(() => {
  if (sineRef.value) {
    sineRef.value.animateSine()
  }
})

function sineAnimation() {
  if (sineRef.value) {
    sineRef.value.animateSine()
  }
}

onMounted(() => {
  if (suitRef.value) {
    suitRef.value.animateSuits()
  }
})

function suitAnimation() {
  if (suitRef.value) {
    suitRef.value.animateSuits()
  }
}

function resetAnimations() {
  showRings.value = false
  showSines.value = false
  showSuits.value = false
}
function spinForSet() {
  spinForSuit()
  const randomNumber = Math.floor(Math.random() * 100 + 1)
  if (randomNumber <= 60) {
    number.value = getRandomFromArray([2, 3, 4, 5, 6] as Numbers[])
    showRings.value = false
    showSines.value = true
    showSuits.value = false
    sineAnimation()
    return
    /*     gsap.to('box') */
  } else if (randomNumber <= 80) {
    number.value = getRandomFromArray([7, 8, 9, 10] as Numbers[])
    showRings.value = true
    showSines.value = false
    showSuits.value = false
    ringAnimation()
    return
  } else if (randomNumber <= 100) {
    spinAceOrRoyal()
  }
}

function spinAceOrRoyal() {
  const randomNumber = Math.floor(Math.random() * 10 + 1)
  if (randomNumber < 10) {
    number.value = getRandomFromArray(['Jack', 'Queen', 'King'] as Numbers[])
  } else {
    number.value = 'Ace'
  }
  showRings.value = false
  showSines.value = false
  showSuits.value = true
  suitAnimation()
}

function spinForSuit() {
  suit.value = getRandomFromArray(['Diamonds', 'Clubs', 'Hearts', 'Spades'] as Suits[])
}

function getRandomFromArray<T>(arr: T[]) {
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

function getCardCode(number: Numbers, suit: Suits) {
  const suitCodes: Record<Suits, string> = {
    Spades: 'S',
    Hearts: 'H',
    Clubs: 'C',
    Diamonds: 'D',
  }

  const numberCodes: Record<Numbers, string> = {
    Ace: 'A',
    King: 'K',
    Queen: 'Q',
    Jack: 'J',
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

async function addToInventory(code: string) {
  try {
    const res = await fetch(
      `https://deckofcardsapi.com/api/deck/${deckStore.yourDeckID}/pile/player/add/?cards=${code}`,
    )
    if (!res.ok) {
      const errorText = await res.text()
      console.log(errorText)
    } else {
      const data = await res.json()
      /*       console.log(data) */
      quantityCheckpoint(code)
    }
  } catch (error) {
    alert(error)
  }
}

async function quantityCheckpoint(code: string) {
  const { data, error } = await supabase.from('user_cards').select('*').eq('card_code', code)
  /*   console.log('grjjfergf', data) */
  if (!data || data.length === 0) {
    quantity.value = 1
    await insertToDeckTable(code)
  } else {
    quantity.value = quantity.value + 1
    await updateDeckTable(code)
  }
  return { data }
}

async function insertToDeckTable(code: string) {
  const { data } = await supabase.auth.getUser()
  const uid = data.user!.id
  /*   console.log(uid) */

  const { data: profileData, error: profileError } = await supabase.from('user_cards').insert([
    {
      uid: uid,
      deckid: deckStore.yourDeckID,
      card_code: code,
      quantity: quantity.value,
    },
  ])

  if (profileError) {
    console.error('Error inserting into profiles:', profileError)
    return
  }
  /*   console.log('Upserted profile:', profileData) */
}

async function updateDeckTable(code: string) {
  const { data, error } = await supabase
    .from('user_cards')
    .update({ quantity: quantity.value })
    .eq('card_code', code)
    .select()
  console.log(data)
  if (error) {
    console.error('Error updating profile:', error)
    return
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
