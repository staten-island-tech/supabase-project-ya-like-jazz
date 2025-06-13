<template>
  <div class="h-[120vh] bg-1">
    <h1 class="text-6xl text-center text-textcolor2 p-2">Change Your Profile Picture</h1>
    <h1 class="text-2xl text-center text-textcolor2 p-2">
      Enter a link to change your current profile picture
    </h1>
    <h1 class="text-sm text-center text-textcolor2 p-2 mb-2">
      Note: leaving the box empty resets your profile picture to the default
    </h1>

    <div class="flex justify-center">
      <input
        v-model="text"
        type="text"
        placeholder="Image URL"
        class="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        @click="changePfp()"
        class="bg-3 hover:bg-hover3 text-white px-4 py-2 rounded"
      >
        Enter
      </button>
    </div>
    <div class="flex justify-center p-2">
      <img :src="settingsStore.pfp" class="w-80 h-80 border-2 p-2" draggable="false" />
    </div>
    <div
      class="absolute top-[40rem] left-1/2 w-1/2 h-1/2 -translate-x-1/2 z-10"
      :style="{ opacity: isAnimating ? 1 : 0 }"
    >
      <div
        v-for="(angle, i, number) in angles"
        :key="i"
        class="card absolute top-0 left-1/2 w-56 h-80"
        :ref="(element) => (cards[i] = element)"
      >
        <img
          :src="`https://deckofcardsapi.com/static/img/${numbers[i]}.png`"
          class="w-full h-full object-cover rounded shadow-md"
          draggable="false"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useSettingsStore } from '@/stores/settings'
import { ref } from 'vue'
import { gsap } from 'gsap'

const settingsStore = useSettingsStore()

const angles = [-60, -55, -50, -45, -40, -35, -30, -25, -20, -15, -10, -5, 0, 5, 10, 15, 20]
const numbers = [
  'back',
  'back',
  '2C',
  '3C',
  '4C',
  '5C',
  '6C',
  '7C',
  '8C',
  '9C',
  '0C',
  'JC',
  'QC',
  'KC',
  'AC',
  'back',
  'back',
]
const cards = ref<HTMLElement[]>([])

const text = ref('')
const isAnimating = ref(false)

function isValidUrl(string: string) {
  try {
    new URL(string)
    return true
  } catch (_) {
    return false
  }
}

async function changePfp() {
  if (isAnimating.value) return

  isAnimating.value = true
  const inputValue = text.value
  text.value = ''

  if (inputValue === '') {
    cardFlashAnim()
    await new Promise((resolve) => setTimeout(resolve, 1500))
    settingsStore.pfp =
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1024px-Default_pfp.svg.png'
  } else if (!isValidUrl(inputValue)) {
    alert(`Not a valid link!`)
    isAnimating.value = false
    return
  } else {
    cardFlashAnim()
    await new Promise((resolve) => setTimeout(resolve, 1500))
    settingsStore.pfp = inputValue
  }

  await new Promise((resolve) => setTimeout(resolve, 1500))
  isAnimating.value = false
}

function cardFlashAnim() {
  cards.value.forEach((card, i) => {
    gsap.set(card, {
      rotation: 0,
      opacity: 0,
      x: '-600px',
      y: '500px',
      transformOrigin: '0px 600px',
    })

    gsap.to(card, {
      x: 120,
      y: i * 5 - 400,
      rotation: angles[i],
      opacity: 1,
      duration: 0.5,
      delay: i * 0.05,
      repeatDelay: 1,
      repeat: 1,
      yoyo: true,
      ease: 'expo.inOut',
    })
  })
}
</script>

<style lang="scss" scoped></style>
